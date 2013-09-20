var HANDLEBARS  = require("handlebars");
var PATH        = require("path");
var FS          = require("fs");
var STEP        = require("step");
var U2          = require("uglify-js");
var CHEERIO     = require("cheerio");
var CRYPTO      = require("crypto");
var HTTP        = require("http");
var JSHINT      = require("jshint").JSHINT;
var CP          = require("child_process");
var SHELL       = require("shelljs");
var OS          = require("os");

var FSWATCH = require("./fswatch.js").watch;
var TEMPLATES = require("./templates.js");
var KLINT = require("kendo-lint/lib/lint.js");
var UTILS = require("./utils");
var CONFIG = require("./config");
var PLATFORM = require("./platform");
var ZIP = require("./zip");

var METADATA_FILE = "bootstrapper.json";

var PFILES = require("./files");
var EVENTS = require("./events")();
var RPC = require("./rpc");

function capture_client_log(func) {
    var old = CAPTURE_CLIENT_LOG;
    CAPTURE_CLIENT_LOG = func;
    return function() {
        CAPTURE_CLIENT_LOG = old;
    };
}

function CAPTURE_CLIENT_LOG() {};

function client_log(msg) {
    if (CAPTURE_CLIENT_LOG(msg))
        return;
    var txt = msg.message;
    if (msg.cprefix) {
        txt = msg.cprefix + ": " + txt;
    }
    if (msg.filename) {
        txt += " (" + msg.filename;
        if (msg.line) {
            txt += " +" + msg.line;
            if (msg.col) {
                txt += ":" + msg.col;
            }
        }
        txt += ")";
    }
    console.log(txt);
    EVENTS.notify("console", msg);
}

function PROJECTS() {
    return CONFIG.get("projects");
}

function PATH_relative(dir, file) {
    return PATH.relative(dir, file).sane_path();
}

EVENTS.listen([
    "register_project",
    "unregister_project",
    "delete_project",
    "project_add_file",
    "project_delete_file"
], function() {
    CONFIG.save();
});

EVENTS.listen({
    project_add_file: function(args) {
        var proj = get_project(args.proj_id);
        proj._watcher.add(PATH.join(proj.path, args.name));
    },
    project_delete_file: function(args) {
        var proj = get_project(args.proj_id);
        proj._watcher.remove(PATH.join(proj.path, args.file));
    }
});

function load_project(path) {
    var proj = FS.readFileSync(PATH.join(path, METADATA_FILE), "utf8");
    proj = JSON.parse(proj);
    return register_project(proj, path);
}

function unregister_project(proj, callback) {
    proj = get_project(proj);
    PROJECTS().del(proj.id);
    EVENTS.notify("unregister_project", proj.id);
}

function project_jshint_file(proj, file) {
    proj = get_project(proj);
    file = get_file_by_name(proj, file);
    function find_jshintrc(dir) {
        var file = PATH.join(dir, ".jshintrc");
        if (SHELL.test("-f", file)) {
            return file;
        }
        var parent = PATH.dirname(dir);
        if (parent == dir) return null;
        return find_jshintrc(parent);
    }
    var filename = FS.realpathSync(PATH.join(proj.path, file.name));
    var config_file = find_jshintrc(PATH.dirname(filename));

    var config = {              // defaults
        unused  : true,
        curly   : true,
        undef   : true,
        browser : true,
        jquery  : true,
        globals : {
            kendo : false
        }
    };
    if (config_file) {
        try {
            config = JSON.parse(
                U2.parse(FS.readFileSync(config_file, "utf8"), {
                    expression: true
                }).print_to_string({
                    beautify: true,
                    quote_keys: true
                })
            );
        } catch(ex) {
            client_log({
                cprefix: "JSHint",
                class: "error",
                proj_id: proj.id,
                message: "Cannot parse .jshintrc file: " + config_file
            });
        }
    }

    var code = FS.readFileSync(filename, "utf8");
    var globals = config.globals || {};
    delete config.globals;
    var success = JSHINT(code, config, globals || {});
    var results = [];
    if (!success) {
        JSHINT.errors.forEach(function(err){
            var msg = {
                cprefix  : "JSHint",
                class    : "error",
                proj_id  : proj.id,
                filename : file.name,
                line     : err.line,
                col      : err.character,
                message  : err.reason,
            };
            results.push(msg);
            client_log(msg);
        });
    }
    return results;
}

function project_run_onsave_hooks(proj, file, callback) {
    proj = get_project(proj);
    file = get_file_by_name(proj, file);

    var code = FS.readFileSync(PATH.join(proj.path, file.name), "utf8");
    if (!proj.config)
        proj.config = {};

    STEP(
        function() {
            if (proj.config.onsave_jshint && file.type == "js") {
                project_jshint_file(proj, file);
            }
            this(null);
        },
        function() {
            if (proj.config.onsave_klint) {
                var errors;
                if (file.type == "js") {
                    errors = KLINT.lint_javascript_file(code, file.name);
                }
                else if (file.page) {
                    errors = KLINT.lint_html_file(code, file.name);
                }
                if (errors) errors.forEach(function(msg){
                    msg.cprefix = "KLint";
                    msg.class = "error";
                    msg.proj_id = proj.id,
                    client_log(msg);
                });
            }
            this(null);
        },
        function() {
            if (proj.config.onsave_compile) {
                PFILES.build_file(proj, file, "prod", this);
            } else {
                this(null);
            }
        },

        callback
    )
}

