var KDOC = require("../kendo-lint/lib/parsedocs.js");

var RPC = require("./rpc.js");
var PLATFORM = require("./platform.js");

RPC.defhandler("ping", function(request){
    return "PONG";
});

RPC.defhandler("kdoc/get-all-docs", function(request){
    return KDOC.kendo_apidoc.components;
});

/// filesystem

RPC.defhandler("fs/select-directory", function(request, dir){
    PLATFORM.select_directory(dir, request.make_handler());
});

require("./filepicker.js");
