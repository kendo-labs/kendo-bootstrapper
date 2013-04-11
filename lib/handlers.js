var RPC = require("./rpc");
var KDOC = require("../kendo-lint/parsedocs.js");

RPC.defhandler("ping", function(request){
    return "PONG";
});

RPC.defhandler("kdoc/get-all-docs", function(request){
    return KDOC.kendo_apidoc.components;
});