function register_project(proj, path) {
    proj.path = path;
    PROJECTS().set(proj.id, proj);

    function queue() {
        var files = {};
        return function(event, path) {
            if (files[path]) clearTimeout(files[path]);
            files[path] = setTimeout(function(){
                delete files[path];
                var rel = PATH_relative(proj.path, path);
                var f = get_file_by_name(proj, rel);
                if (f) {
                    if (event == "change") {
			EVENTS.notify("fswatch", {
                            proj_id   : proj.id,
                            event     : event,
                            filename  : f.name,
                            file_id   : f.id,
                            file_type : f.type,
                            is_page   : f.page
			});
                        var restore_log = capture_client_log(function(msg){
                            if (msg.class == "error") {
                                var body = msg.message + " (" + msg.filename;
                                if (msg.line)
                                    body += ":" + msg.line + "," + (msg.col != null ? msg.col : 0);
                                body += ")";
                                PLATFORM.tray_notification({
                                    title : msg.cprefix,
                                    body  : body
                                });
                            }
                        });
                        project_run_onsave_hooks(proj, f, function(err){
                            restore_log();
                        });
                    }
                }
            }, 50);
        }
    };

    // make sure all the files are present on disk, otherwise discard
    // them from the project.
    var changed = false;
    for (var i = proj.files.length; --i >= 0;) {
        var f = proj.files[i];
        var filename = PATH.join(proj.path, f.name);
        try {
            FS.statSync(filename);
        } catch(ex) {
            client_log({
                class   : "error",
                cprefix : "Error",
                message : "Cannot access " + filename + ". Removing it from the project.",
            });
            proj.files.splice(i, 1);
            proj.files.forEach(function(g){
                if (g.deps) g.deps.remove(f.id);
            });
            changed = true;
        }
    }
    if (changed) save_meta(proj, function(){});

    EVENTS.notify("register_project", proj);

    proj._watcher = FSWATCH(proj.files.map(function(file){
        return PATH.join(proj.path, file.name);
    }), queue());

    return proj;
}

function delete_project(proj) {
    var found = PROJECTS().has(proj.id);
    PROJECTS().del(proj.id);
    if (found) EVENTS.notify("delete_project", proj);
    proj._watcher.close();
}

function get_project(id) {
    if (typeof id == "object" && !(id instanceof String))
        return id;
    return PROJECTS().get(id);
}

function project_file_info(proj, callback) {
    proj = get_project(proj);
    var dir = proj.path;
    var file_info = [];
    var index = 0;
    STEP(function(){
        var group = this.group();
        proj.files.forEach(function(f){
            file_info[index++] = {
                rel     : f.name,
                type    : f.type,
                library : !!f.lib,
            };
            PFILES.file_info(PATH.join(dir, f.name), group());
        });
    }, function(err, data){
        if (err) return callback(err);
        data.forEach(function(f, i){
            var finfo = file_info[i];
            var srctime = UTILS.file_change_time(f.stat);
            finfo.size = f.stat.size;
            finfo.date = srctime.toUTCString();
            finfo.full = f.file;
            finfo.canbuild = f.canbuild;
            if (!finfo.library && f.build) {
                var buildtime = UTILS.file_change_time(f.build.stat);
                file_info[index++] = finfo.build = {
                    rel   : PATH_relative(dir, f.build.file),
                    size  : f.build.stat.size,
                    date  : buildtime.toUTCString(),
                    full  : f.build.file,
                    dirty : srctime.getTime() > buildtime.getTime()
                };
            }
        });
        callback(null, { stats: file_info, files: proj.files });
    });
}

function project_r_js(proj, callback) {
    proj = get_project(proj);
    var rjs = PATH.join(TOPLEVEL_DIR, "node_modules", "requirejs", "bin", "r.js");
    var f = get_file_by_id(proj, "build.js");
    var p = CP.spawn(process.argv[0], [ rjs, "-o", f.name ], { cwd: proj.path });
    p.stdout.on("data", function(data){
        client_log({
            proj_id: proj.id,
            cprefix: "r.js",
            message: data.toString(),
        });
    });
    var errors = [];
    p.stderr.on("data", function(data){
        data = data.toString();
        client_log({
            proj_id: proj.id,
            class: "error",
            cprefix: "r.js",
            message: data,
        });
        errors.push(data);
    });
    p.stdout.on("end", function(){
        client_log({
            proj_id: proj.id,
            cprefix: "r.js",
            message: "Finished",
        });
        callback(errors.length > 0 ? errors.join("") : null);
    });
}

function project_rebuild_all(proj, build_type, callback) {
    proj = get_project(proj);
    var errors = [];
    STEP(function(){
        var group = this.group();
        proj.files.forEach(function(f){
            if (f.page) {
                // do nothing
            }
            else if (!f.lib && !f.drop) {
                var callback = group();
                PFILES.build_file(proj, f, build_type, function(err, data){
                    if (err) errors.push(err);
                    callback(null, data);
                });
            }
        });
    }, function(err){
        if (err) return callback(err);
        if (errors.length > 0) {
            return callback(errors);
        }
        if (proj.requirejs) {
            project_r_js(proj, this);
        } else {
            this();
        }
    }, function(err){
        if (err) return callback(err);
        project_file_info(proj, callback);
    });
}

function project_lint_javascript(proj, callback) {
    proj = get_project(proj);
    var results = [];
    proj.files.forEach(function(f){
        if (!f.lib && f.type == "js") {
            var data = project_jshint_file(proj, f);
            results.push.apply(results, data);
        }
    });
    callback(null, results);
}

function project_lint_kendo(proj, callback) {
    proj = get_project(proj);
    var results = [];
    proj.files.forEach(function(f){
        if (!f.lib) {
            if (f.type == "js" || f.page) {
                var filename = PATH.join(proj.path, f.name);
                var code = FS.readFileSync(filename, "utf8");
                var warnings = f.type == "js"
                    ? KLINT.lint_javascript_file(code, f.name, results)
                    : KLINT.lint_html_file(code, f.name, results);
                warnings.forEach(function(msg){
                    msg.cprefix = "KLint";
                    msg.proj_id = proj.id;
                    client_log(msg);
                });
            }
        }
    });
    callback(null, results);
}

