#! /usr/bin/env node

var PATH    = require("path");
var HTTP    = require("http");
var FS      = require("fs");
var WS      = require("ws");
var QRS     = require("querystring");
var URL     = require("url");
var FORMS   = require("formidable");

global.TOPLEVEL_DIR = PATH.join(PATH.dirname(__filename), "..");
var DOCROOT = PATH.join(TOPLEVEL_DIR, "docroot");

var SS      = require("../lib/server");
var RPC     = require("../lib/rpc");
var PROJECT = require("../lib/project");

require("../lib/utils");
require("../lib/handlers");

start_server();

PROJECT.bootstrap({
    id    : "foo",
    name  : "Foo Bar",
    path  : "/tmp/kendo-bootstrap/foo",
    force : true
}, function(err){
    if (err) console.log("ERROR", err);
});

PROJECT.bootstrap({
    id    : "hw",
    name  : "Hello world",
    path  : "/tmp/kendo-bootstrap/hw",
    force : true
}, function(err){
    if (err) console.log("ERROR", err);
});

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
                    error: err
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

    PROJECT.EVENTS.listen("register_project", function(proj){
        CLIENTS.forEach(function(ws){
            RPC.notify(ws, "register_project", proj);
        });
    });

    PROJECT.EVENTS.listen("project_add_file", function(data){
        CLIENTS.forEach(function(ws){
            RPC.notify(ws, "project_add_file", data);
        });
    });

    PROJECT.EVENTS.listen("project_delete_file", function(data){
        CLIENTS.forEach(function(ws){
            RPC.notify(ws, "project_delete_file", data);
        });
    });

    // setInterval(function(){
    //     CLIENTS.forEach(function(ws){
    //         rpc.notify(ws, "ping", "PONG");
    //     });
    // }, 500);
}
