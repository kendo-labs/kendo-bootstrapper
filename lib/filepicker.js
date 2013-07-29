var PATH        = require("path");
var FS          = require("fs");
var STEP        = require("step");

var PLATFORM = require("./platform.js");
var UTILS = require("./utils.js");
var RPC = require("./rpc.js");

function readdir(path, options, callback) {
    if (path == ".") path = process.cwd();
    if (path == "~") path = PLATFORM.HOME();
    if (path == "//" && PLATFORM.windows) {
        PLATFORM.win32_get_drives(function(err, drives){
            if (err) return callback(err);
            callback(null, {
                path: "//",
                list: drives.map(function(d){
                    return {
                        name        : d.disk,
                        rel         : d.disk,
                        full        : d.disk + "\\",
                        isDirectory : true,
                        stat        : { size: 0 },
                    };
                })
            });
        });
        return;
    }
    try {
        var stat = FS.statSync(path);
        if (!stat.isDirectory()) return callback({
            error: path + " is not a directory"
        });
    } catch(ex) {
        return callback({
            error: "Cannot access " + path
        });
    }
    var results = [];
    if (options.parent) {
        var parent = PATH.dirname(path);
        if (parent == path && PLATFORM.windows) {
            readdir("//", options, callback);
            return;
        }
        path = parent;
    }
    UTILS.fs_find(path, {
        recurse: function(){ return false },
        filter: function(f) {
            if (options.dirsonly && !f.stat.isDirectory())
                return false;
            if (options.filter instanceof RegExp)
                return options.filter.test(f.rel);
            return true;
        },
        callback: function(err, f) {
            if (!err) {
                f.isDirectory = f.stat.isDirectory();
                results.push(f);
            }
        },
        finish: function() {
            callback(null, {
                path: path,
                list: results
            });
        }
    });
};

function stat(files, callback) {
    var ret = [], count = files.length;
    files.forEach(function(name, i){
        FS.stat(name, function(err, stat){
            count--;
            if (err) {
                ret[i] = { error: err };
            } else {
                stat.isDirectory = stat.isDirectory();
                ret[i] = stat;
            }
            if (count == 0) {
                callback(null, ret);
            }
        });
    });
};

function mkdir(dest, rel, callback) {
    var path = PATH.join(dest, rel);
    UTILS.fs_ensure_directory(path, callback);
};

/// RPC handlers

RPC.defhandler("fs/readdir", function(request, path, options){
    options = UTILS.defaults(options, {
        dirsonly : false,
        filter   : null,
        parent   : false,
    });
    if (options.filter)
        options.filter = new RegExp(options.filter);
    readdir(path, options, request.make_handler());
});

RPC.defhandler("fs/stat", function(request, files){
    stat(files, request.make_handler());
});

RPC.defhandler("fs/mkdir", function(request, dest, rel){
    mkdir(dest, rel, request.make_handler());
});