function add_file(args, callback) {
    var proj = get_project(args.proj_id);
    if (!proj)
        return callback("Project " + args.proj_id + " not found");
    args.filename = args.filename.sane_path();
    if (proj.files.contains(null, function(f){ return f.name == args.filename }))
        return callback("This file name is already registered in the project");
    if (!("page" in args)) {
        args.page = /\.(html?|asp|php)$/i.test(args.filename);
    }
    var ext = PATH.extname(args.filename).replace(/^\.+/, "").toLowerCase();
    var new_file = {
        id       : args.id != null ? args.id : UTILS.uuid(),
        name     : args.filename,
        type     : args.type || ext,
        lib      : !!args.library,
        page     : !!args.page,
        remote   : !!args.remote,
        url      : args.url,
        download : !!args.download,
        deps     : args.deps || []
    };
    proj.files.push(new_file);
    function cont(err, data) {
        if (err) return callback(err);
        var fullpath = PATH.join(proj.path, args.filename);
        FS.stat(fullpath, function(err, stat){
            function finish() {
                var tmp = UTILS.shallow_copy(new_file);
                tmp.proj_id = proj.id;
                EVENTS.notify("project_add_file", tmp);
                callback(null, tmp);
            }
            if (err && err.code == "ENOENT") {
                UTILS.fs_ensure_directory(PATH.dirname(fullpath), function(err){
                    if (err) return callback(err);
                    FS.writeFile(fullpath, data, "utf8", function(err){
                        if (err) return callback(err);
                        save_meta(proj, function(err){
                            if (err) return callback(err);
                            finish();
                        });
                    });
                });
            } else {
                finish();
            }
        });
    }
    if (args.datapath) {
        return FS.readFile(args.datapath, "utf8", cont);
    }
    else if (args.page) {
        FS.readFile(TEMPLATES.get_template_filename(proj.template_id, "__new-page.html"), "utf8", function(err, data){
            if (err) return callback(err);
            var tmpl = HANDLEBARS.compile(data);
            cont(null, tmpl({
                PROJECT_ID : proj.id,
                PAGE       : new_file.name
            }));
        });
    }
    else {
        cont(null, "");
    }
}

function set_file_props(proj_id, filename, props, callback) {
    var proj = get_project(proj_id);
    var file = get_file_by_name(proj, filename);
    file.name      = props.name;
    file.type      = props.type;
    file.lib       = props.lib;
    file.page      = props.page;
    file.remote    = props.remote;
    file.url       = props.url;
    file.download  = props.download;
    save_meta(proj, callback);
}

function delete_file(proj_id, filename, callback) {
    var proj = get_project(proj_id);
    var file = get_file_by_name(proj, filename);
    if (file) proj.files.remove(null, function(f){
        if (f.deps) f.deps.remove(file.id);
        return f.name == filename;
    });
    save_meta(proj, function(err){
        if (err) return callback(err);
        var fullname = PATH.join(proj.path, filename);
        EVENTS.notify("project_delete_file", {
            proj_id : proj.id,
            file    : filename
        });
        PFILES.delete_file(fullname, function(err){
            if (err) return callback(err);
            callback(null);
        });
    });
}

function set_dependencies(proj, deps, callback) {
    proj = get_project(proj);
    for (var id in deps) {
        var file = get_file_by_id(proj, id);
        file.deps = deps[id];
    }
    save_meta(proj, callback);
}

function save_meta(proj, callback) {
    var destination = PATH.join(proj.path, METADATA_FILE);
    var data = JSON.stringify(proj, function(key, val){
        if (/^_/.test(key)) return undefined;
        return val;
    }, 4);
    FS.writeFile(destination, data, "utf8", callback);
}

function bootstrap(args, callback) {
    args = UTILS.defaults(args, {
        id          : null,
        name        : null,
        path        : null,
        requirejs   : false,
        template_id : "hello-world",
    });

    var dest_dir = args.path;

    function init_project(err) {
        if (err) return callback(err);
        init_project_template(args, function(err, project_meta){
            if (err) return callback(err);
            register_project(project_meta, args.path);
            callback(null, project_meta);
        });
    }

    var tmpl = TEMPLATES.get_template(args.template_id);
    if (!tmpl) return callback("Unknown project template");

    var copy_kendo = init_project;
    if (tmpl.use_kendo) {
        copy_kendo = function(err) {
            if (err) return callback(err);
            var kdest = PATH.join(dest_dir, "kendo");
            UTILS.fs_ensure_directory(kdest, function(err){
                if (err) return callback(err);
                UTILS.fs_copytree(
                    PATH.join(CONFIG.get("kendo_src_dir"), "js"),
                    PATH.join(kdest, "js"), {
                        callback: function(err) {
                            if (err) return callback(err);
                            UTILS.fs_copytree(
                                PATH.join(CONFIG.get("kendo_src_dir"), "styles"),
                                PATH.join(kdest, "css"), {
                                    callback: init_project
                                })}})})};
    }

    UTILS.fs_ensure_directory(PATH.dirname(dest_dir), function(err){
        if (err) return callback(err);
        UTILS.fs_copytree(TEMPLATES.get_template_dir(tmpl), dest_dir, {
            filter: function(f) {
                // we'll declare that files starting with two
                // underscores from project_template have special
                // use and are not to be copied in the new project
                // directory.
                return !/^__/.test(f.name);
            },
            callback: copy_kendo
        });
    });
};

function import_bootstrapper_project(path, callback) {
    var filename = PATH.join(path, METADATA_FILE);
    FS.readFile(filename, "utf8", function(err, ret){
        if (err) {
            callback(new RPC.Error("Can't read metadata file: " + filename));
            return;
        }
        try {
            var meta = JSON.parse(ret);
        } catch(ex) {
            callback(new RPC.Error("Can't parse metadata file: " + filename));
            return;
        }
        var proj = get_project(meta.id);
        if (proj) {
            callback(new RPC.Error("A project with the same ID already exists: " + meta.id));
            return;
        }
        register_project(meta, path);
        callback(null, meta);
    });
};

