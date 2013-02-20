#! /usr/bin/env node

var PATH     = require("path");
var HTTP     = require("http");
var FS       = require("fs");
var WS       = require("ws");
var QRS      = require("querystring");
var URL      = require("url");
var FORMS    = require("formidable");
var OPTIMIST = require("optimist");

global.TOPLEVEL_DIR = PATH.join(PATH.dirname(__filename), "..");
var DOCROOT = PATH.join(TOPLEVEL_DIR, "docroot");

var SS       = require("../lib/server");
var RPC      = require("../lib/rpc");
var PROJECT  = require("../lib/project");
var CONFIG   = require("../lib/config");
var UTILS    = require("../lib/utils");
var PLATFORM = require("../lib/platform");

require("../lib/handlers");

var ARGS = OPTIMIST
    .describe("n", "Don't launch Chrome on startup")
    .boolean("n")
    .wrap(80)
    .argv
;

start_server();

var HANDLERS = [
    // this handler serves files from some project's space
    // it's used to preview.
    [/^\/@proj\/([^\/]+)\/*(.*)$/, function(request, response, proj_id, path){
        var url = URL.parse(request.url, true);
        var proj = PROJECT.get_project(proj_id);
        path = "/" + path;
        if (url.search) path += url.search;
        request.url = path;
        SS.handle_request(proj.path, request, response);
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
                library  : !!fields.library
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

    // default handler serves static files from docroot/
    function(request, response) {
        SS.handle_request(DOCROOT, request, response);
    }
];

HANDLERS.NEXT = {};

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
        RPC.notify(ws, "setup", {
            projects_dir: CONFIG.get_projects_directory()
        });
        PROJECT.forEach(function(proj){
            RPC.notify(ws, "register_project", proj);
        });
        ws.on("message", function(message){
            RPC.handle_request(ws, message);
        });
        ws.on("close", function(){
            CLIENTS.remove(ws);
        });
    });

    // forward events as notifications to the client
    PROJECT.EVENTS.listen([
        "register_project",
        "project_add_file",
        "project_delete_file"
    ], function(data){
        var event = this.event;
        CLIENTS.forEach(function(ws){
            RPC.notify(ws, event, data);
        });
    });

    // setInterval(function(){
    //     CLIENTS.forEach(function(ws){
    //         rpc.notify(ws, "ping", "PONG");
    //     });
    // }, 500);
}

if (!ARGS.n) CONFIG.get_chrome_exe(function(err, chrome_exe){
    var cp = require("child_process");
    var tmp = PATH.join(TOPLEVEL_DIR, "TEMP", UTILS.uuid());
    UTILS.fs_ensure_directory(tmp, function(err){
        if (err) {
            console.error("Cannot create temporary directory:", tmp);
            console.log(err);
            process.exit(1);
        }
        process.on("exit", function(){
            UTILS.fs_rmpathSync(tmp);
        });
        process.on("SIGINT", function(){
            process.exit(0);
        });
        var chrome = cp.spawn(chrome_exe, [
            "--no-first-run",
	    "--no-default-browser-check",
	    "--no-proxy-server",
	    "--no-referrers",
	    "--disable-translate",
            "--window-size=800,600",
	    "--window-position=10,10",
	    "--start-maximized",
            "--user-data-dir=" + tmp,
	    //"--profile-directory=" + tmp,
            "--new-window",
            //"--app=http://localhost:7569/",
	    "http://localhost:7569/",
        ], {
            cwd: TOPLEVEL_DIR
        });
        chrome.on("exit", function(){
            process.exit(0);
        });
    });
});

console.log("Server started");
