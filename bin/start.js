#! /usr/bin/env node

(function(a, b, c){
    if (!(b >= 10)) {
        console.log("Kendo Bootstrapper requires NodeJS v0.10 or later.  You have " + process.version);
        console.log("Please install a newer version - http://nodejs.org/")
        process.exit(1);
    }
}.apply(null, process.version.replace(/^v/, "").split(".").map(parseFloat)));

var PATH     = require("path");
var HTTP     = require("http");
var FS       = require("fs");
var WS       = require("ws");
var URL      = require("url");
var FORMS    = require("formidable");
var OPTIMIST = require("optimist");
var TEMP     = require("temp");

global.TOPLEVEL_DIR = PATH.join(PATH.dirname(__filename), "..");
var DOCROOT = PATH.join(TOPLEVEL_DIR, "docroot");

require("kendo-lint/lib/lint.js").initialize();

var SS       = require("../lib/server");
var RPC      = require("../lib/rpc");
var PROJECT  = require("../lib/project");
var CONFIG   = require("../lib/config");
var UTILS    = require("../lib/utils");
var PLATFORM = require("../lib/platform");

require("../lib/handlers");

var ARGS = OPTIMIST
    .describe("n", "Don't launch Chrome on startup")
    .describe("clean", "Drop config file, start fresh")
    .boolean("n")
    .boolean("clean")
    .boolean("devel")
    .wrap(80)
    .argv
;

if (ARGS.clean) {
    CONFIG.cleanup();
}

start_server();

var HANDLERS;