function import_project(args, callback) {
    var dirname = PATH.basename(args.path);
    try {
        var stat = FS.statSync(args.path);
        if (!stat.isDirectory())
            return callback(new RPC.Error(args.path + " is not a directory."));
    } catch(ex) {
        return callback(ex);
    }
    try {
        var stat = FS.statSync(PATH.join(args.path, METADATA_FILE));
        var proj = load_project(args.path);
        return callback(null, proj.id);
    } catch(ex) {}
    var proj = UTILS.defaults(args, {
        id    : dirname,
        name  : dirname,
        path  : null,
        files : [],
    });
    var byname = {};
    UTILS.fs_find(proj.path, {
        skip_vcs: true,
        filter: make_import_files_filter(args.import_rules),
        callback: function(err, f) {
            if (!err) {
                var name = PATH.basename(f.rel);
                var x = {
                    name : f.rel,
                    type : PATH.extname(f.rel).substr(1),
                    lib  : /\.min/.test(f.rel),
                    deps : [],
                };
                if (/^jquery(-[0-9.-]+)?(\.min)?\.js$/i.test(name)) {
                    x.id = "jquery";
                    x.lib = true;
                }
                else if (/^less(-[0-9.-]+)?(\.min)?\.js$/i.test(name)) {
                    x.id = "less";
                    x.lib = true;
                }
                else if (/^coffee-script(-[0-9.-]+)?(\.min)?\.js$/i.test(name)) {
                    x.id = "coffeescript";
                    x.lib = true;
                }
                else {
                    x.id = UTILS.uuid();
                    if (/\.(html?|php|jsp|asp)$/i.test(name)) {
                        x.page = true;
                    }
                }
                byname[f.rel] = x;
                proj.files.push(x);
            }
        },
        finish: function(err) {
            if (err) return callback(err);
            // drop files that seem to be compilation targets.
            for (var i = proj.files.length; --i >= 0;) {
                var f = proj.files[i];
                var name = f.name;
                var nomin = name.replace(/\.min/i, "");
                if (name != nomin && byname[nomin]) {
                    proj.files.splice(i, 1);
                }
            }
            register_project(proj, proj.path);
            save_meta(proj, callback);
        }
    });
};

function init_project_template(args, callback) {
    var metafile = PATH.join(args.path, METADATA_FILE);
    var meta;
    var project_files = [];
    var template_args = {
        PROJECT_ID   : args.id,
        PROJECT_NAME : args.name,
        USE_REQUIREJS : args.requirejs,
    };
    var fs_in_progress = 0;
    STEP(
        function require_js(err) {
            if (args.requirejs) {
                UTILS.fs_copy(PATH.join(TOPLEVEL_DIR, "node_modules", "requirejs", "require.js"),
                              PATH.join(args.path, "js", "require.js"),
                              this);
            } else {
                // build.js is not needed
                FS.unlink(PATH.join(args.path, "build.js"), this);
            }
        },
        function read_metadata() {
            FS.readFile(metafile, "utf8", this);
        },
        function process_metadata(err, content) {
            if (err) return callback(err);
            meta = JSON.parse(content);
            meta.id = args.id;
            meta.name = args.name;
            if (args.requirejs) {
                meta.requirejs = true;
                meta.files.push({
                    id   : "build.js",
                    name : "build.js",
                    type : "js",
                    drop : true
                }, {
                    id   : "require.js",
                    name : "js/require.js",
                    type : "js",
                    lib  : true
                });
            }
            FS.writeFile(metafile, JSON.stringify(meta, null, 4), "utf8", this);
        },
        function read_other_files(err) {
            if (err) return callback(err);
            var group = this.group();
            meta.files.forEach(function(f){
                if (f.lib) return;
                project_files.push(f);
                var next = group();
                ++fs_in_progress;
                (function doit(){
                    if (fs_in_progress >= 150) {
                        setTimeout(doit, 10);
                        return;
                    }
                    FS.readFile(PATH.join(args.path, f.name), "utf8", function(err, data){
                        --fs_in_progress;
                        next(null, err ? null : data);
                    });
                })();
            });
        },
        function process_other_files(err, contents) {
            if (err) return callback(err);
            var group = this.group();
            project_files.forEach(function(f, i){
                var file = PATH.join(args.path, f.name);
                var content = contents[i];
                if (content != null) {
                    var tmpl = HANDLEBARS.compile(content);
                    content = tmpl(template_args);
                    ++fs_in_progress;
                    var next = group();
                    (function doit(){
                        if (fs_in_progress >= 150) {
                            setTimeout(doit, 10);
                            return;
                        }
                        FS.writeFile(file, content, "utf8", function(){
                            --fs_in_progress;
                            return next.apply(this, arguments);
                        });
                    })();
                }
            });
        },
        function are_we_there_yet(err) {
            if (err) return callback(err);
            callback(null, meta);     // DONE.
        }
    );
};

function project_kendo_widget_usage(proj_id, callback) {
    var proj = get_project(proj_id);
    var js_files = proj.files.filter(function(f){
        return !f.lib && f.type == "js";
    });
    var page_files = proj.files.filter(function(f){ return !!f.page });
    var widgets = [];
    var kc = CONFIG.get_kendo_config().components;
    var detected_widgets = [];
    var uses_binder = false;
    function find_widget(name) {
        name = name.toLowerCase();
        return kc.filter(function(comp){
            if (!(comp.category == "framework" ||
                  (comp.category == "mobile" && proj.use_kendo == "mobile") ||
                  (comp.category == "web" && proj.use_kendo == "web") ||
                  (comp.category == "dataviz"))) {
                return false;
            }
            return comp.widgets.contains(null, function(el){
                if (el.name.toLowerCase() == name) {
                    detected_widgets.pushUniq(el.name);
                    return true;
                };
            });
        });
    }
    js_files.forEach(function(f){
        var code = FS.readFileSync(PATH.join(proj.path, f.name), "utf8");
        var ast = U2.parse(code, { filename: f.name });
        ast.walk(new U2.TreeWalker(function(node){
            var m;
            if (node instanceof U2.AST_Call
                && node.expression instanceof U2.AST_Dot) {

                // (...).kendoSomething()
                if (m = /^kendo(.*)$/.exec(node.expression.property)) {
                    widgets.pushUniq(m[1]);
                }

                // kendo.bind(...) should enable MVVM
                if (node.expression.expression instanceof U2.AST_Symbol &&
                    node.expression.expression.name == "kendo" &&
                    node.expression.property == "bind") {
                    uses_binder = true;
                }
            }
        }));
    });
    page_files.forEach(function(f){
        var code = FS.readFileSync(PATH.join(proj.path, f.name), "utf8");
        var $ = CHEERIO.load(code);
        $("[data-role]").each(function(){
            var role = $(this).attr("data-role");
            widgets.push(role);
        });
    });
    var components = [];
    widgets.forEach(function(name){
        components = components.concat(find_widget(name));
    });
    if (uses_binder) {
        components.push(kc.filter(function(c){ return c.id == "binder" })[0]);
    }
    callback(null, {
        widgets                 : detected_widgets,
        components              : components.remove_duplicates(),
        kendo_config            : CONFIG.get_kendo_config(),
        manual_kendo_components : proj.manual_kendo_components,
    });
};

