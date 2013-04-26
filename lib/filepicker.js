var PATH        = require("path");
var FS          = require("fs");
var STEP        = require("step");

var UTILS = require("./utils.js");
var RPC = require("./rpc.js");

function readdir(path, options, callback) {
    var results = [];
    if (options.parent) path = PATH.dirname(path);
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
