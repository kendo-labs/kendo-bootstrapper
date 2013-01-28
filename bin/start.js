#! /usr/bin/env node

var PATH    = require("path");
var HTTP    = require("http");
var FS      = require("fs");
var WS      = require("ws");
var QRS     = require("querystring");
var URL     = require("url");

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

function start_server() {
    var server = HTTP.createServer(function(request, response){
        var url = URL.parse(request.url, true);
        var m = /^\/@proj\/([^\/]+)\/*(.*)$/.exec(url.pathname);
        if (!m) {
            SS.handle_request(DOCROOT, request, response);
            return;
        }
        var proj = PROJECT.get_project(m[1]);
        if (!proj) {
            // this should 404
            SS.handle_request(DOCROOT, request, response);
            return;
        }
        var path = "/" + m[2];
        if (url.search) path += url.search;
        request.url = path;
        SS.handle_request(proj.path, request, response);
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

    // setInterval(function(){
    //     CLIENTS.forEach(function(ws){
    //         rpc.notify(ws, "ping", "PONG");
    //     });
    // }, 500);
}