function project_build_kendo(proj_id, args, callback) {
    var proj = get_project(proj_id);
    var kendo_dest_file, its_new_file = false;
    var detected = args.detected;
    var selected = args.selected;

    // if the user selected more components that we detected, we
    // should save this setting somewhere and apply it next time
    // build_kendo will be required.

    var additional = selected.minus(detected);
    if (additional.length > 0) {
        proj.manual_kendo_components = additional;
    } else {
        delete proj["manual_kendo_components"];
    }

    var kcomp = CONFIG.get_kendo_config().components;
    var selection = [];
    function require(comp) {
        if (typeof comp == "string") {
            for (var i = 0; i < kcomp.length; ++i) {
                if (kcomp[i].id == comp) {
                    comp = kcomp[i];
                    break;
                }
            }
        }
        if (comp.depends) {
            comp.depends.forEach(require);
        }
        selection.pushUniq(comp.source);
    }
    selected.forEach(require);

    for (var i = 0; i < proj.files.length; ++i) {
        if (proj.files[i].id == "kendo.custom") {
            kendo_dest_file = proj.files[i];
            break;
        }
    }
    if (!kendo_dest_file) {
        its_new_file = true;
        proj.files.push(kendo_dest_file = {
            name : "kendo/kendo.custom.min.js",
            type : "js",
            lib  : true,
            id   : "kendo.custom",
            deps : [ "jquery" ],
        });
    }

    if (args.update_deps) {
        proj.files.forEach(function(f){
            if (f.deps) f.deps.forEach(function(id, i){
                if (id == "kendo")
                    f.deps[i] = "kendo.custom";
            });
        });
    }

    save_meta(proj, function cont(err) {
        if (err) return callback(err);

        // concat kendo minified files and save in kendo/kendo-custom.js
        var toplevel = new U2.AST_Toplevel({ body: [] });
        selection.forEach(function(filename){
            client_log({
                cprefix: "KBuild",
                message: "Adding Kendo UI file: " + filename
            });
            filename = PATH.join(CONFIG.get("kendo_src_dir"), "js", filename);
            try {
                var code = FS.readFileSync(filename, "utf8");
                toplevel = U2.parse(code, {
                    filename: filename,
                    toplevel: toplevel
                });
            } catch(ex) {
                client_log({
                    cprefix : "KBuild",
                    class   : "error",
                    message : "Cannot read/parse file: " + filename
                });
            }
        });
        toplevel = toplevel.transform(new U2.TreeTransformer(function before(node, descend){
            if (node === toplevel)
                return undefined;

            if (!(this.parent() instanceof U2.AST_Toplevel))
                return node;    // no point to descend.

            // discard RequireJS boilerplate
            if (node instanceof U2.AST_SimpleStatement
                && node.body instanceof U2.AST_Call
                && node.body.expression instanceof U2.AST_Conditional
                && node.body.expression.consequent instanceof U2.AST_SymbolRef
                && node.body.expression.consequent.name == "define")
                // WHOA, I should really implement some pattern matching in UglifyJS
            {
                // so if that's the case, we want to replace the whole
                // simple statement with the *body* of the function
                // that gets passed to `define`.
                var f = node.body.args[1]; // args[0] is the dependency list
                return U2.MAP.splice(f.body);
            }

            return node;
        }));
        var code = toplevel.print_to_string();
        var dest = PATH.join(proj.path, kendo_dest_file.name);
        FS.writeFile(dest, code, "utf8", function(err){
            client_log({
                cprefix  : "KBuild",
                filename : kendo_dest_file.name,
                message  : "Wrote " + code.length + " characters to " + kendo_dest_file.name,
            });
            if (err) return callback(err);
            if (its_new_file) {
                EVENTS.notify("project_add_file", {
                    proj_id      : proj.id,
                    name         : kendo_dest_file.name,
                    type         : kendo_dest_file.type,
                    lib          : kendo_dest_file.lib,
                    custom_kendo : true
                });
            }
            callback();
        });
    });
};

function order_load_files(proj, files) {
    proj = get_project(proj);
    var required = [];
    var loading = [];
    function getFile(file) {
        for (var i = proj.files.length; --i >= 0;) {
            if (proj.files[i].id == file)
                return proj.files[i];
        }
    };
    function load(file) {
        var f = getFile(file);
        if (!f) throw new Error("Cannot find file: " + file);
        if (!loading.contains(f)) {
            loading.push(f);
            if (f.deps) f.deps.forEach(load);
            required.push(f);
        }
    };
    files.forEach(load);
    function is_style(f) {
        return /^less|css|scss|sass$/.test(f.type);
    }
    return UTILS.mergeSort(required, function(a, b){
        if (is_style(a) && !is_style(b)) return -1;
        if (is_style(b) && !is_style(a)) return 1;
        return 0;
    });
};

function get_file_by_name(proj, name) {
    if (typeof name != "string") return name;
    for (var i = proj.files.length; --i >= 0;) {
        if (proj.files[i].name == name)
            return proj.files[i];
    }
};

function get_file_by_id(proj, id) {
    if (typeof id != "string") return id;
    for (var i = proj.files.length; --i >= 0;) {
        if (proj.files[i].id == id)
            return proj.files[i];
    }
};

function generate_load_files(proj, page, build_type) {
    proj = get_project(proj);
    page = get_file_by_name(proj, page);
    if (!page.deps || page.deps.length == 0) return [];
    var deps = order_load_files(proj, page.deps);
    var has_less = build_type.devel &&
        deps.contains(null, function(f){ return f.type == "less" });
    var has_coffee = build_type.devel &&
        deps.contains(null, function(f){ return f.type == "coffee" });
    if (has_less || has_coffee) {
        deps = page.deps.slice(0);
        if (has_less) deps.push("less");
        if (has_coffee) deps.push("coffeescript");
        deps = order_load_files(proj, deps);
    }
    return deps;
};

