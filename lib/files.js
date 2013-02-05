var FS = require("fs");
var PATH = require("path");
var UTILS = require("./utils");
var U2 = require("uglify-js");
var LESS = require("less");
var CSSMIN = require("cssmin");

var FTYPES = {
    js: {
        name: "{NAME}.min.js",
        build: function(source, output, callback) {
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                try {
                    var ast = U2.parse(code);
                    ast.figure_out_scope();
                    ast = ast.transform(U2.Compressor());
                    ast.figure_out_scope();
                    ast.compute_char_frequency();
                    ast.mangle_names();
                    code = ast.print_to_string();
                    FS.writeFile(output, code, "utf8", function(err){
                        if (err) return callback(err);
                        callback(null, output);
                    });
                } catch(ex) {
                    if (ex instanceof U2.JS_Parse_Error) return callback({
                        filename : source,
                        line     : ex.line,
                        col      : ex.col,
                        message  : ex.message
                    });
                    callback(ex);
                }
            });
        }
    },
    css: {
        name: "{NAME}.min.css",
        build: function(source, output, callback) {
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                code = CSSMIN.cssmin(code);
                FS.writeFile(output, code, "utf8", function(err, code){
                    if (err) return callback(err);
                    callback(null, output);
                });
            });
        }
    },
    less: {
        name: "{NAME}.min.css",
        build: function(source, output, callback) {
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                var parser = new LESS.Parser({
                    paths: [ PATH.dirname(source) ],
                    filename: PATH.basename(source)
                });
                parser.parse(code, function(err, tree){
                    if (err) return callback({
                        filename : source,
                        line     : err.line,
                        col      : err.column,
                        message  : err.message
                    });
                    var code = tree.toCSS();
                    code = CSSMIN.cssmin(code);
                    FS.writeFile(output, code, "utf8", function(err, code){
                        if (err) return callback(err);
                        callback(null, output);
                    });
                });
            });
        }
    },
};

function output_file_name(file) {
    var ext = PATH.extname(file);
    var build = FTYPES[ext.replace(/^\.+/, "").toLowerCase()];
    if (build) {
        var dirname = PATH.dirname(file);
        var basename = PATH.basename(file, ext);
        return UTILS.template(build.name, {
            NAME: dirname + "/" + basename
        });
    }
};

function build_file(file, callback) {
    var ext = PATH.extname(file);
    var build = FTYPES[ext.replace(/^\.+/, "").toLowerCase()];
    if (build) {
        var output = output_file_name(file);
        FS.stat(file, function(err, source_stat){
            if (err) return callback(err);
            UTILS.fs_ensure_directory(PATH.dirname(output), function(err){
                if (err) return callback(err);
                FS.stat(output, function(err, output_stat){
                    if (err) {
                        if (err.code == "ENOENT") {
                            // output not present, should build
                            return build.build(file, output, callback);
                        }
                        return callback(err);
                    }
                    var x = UTILS.file_change_time(source_stat);
                    var y = UTILS.file_change_time(output_stat);
                    if (x.getTime() > y.getTime()) {
                        // should build
                        return build.build(file, output, callback);
                    }
                    return callback(null, output, true);
                });
            });
        });
    }
    else {
        // no info on how to build this kind of file
        callback();
    }
};

function file_info(file, callback) {
    FS.stat(file, function(err, source_stat){
        if (err) return callback(err);
        var ext = PATH.extname(file);
        var build = FTYPES[ext.replace(/^\.+/, "").toLowerCase()];
        var output = output_file_name(file);
        var ret = {
            file     : file,
            stat     : source_stat,
            canbuild : !!build,
        };
        if (!output) return callback(null, ret);
        FS.stat(output, function(err, output_stat){
            if (!err) {
                ret.build = {
                    file: output,
                    stat: output_stat
                };
            }
            return callback(null, ret);
        });
    });
};

function delete_file(file, callback) {
    FS.unlink(file, function(err){
        if (err) return callback(err);
        var build = output_file_name(file);
        if (build) return FS.unlink(build, callback);
        callback();
    });
};

exports.build_file = build_file;
exports.file_info = file_info;
exports.delete_file = delete_file;
