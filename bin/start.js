#! /usr/bin/env node

var path = require("path");

global.TOPLEVEL_DIR = path.join(path.dirname(__filename), "..");

var SS      = require("../lib/server");
var http    = require("http");
var fs      = require("fs");
var ws      = require("ws");
var rpc     = require("../lib/rpc");
var project = require("../lib/project");

require("../lib/utils");
require("../lib/handlers");

start_server();

project.bootstrap({
    id    : "foo",
    name  : "Foo Bar",
    path  : "/tmp/kendo-bootstrap/foo",
    force : true
}, function(err){
    if (err) console.log("ERROR", err);
});

function start_server() {
    var server = http.createServer(function(request, response){
        SS.handle_request(request, response);
    });

    server.listen(7569);

    var CLIENTS = [];

    var wss = new ws.Server({ server: server });
    wss.on("connection", function(ws){
        CLIENTS.push(ws);
        ws.on("message", function(message){
            rpc.handle_request(ws, message);
        });
        ws.on("close", function(){
            CLIENTS.remove(ws);
        });
    });

    project.EVENTS.listen("register_project", function(proj){
        CLIENTS.forEach(function(ws){
            rpc.notify(ws, "register_project", proj);
        });
    });

    // setInterval(function(){
    //     CLIENTS.forEach(function(ws){
    //         rpc.notify(ws, "ping", "PONG");
    //     });
    // }, 500);
}