HANDLERS = [
    // this handler serves files from some project's space
    // it's used to preview.
    [/^\/@proj\/([^\/]+)\/*(.*)$/, function(request, response, proj_id, path){
        var url = URL.parse(request.url, true);
        var proj = PROJECT.get_project(proj_id);
        if (!path) path = "index.html";
        path = "/" + path;
        if (url.search) path += url.search;
        request.url = path;
        SS.handle_request(proj.path, request, response);
    }],

    [/^\/@load-assets\/([^\/]+)\/*(.*)$/, function(request, response, proj_id, path) {
        if (!path) path = "index.html";
        var form = new FORMS.IncomingForm();
        PROJECT.load_assets({
            proj : proj_id,
            page : path,
            host : request.headers.host,
        }, function(err, code){
            SS.serve_content(code, "assets.js", response);
        });
    }],

    // handler that adds a file to a project.  should be the only
    // handler that we can't (easily) write on top of WebSocket,
    // because it might send an upload.
    [/^\/@add-file\/([^\/]+)\/*$/, function(request, response, proj_id){
        var form = new FORMS.IncomingForm();
        var proj = PROJECT.get_project(proj_id);
        form.parse(request, function(err, fields, files){
            PROJECT.add_file({
                proj_id  : fields.project,
                filename : fields.filename,
                datapath : files.file ? files.file.path : null,
                library  : !!fields.library,
                page     : !!fields.page,
            }, function(err, ret){
                response.writeHead(200, "OK", {
                    "Content-Type": "text/html; charset=UTF-8"
                });
                if (err) ret = {
                    error: err.toString()
                };
                response.write(
                    "<script>window.parent.RPC.notify(" +
                        JSON.stringify(fields.expect) + "," +
                        JSON.stringify(ret) +
                        ")</script>",
                    "utf8"
                );
                response.end();
            });
        });
    }],

    [/^\/@build\/([^\/]+)\/([^\/]+)\/*$/, function(request, response, how, proj_id){
        var build_type = {};
        how.split(",").forEach(function(el){ build_type[el] = true });
        PROJECT.build_distro(proj_id, build_type, function(err, data){
            if (err) {
                response.writeHead(500, { "Content-Type" : "text/plain; charset=UTF-8" });
                response.write(JSON.stringify(err, null, 4) + "\n");
                response.end();
            } else {
                response.writeHead(200, "OK", {
                    "Content-Type"         : "application/zip",
                    "Content-Length"       : data.length,
                    "Content-Disposition"  : "attachment; filename=\"" + proj_id + ".zip\"",
                    "Pragma"               : "no-cache",
                    "Expires"              : "Tue, 08 Mar 1979 06:00:00 GMT",
                    "Last-Modified"        : new Date().toGMTString(),
                    "Cache-Control"        : "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0",
                });
                response.write(data, "binary");
                response.end();
            }
        });
    }],

    // default handler serves static files from docroot/
    function(request, response) {
        SS.handle_request(DOCROOT, request, response);
    }
], HANDLERS.NEXT = {};

function start_server() {
    CONFIG.read_config();
    var server = HTTP.createServer(function(request, response){
        var i = 0, ret = HANDLERS.NEXT;
        while (ret === HANDLERS.NEXT && i < HANDLERS.length) {
            var h = HANDLERS[i++], ret;
            if (typeof h == "function") {
                ret = h(request, response);
            } else {
                var url = URL.parse(request.url, true);
                var m = h[0].exec(url.pathname);
                if (m) {
                    var a = [ request, response ].concat([].slice.call(m, 1));
                    ret = h[1].apply(null, a);
                }
            }
        }
    });

    server.listen(7569);

    var CLIENTS = [];

    var wss = new WS.Server({ server: server });
    wss.on("connection", function(ws){
        CLIENTS.push(ws);
        ws.on("message", function(message){
            RPC.handle_request(ws, message);
        });
        ws.on("close", function(){
            CLIENTS.remove(ws);
	    if (CLIENTS.length == 0 && CHROME) {
		CHROME.kill();
	    }
        });
    });

    // forward events as notifications to the client
    PROJECT.EVENTS.listen([
        "register_project",
        "unregister_project",
        "project_add_file",
        "project_delete_file",
        "console",
        "fswatch",
        "docroot_watch",
    ], function(data){
        var event = this.event;
        CLIENTS.forEach(function(ws){
            RPC.notify(ws, event, data);
        });
    });

    if (ARGS.devel) (function(){
        function queue(event) {
            var files = {};
            return function(path) {
                if (files[path]) clearTimeout(files[path]);
                files[path] = setTimeout(function(){
                    delete files[path];
                    var rel = PATH.relative(DOCROOT, path).sane_path();
                    PROJECT.EVENTS.notify("docroot_watch", {
                        type: event,
                        file: rel,
                    });
                }, 50);
            }
        };
        require("chokidar").watch(DOCROOT, { persistent: true })
            .on("change", queue("change"));
    })();

    // setInterval(function(){
    //     CLIENTS.forEach(function(ws){
    //         rpc.notify(ws, "ping", "PONG");
    //     });
    // }, 500);
}

var CHROME = null;

if (!ARGS.n) CONFIG.get_chrome_exe(function(err, chrome_exe){
    if (err) {
	console.log(err);
	process.exit(1);
    }
    var cp = require("child_process");
    TEMP.mkdir("kendo-bootstrapper", function(err, tmp) {
	if (err) {
            console.error("Cannot create temporary directory:", tmp);
            console.log(err);
            process.exit(1);
        }
        process.on("SIGINT", function(){
            process.exit(0);
        });
        CHROME = cp.spawn(chrome_exe, [
            "--no-first-run",
	    "--no-default-browser-check",
	    "--no-proxy-server",
	    "--no-referrers",
	    "--disable-translate",
            //"--window-size=800,600",
	    //"--window-position=10,10",
	    "--start-maximized",
            "--user-data-dir=" + tmp,
	    //"--profile-directory=" + tmp,
            //"--new-window",
            "--app=http://localhost:7569/",
	    //"http://localhost:7569/",
        ], {
            cwd: tmp
        });
        CHROME.on("exit", function(){
            process.exit(0);
        });
    });
});

console.log("Server started");
