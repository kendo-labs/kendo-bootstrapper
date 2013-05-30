var FS = require("fs");
var PATH = require("path");
var CP = require("child_process");

var U2 = require("uglify-js");
var LESS = require("less");
var CSSMIN = require("cssmin");

var UTILS = require("./utils");
var PROJECT = require("./project");

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

function get_output_name(f, prod) {
    var ftype = FTYPES[f.type];
    var name = f.name;
    if (prod && !f.lib) {
        name = output_file_name(name);
    }
    return name;
}

function browser_load(f, prod) {
    var ftype = FTYPES[f.type];
    if (!ftype) return "";
    var loader;
    if (prod) loader = ftype.browser_load_prod;
    if (!loader) loader = ftype.browser_load;
    var name = f.name;
    if (prod && !f.lib) {
        name = output_file_name(name);
    }
    if (prod && f.remote && f.download) {
        // in the bundle the remote file will be saved locally
        return loader(name);
    }
    return loader(f.remote ? f.url : name);
}

exports.browser_load = browser_load;

var FTYPES = {
    js: {
        name: "{NAME}.min.js",
        output_type: "js",
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                try {
                    var orig_size = code.length;
                    code = minify_js(code);
                    var min_size = code.length;
                    PROJECT.client_log({
                        proj_id: args.proj.id,
                        cprefix: "UglifyJS",
                        filename: args.pfile.name,
                        message: args.pfile.name + " → " + args.reloutput + " (" + min_size + " bytes)"
                    });
                    FS.writeFile(output, code, "utf8", function(err){
                        if (err) return callback(err);
                        callback(null, output);
                    });
                } catch(ex) {
                    if (ex instanceof U2.JS_Parse_Error) {
                        var msg = {
                            class    : "error",
                            proj_id  : args.proj.id,
                            cprefix  : "UglifyJS",
                            filename : args.pfile.name,
                            line     : ex.line,
                            col      : ex.col + 1,
                            message  : ex.message
                        };
                        PROJECT.client_log(msg);
                        return callback(msg);
                    }
                    callback(ex);
                }
            });
        },
        browser_load: function(name) {
            return "<script src='" + name + "'></script>";
        },
    },

    css: {
        name: "{NAME}.min.css",
        output_type: "css",
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;
            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                code = CSSMIN(code);
                FS.writeFile(output, code, "utf8", function(err){
                    if (err) return callback(err);
                    PROJECT.client_log({
                        proj_id  : args.proj.id,
                        cprefix  : "CSSMin",
                        filename : args.pfile.name,
                        message  : args.pfile.name + " → " + args.reloutput + " (" + code.length + " bytes)",
                    });
                    callback(null, output);
                });
            });
        },
        browser_load: function(name) {
            return "<link rel='stylesheet' href='" + name + "' />";
        },
    },

    less: {
        name: "{NAME}.min.css",
        output_type: "css",
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
                    if (err) {
                        var msg = {
                            proj_id  : args.proj.id,
                            cprefix  : "LESS",
                            class    : "error",
                            filename : args.pfile.name,
                            line     : err.line,
                            col      : err.column,
                            message  : err.message
                        };
                        PROJECT.client_log(msg);
                        return callback(msg);
                    }
                    var code = tree.toCSS();
                    code = CSSMIN(code);
                    FS.writeFile(output, code, "utf8", function(err){
                        if (err) return callback(err);
                        PROJECT.client_log({
                            proj_id  : args.proj.id,
                            cprefix  : "LESS",
                            filename : args.pfile.name,
                            message  : args.pfile.name + " → " + args.reloutput + " (" + code.length + " bytes)",
                        });
                        callback(null, output);
                    });
                });
            });
        },
        browser_load: function(name) {
            return "<link rel='stylesheet/less' href='" + name + "' />";
        },
        browser_load_prod: function(name) {
            return "<link rel='stylesheet' href='" + name + "' />";
        }
    },

    coffee: {
        name: "{NAME}.min.coffee.js",
        output_type: "js",
        build: function(args, callback) {
            var source = args.source;
            var output = args.output;

            // the API doesn't look great (or I don't know how to use
            // it) so let's use the CLI tool.
            var cmd = PATH.join(TOPLEVEL_DIR, "node_modules", "coffee-script", "bin", "coffee");
            var cs = CP.spawn(process.argv[0], [ cmd, "--stdio", "--compile" ], { cwd: args.dir });

            var code = "", error = "";
            cs.stdout.on("data", function(data){ code += data });
            cs.stderr.on("data", function(data){ error += data });
            cs.stdout.on("end", function(){
                if (error) {
                    var m = /^\s*Error: Parse error on line ([0-9]+): (.*)/.exec(error);
                    if (m) {
                        var msg = {
                            proj_id  : args.proj.id,
                            class    : "error",
                            cprefix  : "CoffeeScript",
                            filename : args.pfile.name,
                            line     : parseInt(m[1], 16),
                            message  : m[2]
                        };
                        PROJECT.client_log(msg);
                        return callback(msg);
                    }
                    return callback(new Error(error));
                }
                // if all fine, compile through uglifyjs
                code = minify_js(code);
                FS.writeFile(output, code, "utf8", function(err){
                    if (err) return callback(err);
                    PROJECT.client_log({
                        proj_id  : args.proj.id,
                        cprefix  : "CoffeeScript",
                        filename : args.pfile.name,
                        message  : args.pfile.name + " → " + args.reloutput + " (" + code.length + " bytes)",
                    });
                    callback(null, output);
                });
            });

            FS.readFile(source, "utf8", function(err, code){
                if (err) return callback(err);
                cs.stdin.end(code, "utf8");
            });
        },
        browser_load: function(name) {
            return "<script type='text/coffeescript' src='" + name + "'></script>";
        },
        browser_load_prod: function(name) {
            return "<script src='" + name + "'></script>";
        }
    }
};

exports.get_output_type = function(input_type) {
    var f = FTYPES[input_type];
    return f && f.output_type;
};

exports.get_output_name = get_output_name;

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

function build_file(proj, f, build_type, callback) {
    var source = PATH.join(proj.path, f.name);
    var build = FTYPES[f.type];
    if (build) {
        var output = output_file_name(source);
        var reloutput = PATH_relative(proj.path, output);
        FS.stat(source, function(err, source_stat){
            if (err) return callback(err);
            UTILS.fs_ensure_directory(PATH.dirname(output), function(err){
                if (err) return callback(err);
                FS.stat(output, function(err, output_stat){
                    if (err) {
                        if (err.code == "ENOENT") {
                            // output not present, should build
                            return build.build({
                                proj       : proj,
                                dir        : proj.path,
                                pfile      : f,
                                build_type : build_type,
                                source     : source,
                                output     : output,
                                reloutput  : reloutput,
                            }, callback);
                        }
                        return callback(err);
                    }
                    var x = UTILS.file_change_time(source_stat);
                    var y = UTILS.file_change_time(output_stat);
                    if (x.getTime() > y.getTime() || source == output) {
                        // should build
                        return build.build({
                            proj       : proj,
                            dir        : proj.path,
                            pfile      : f,
                            build_type : build_type,
                            source     : source,
                            output     : output,
                            reloutput  : reloutput,
                        }, callback);
                    } else {
                        PROJECT.client_log({
                            proj_id: proj.id,
                            cprefix: "Compile",
                            filename: f.name,
                            message: reloutput + " is up to date"
                        });
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

function PATH_relative(dir, file) {
    return PATH.relative(dir, file).replace(/\\/g, "/");
}
