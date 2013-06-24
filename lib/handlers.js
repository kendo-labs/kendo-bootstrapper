var FS = require("fs");
var PATH = require("path");

var KDOC = require("../kendo-lint/lib/parsedocs.js");

var RPC = require("./rpc.js");
var PLATFORM = require("./platform.js");
var CONFIG = require("./config.js");

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

RPC.defhandler("config/set-kendo-dir", function(request, dir){
    var callback = request.make_handler();
    try {
        FS.statSync(PATH.join(dir, "js", "kendo.core.min.js"));
        FS.statSync(PATH.join(dir, "styles", "kendo.default.min.css"));
        CONFIG.set("kendo_src_dir", dir);
        CONFIG.save();
        callback(null, true);
    } catch(ex) {
        console.log(ex);
        callback(null, false);
    }
});

require("./filepicker.js");