function load_assets(options, callback) {
    var proj = options.proj;
    var page = options.page;
    var host = options.host || "localhost:7569";
    proj = get_project(proj);
    page = get_file_by_name(proj, page);
    var this_page_files = generate_load_files(proj, page, { devel: true });

    var wants_themebuilder = proj.config.preview_themebuilder;
    var code = "__THIS_PAGE_FILES__ = " + JSON.stringify(this_page_files, null, 2) + ";\n\n";
    code += "__THIS_PAGE__ = " + JSON.stringify(page, null, 2) + ";\n\n";
    code += "__THIS_PROJECT__ = " + JSON.stringify(proj.id) + ";\n\n";
    code += "document.write(" + JSON.stringify(assets()) + ")";
    if (!wants_themebuilder)
        return callback(null, code);

    // Attempt to load Kendo locally.  We need to locate Kendo files
    // within the project.  Should that fail, the themebuilder will
    // fetch Kendo UI from a CDN.

    function proj_url(rel) {
        return "http://" + host + "/@proj/" + proj.id + "/" + rel;
    }

    var args = {};
    UTILS.fs_find(proj.path, {
        skip_vcs: true,
        callback: function(err, f) {
            if (f.name == "kendo.all.min.js") args.js = f.rel;
            if (f.name == "kendo.common.min.css") args.css_common = f.rel;
            if (f.name == "kendo.black.min.css") args.css_black = f.rel;
            if (f.name == "jquery.min.js") args.jquery = f.rel;
        },
        finish: function() {
            code += "\n\nKENDO_THEMEBUILDER_OPTIONS = {\n";
            // found all?
            if (args.js && args.css_common && args.css_black && args.jquery) {
                var options = {
                    KENDO           : { js          : proj_url(args.js),
                                        css_common  : proj_url(args.css_common),
                                        css_black   : proj_url(args.css_black),
                                      },
                    JQUERY_LOCATION : proj_url(args.jquery)
                };
                code += JSON.stringify(options, null, 4).replace(/^\{|\}$/g, "");
            }
            code += "\n};";
            callback(null, code);
        }
    });

    function assets() {
        var filename = PATH.join(proj.path, page.name);
        var content = FS.readFileSync(filename, "utf8");
        var loads = this_page_files;
        if (proj.requirejs) {
            loads = loads.filter(function(f){
                // XXX: UGLY.
                return (f.type != "js" || (f.id == "less" || f.id == "coffeescript"))
            });
        }
        loads = loads.map(function(f){
            return PFILES.browser_load(f, false);
        });
        if (proj.requirejs) {
            var rjs_files = [];
            page.deps.forEach(function(id){
                var f = get_file_by_id(proj, id);
                if (f.type == "js") rjs_files.push(f);
            });
            loads.push("<script src=\"js/require.js\"></script>");
            loads.push("<script> require("
                       + JSON.stringify(rjs_files.map(function(f){
                           return "./" + f.name.replace(/\.js$/i, "");
                       }), null, 2)
                       + ") </script>");
        }
        loads.push("<script src=\"http://" + host + "/js/rpc.js\"></script>");
        loads.push("<script src=\"http://" + host + "/js/autorefresh.js\"></script>");
        if (wants_themebuilder)
            loads.push("<script src=\"http://" + host + "/js/themebuilder.js\"></script>");
        return loads.join("\n");
    }
};

function build_page_for_distro(proj, page, build_type, zip) {
    proj = get_project(proj);
    page = get_file_by_name(proj, page);
    var production = !build_type.devel;
    var filename = PATH.join(proj.path, page.name);
    var content = FS.readFileSync(filename, "utf8");
    var loads = generate_load_files(proj, page, build_type);
    client_log({
        proj_id  : proj.id,
        cprefix  : "Includes",
        filename : page.name,
        message  : loads.map(function(f){
            return f.name
        }).join(", ")
    });
    if (proj.requirejs || (zip && build_type.concat && production)) {
        var others = [];
        var js = loads.filter(function(f){
            if (!f.remote || f.download) {
                if (PFILES.get_output_type(f.type) == "js") {
                    return true;
                }
            }
            others.push(f);
            return false;
        });
        if (!proj.requirejs) {
            if (js.length > 0) {
                var name = js.map(function(f){ return f.name }).join(":");
                var md5 = CRYPTO.createHash("md5");
                md5.update(name);
                name = md5.digest("hex");
                name = "concat/" + name + ".js";
                if (!zip.file(name)) {
                    // concat those files and add to the archive
                    client_log({
                        proj_id : proj.id,
                        cprefix : "Concat",
                        filename: page.name,
                        message : js.map(function(f){
                            return f.name;
                        }).join(", ") + " → " + name
                    });
                    var all_code = "";
                    js.forEach(function(f){
                        var fullname = PATH.join(proj.path, PFILES.get_output_name(f, production));
                        var code = FS.readFileSync(fullname, "utf8");
                        all_code += code + "\n";
                    });
                    zip.file(name, all_code);
                }
                others.push({
                    type : "js",
                    name : name,
                    lib  : true
                });
            }
        } else {
            // XXX: the best way here seems to be to load the
            // "out" file listed in build.js, but some users might
            // need other scenarios.
            var build_js = PATH.join(proj.path, "build.js");
            try {
                build_js = FS.readFileSync(build_js, "utf8");
                build_js = global.eval(build_js);
                var main = build_js.out;
                others.push({
                    type: "js",
                    name: main,
                    lib: true
                });
            } catch(ex) {
                client_log({
                    proj_id : proj.id,
                    cprefix : "Build",
                    class   : "error",
                    message : "Cannot read build.js (" + ex + ")"
                });
            }
        }
        loads = others;
    }
    return content.replace(
        (/(^\s*)?<!--KENDO_BOOTSTRAPPER:FILES-->([^]*?)<!--\/KENDO_BOOTSTRAPPER:FILES-->/m),
        loads.map(function(f){
            return "$1" + PFILES.browser_load(f, !build_type.devel);
        }).join("\n")
    );
};

