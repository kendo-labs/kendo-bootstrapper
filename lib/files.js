var FS = require("fs");
var PATH = require("path");
var CP = require("child_process");

var UTILS = require("./utils");
var U2 = require("uglify-js");
var LESS = require("less");
var CSSMIN = require("cssmin");

function minify_js(code) {
    var ast = U2.parse(code);
    ast.figure_out_scope();
    ast = ast.transform(U2.Compressor());
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    code = ast.print_to_string();
    return code;
}

var FTYPES = {
    js: {
        name: "{NAME}.min.js",
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                try {
                    code = minify_js(code);
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
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;
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
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;
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

    coffee: {
        name: "{NAME}.min.coffee.js",
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;

            // the API doesn't look great (or I don't know how to use
            // it) so let's use the CLI tool.
            var cmd = PATH.join(TOPLEVEL_DIR, "node_modules", "coffee-script", "bin", "coffee");
            var cs = CP.spawn(cmd, [ "--stdio", "--compile" ], { cwd: args.dir });

            var code = "", error = "";
            cs.stdout.on("data", function(data){ code += data });
            cs.stderr.on("data", function(data){ error += data });
            cs.stdout.on("end", function(){
                console.log(error)
                // XXX: should try to extract line/col for parse errors
                if (error) return callback(new Error(error));
                // if all fine, compile through uglifyjs
                code = minify_js(code);
                FS.writeFile(output, code, "utf8", function(err){
                    if (err) return callback(err);
                    callback(null, output);
                });
            });

            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                cs.stdin.end(code, "utf8");
            });
        }
    }
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

function build_file(proj, file, callback) {
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
                            return build.build({
                                dir: proj.path,
                                source: file,
                                output: output
                            }, callback);
                        }
                        return callback(err);
                    }
                    var x = UTILS.file_change_time(source_stat);
                    var y = UTILS.file_change_time(output_stat);
                    if (x.getTime() > y.getTime()) {
                        // should build
                        return build.build({
                            dir: proj.path,
                            source: file,
                            output: output
                        }, callback);
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
        if (err && err.code !== "ENOENT") return callback(err);
        var build = output_file_name(file);
        if (build) return FS.unlink(build, function(err){
            if (err && err.code !== "ENOENT") return callback(err);
            callback();
        });
        callback();
    });
};

exports.build_file = build_file;
exports.file_info = file_info;
exports.delete_file = delete_file;
