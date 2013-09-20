var FS = require("fs");
var PATH = require("path");

var KDOC = require("kendo-lint/lib/parsedocs.js");

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

RPC.defhandler("config/set-kendo-dir", function(request, dir){
    var callback = request.make_handler();

    function has_file() {
        try {
            FS.statSync(PATH.join(dir, PATH.join.apply(PATH, arguments)));
            return true;
        } catch(ex) {
            console.log(ex);
            return false;
        }
    }

    var has_core    = has_file("js", "kendo.core.min.js");
    var has_web     = has_file("js", "kendo.web.min.js");
    var has_mobile  = has_file("js", "kendo.mobile.min.js");
    var has_dataviz = has_file("js", "kendo.dataviz.min.js");
    var has_all     = has_file("js", "kendo.all.min.js");

    if (!has_core || (!has_web && !has_mobile))
        return callback(null, false);

    CONFIG.set("kendo_src_dir" , dir);
    CONFIG.set("kendo_web"     , has_web);
    CONFIG.set("kendo_mobile"  , has_mobile);
    CONFIG.set("kendo_dataviz" , has_dataviz);
    CONFIG.set("kendo_all"     , has_all);

    CONFIG.save();
    CONFIG.notify_setup(request.client);
    callback(null, true);
});

RPC.defhandler("config/set-active-project", function(request, proj_id){
    CONFIG.set("active_project", proj_id);
    CONFIG.save();
    request.make_handler()(null, true);
});

require("./filepicker.js");