function download_remote_files(proj, callback) {
    proj = get_project(proj);
    STEP(
        function(){
            var group = this.group();
            proj.files.forEach(function(pf){
                if (pf.remote && pf.download) {
                    var next = group();
                    var url = pf.url;
                    if (/^\/\//.test(url))
                        url = "http:" + url;

                    client_log({
                        proj_id: proj.id,
                        filename: pf.name,
                        cprefix: "HTTP",
                        message: "Downloading " + url
                    });

                    var data = "";
                    HTTP.get(url, function(res){
                        res.setEncoding("utf8"); // XXX: this will bite.
                        res.on("data", function(chunk){
                            data += chunk;
                        });
                        res.on("end", function(){
                            FS.writeFile(PATH.join(proj.path, pf.name), data, next);
                        });
                    }).on("error", function(err){
                        client_log({
                            proj_id: proj.id,
                            filename: pf.name,
                            cprefix: "HTTP",
                            message: "Failed to download " + url
                        });
                        next(err);
                    });
                }
            });
        },
        callback
    );
};

function build_distro(proj, build_type, callback) {
    proj = get_project(proj);
    STEP(
        function() {
            project_rebuild_all(proj, build_type, this.parallel());
            optimize_images(proj, this.parallel());
        },
        build
    );
    function build(err, data){
        if (err) return callback(err);
        var all_files = [];
        var zip = new ZIP();
        var folder = zip.folder(proj.id);
        UTILS.fs_find(proj.path, {
            skip_vcs: true,
            callback: function(err, f) {
                if (!f.stat.isDirectory() && !/~$/.test(f.rel)) {
                    all_files.push(f);
                }
            },
            finish: function() {
                STEP(
                    function(){
                        download_remote_files(proj, this);
                    },
                    function(){
                        var group = this.group();
                        all_files.forEach(function(f){
                            var pf = get_file_by_name(proj, f.rel);
                            var next = group();

                            client_log({
                                proj_id  : proj.id,
                                filename : pf ? pf.name : null,
                                cprefix  : "Bundle",
                                message  : f.rel
                            });
                            if (pf) {
                                if (pf.page) {
                                    client_log({
                                        proj_id  : proj.id,
                                        filename : pf.name,
                                        cprefix  : "Build",
                                        message  : "Building Web page " + pf.name
                                    });
                                    var data = build_page_for_distro(proj, pf, build_type, folder);
                                    folder.file(f.rel, data);
                                    next(f);
                                }
                                else if (pf.remote && !pf.download) {
                                    // no download requested, the file will be loaded from remote in the HTML.
                                    next(f);
                                }
                                else {
                                    FS.readFile(f.full, { encoding: "binary" }, function(err, data){
                                        folder.file(f.rel, data, {
                                            binary: true,
                                            optimizedBinaryString: true // SPEED x2
                                        });
                                        next(f);
                                    });
                                }
                            }
                            else {
                                FS.readFile(f.full, { encoding: "binary" }, function(err, data){
                                    folder.file(f.rel, data, {
                                        binary: true,
                                        optimizedBinaryString: true // SPEED x2
                                    });
                                    next(f);
                                });
                            }
                        });
                    },
                    function() {
                        try {
                            var data = zip.generate({
                                type: "string",
                                compression: "STORE", // "DEFLATE" is 5 times slower, and we don't really need it.
                            });
                            client_log({
                                proj_id: proj.id,
                                cprefix: "ZIP",
                                message: "Generated " + proj.id + ".zip (" + data.length + " bytes, uncompressed)"
                            });
                            callback(null, data);
                        } catch(ex) {
                            console.log(ex);
                            callback(ex);
                        }
                    }
                );
            }
        })
    };
};

/* -----[ Exports ]----- */

exports.bootstrap = bootstrap;
exports.build_distro = build_distro;
exports.init_project_template = init_project_template;
exports.get_project = get_project;
exports.EVENTS = EVENTS;
exports.forEach = function(f) { PROJECTS().each(f) };
exports.add_file = add_file;
exports.load = load_project;
exports.order_load_files = order_load_files;
exports.generate_load_files = generate_load_files;
exports.get_file_by_name = get_file_by_name;
exports.client_log = client_log;
exports.load_assets = load_assets;

/* -----[ RPC handlers ]----- */

RPC.defhandler("project/file-info", function(request, proj_id){
    project_file_info(proj_id, request.make_handler());
});

RPC.defhandler("project/rebuild-all", function(request, proj_id){
    project_rebuild_all(proj_id, "devel", request.make_handler());
});

RPC.defhandler("project/delete-file", function(request, proj_id, filename){
    delete_file(proj_id, filename, request.make_handler());
});

RPC.defhandler("project/edit-file", function(request, proj_id, filename, line, col){
    var proj = get_project(proj_id);
    PLATFORM.edit_file(proj.path, filename, line, col, function(err, cmd){
	RPC.send_result(request, { command: cmd });
    });
});

RPC.defhandler("project/bootstrap", function(request, args){
    request.validate("id", args.id, "required", "The ID is required");
    request.validate("id", args.id, /^[a-z0-9_]*$/i, "Please use only letters, digits and underscore for the ID");
    request.validate("id", get_project(args.id), "null", "This ID is already registered");
    request.validate("name", args.name, "required", "Please specify a name for the project");
    request.validate("path", args.path, "required", "The directory is required");

    var isEmpty = true;
    request.validate("path", args.path, function(dir){
        try {
            var stat = FS.statSync(dir);
            if (!stat.isDirectory())
                return "Path " + dir + " exists and is not a directory";
            if (FS.readdirSync(dir).length > 0)
                isEmpty = false;
            return true;
        } catch(ex) {
            if (ex.code == "ENOENT") return true;
        }
    });

    var proj = {
        id          : args.id,
        name        : args.name,
        path        : args.path,
        requirejs   : args.requirejs,
        template_id : args.template_id,
    };
    if (isEmpty || args.confirm) {
        bootstrap(proj, request.make_handler());
    } else {
        RPC.send_error(request, "NOTEMPTY");
    }
});

function optimize_images(proj, callback) {
    proj = get_project(proj);
    try {
        var count = 0;
        UTILS.fs_find(proj.path, {
            skip_vcs: true,
            filter: function(f) {
                return !f.stat.isDirectory() && (/\.(jpe?g|png)$/i.test(f.rel));
            },
            callback: function(err, f) {
                (function doit() {
                    if (count > 8) { // how many cores can one have?
                        setTimeout(doit, 10);
                        return;
                    }
                    ++count;
                    PLATFORM.optimize_image(f.full, function(err){
                        --count;
                        if (!err) {
                            FS.stat(f.full, function(err, stat){
                                if (f.stat.size == stat.size) {
                                    client_log({
                                        cprefix: "Info",
                                        message: "No change to " + f.rel
                                    });
                                } else {
                                    client_log({
                                        cprefix: "Info",
                                        message: "Optimized " + f.rel + " (" + f.stat.size + " → " + stat.size + ")",
                                    });
                                }
                            });
                        } else {
                            if (err instanceof Error) err = err.message;
                            client_log({
                                class   : "error",
                                cprefix : "Warn",
                                message : err,
                            });
                        }
                        if (count == 0) callback();
                    });
                })();
            }
        });

    } catch(ex) {
        console.log(ex);
    }
};

RPC.defhandler("project/optimize-images", function(request, proj_id){
    optimize_images(proj_id, request.make_handler());
});

RPC.defhandler("project/widget-usage", function(request, proj_id){
    project_kendo_widget_usage(proj_id, request.make_handler());
});

RPC.defhandler("project/build-kendo", function(request, proj_id, components){
    project_build_kendo(proj_id, components, request.make_handler());
});

RPC.defhandler("project/set-dependencies", function(request, proj_id, deps){
    set_dependencies(proj_id, deps, request.make_handler());
});

RPC.defhandler("project/lint-javascript", function(request, proj_id){
    project_lint_javascript(proj_id, request.make_handler());
});

RPC.defhandler("project/lint-kendo", function(request, proj_id){
    project_lint_kendo(proj_id, request.make_handler());
});

RPC.defhandler("project/set-file-props", function(request, proj_id, filename, props){
    set_file_props(proj_id, filename, props, request.make_handler());
});

RPC.defhandler("project/add-file", function(request, proj_id, props){
    props.proj_id = proj_id;
    add_file(props, request.make_handler());
});

RPC.defhandler("project/import-bootstrapper-project", function(request, path){
    import_bootstrapper_project(path, request.make_handler());
});

RPC.defhandler("project/import-project", function(request, args){
    import_project(args, request.make_handler());
});

RPC.defhandler("project/unregister", function(request, proj_id){
    unregister_project(proj_id, request.make_handler());
});

function getIPAddress() {
    var interfaces = OS.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return 'localhost';
}

RPC.defhandler("project/get-preview-url", function(request, proj_id){
    var url = "http://" + getIPAddress() + ":7569/@proj/" + proj_id + "/";
    RPC.send_result(request, url);
});

RPC.defhandler("project/preview-files-to-import", function(request, args){
    var callback = request.make_handler();
    var files = [];
    UTILS.fs_find(args.path, {
        skip_vcs: true,
        filter: make_import_files_filter(args.rules),
        callback: function(err, f) {
            if (!err) files.push(f);
        },
        finish: function(err) {
            if (err) return callback(err);
            callback(null, files);
        }
    });
});

function make_import_files_filter(rules) {
    rules = rules.split(/[\r\n]+/).map(function(r){
        r = r.trim();
        var type = r.charAt(0);
        var pat = r.substr(1).trim();
        var m = /^\/(.*)\/([a-z]*)$/.exec(pat);
        if (m) {
            pat = new RegExp(m[1], m[2]);
        } else {
            pat = pat.globToRegexp();
        }
        return { type: type, rx: pat };
    });
    return function(f) {
        if (f.stat.isDirectory()) return false;
        var include = false;
        for (var i = 0; i < rules.length; ++i) {
            var r = rules[i];
            if (r.rx.test(f.rel)) {
                if (r.type == "-") return false;
                include = true;
            }
        }
        return include;
    };
};

RPC.defhandler("project/r.js", function(request, proj_id){
    project_r_js(proj_id, request.make_handler());
});

RPC.defhandler("project/operate-on-files", function(request, proj, optype, file_names){
    var callback = request.make_handler();
    proj = get_project(proj);
    file_names.forEach(function(filename){
        var file = get_file_by_name(proj, filename);
        if (file) {
            if (optype == "unregister_files" || optype == "delete_files") {
                proj.files.remove(null, function(f){
                    if (f.deps) f.deps.remove(file.id);
                    return f.name == filename;
                });
                if (optype == "delete_files") {
                    var fullname = PATH.join(proj.path, filename);
                    FS.unlinkSync(fullname);
                }
                EVENTS.notify("project_delete_file", {
                    proj_id : proj.id,
                    file    : file.name
                });
            }
            else switch (optype) {
              case "make_project_files":
                delete file["lib"];
                break;
              case "make_library_files":
                file.lib = true;
                break;
            }
        }
    });
    save_meta(proj, callback);
});

RPC.defhandler("project/save-config", function(request, proj_id, config) {
    var proj = get_project(proj_id);
    proj.config = config;
    save_meta(proj, request.make_handler());
});

RPC.defhandler("project/save-custom-theme", function(request, proj_id, args) {
    var proj = get_project(proj_id);
    var filename = args.filename;
    var filetype = args.filetype;
    var content = args.content;
    var callback = request.make_handler();

    var fullname = PATH.join(proj.path, filename);
    UTILS.fs_ensure_directory(PATH.dirname(fullname), function(err){
        if (err) return callback(err);
        FS.writeFile(fullname, content, "utf8", function(err){
            if (err) return callback(err);
            var file = get_file_by_name(proj, filename);
            if (!file) {
                proj.files.push(file = {
                    id   : UTILS.uuid(),
                    name : filename,
                    type : filetype,
                    lib  : false,
                    deps : [ "kendo.common.css" ],
                });
                file = UTILS.shallow_copy(file);
                file.proj_id = proj.id;
                EVENTS.notify("project_add_file", file);
                save_meta(proj, function(){
                    callback(null, true);
                });
                return;
            }
            callback(null, false);
        });
    });
});
