var HANDLEBARS  = require("handlebars");
var PATH        = require("path");
var FS          = require("fs");
var STEP        = require("step");
var U2          = require("uglify-js");
var CHEERIO     = require("cheerio");
var CRYPTO      = require("crypto");
var JSHINT      = require("jshint").JSHINT;

var KLINT = require("../kendo-lint/lint.js");
var UTILS = require("./utils");
var CONFIG = require("./config");
var PLATFORM = require("./platform");
var ZIP = require("./zip");

var METADATA_FILE = "bootstrapper.json";

var PFILES = require("./files");
var EVENTS = require("./events")();
var RPC = require("./rpc");

function client_log(msg) {
    EVENTS.notify("console", msg);
}

function PROJECTS() {
    return CONFIG.get("projects");
}

function PATH_relative(dir, file) {
    return PATH.relative(dir, file).replace(/\\/g, "/");
}

EVENTS.listen([
    "register_project",
    "delete_project",
    "project_add_file",
    "project_delete_file"
], function() {
    CONFIG.save();
});

function load_project(path) {
    var proj = FS.readFileSync(PATH.join(path, METADATA_FILE), "utf8");
    proj = JSON.parse(proj);
    register_project(proj, path);
}

function register_project(proj, path) {
    proj.path = path;
    PROJECTS().set(proj.id, proj);
    EVENTS.notify("register_project", proj);
}

function delete_project(proj) {
    var found = PROJECTS().has(proj.id);
    PROJECTS().del(proj.id);
    if (found) EVENTS.notify("delete_project", proj);
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
        callback(null, file_info);
    });
}

function project_rebuild_all(proj, build_type, callback) {
    proj = get_project(proj);
    var errors = [];
    STEP(function(){
        var group = this.group();
        proj.files.forEach(function(f){
            if (!f.lib) {
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
            errors.forEach(function(err){
                if (err.filename) {
                    err.filename = PATH_relative(proj.path, err.filename);
                }
            });
            return callback(errors);
        }
        project_file_info(proj, callback);
    });
}

function project_lint_javascript(proj, callback) {
    proj = get_project(proj);
    var data = [];
    proj.files.forEach(function(f){
        if (!f.lib && f.type == "js") {
            var filename = PATH.join(proj.path, f.name);
            var code = FS.readFileSync(filename, "utf8");
            try {
                var success = JSHINT(code, {
                    unused  : true,
                    curly   : true,
                    undef   : true,
                    browser : true,
                    jquery  : true
                }, {
                    kendo: false
                });
                if (!success) {
                    data.push({
                        file: f,
                        errors: JSHINT.errors.slice()
                    });
                }
            } catch(ex) {
                console.log(ex);
                console.log(ex.stack);
                return callback(ex);
            }
        }
    });
    var results = [];
    data.forEach(function(x){
        x.errors.forEach(function(err){
            var msg = {
                cprefix  : "JSHint",
                proj_id  : proj.id,
                filename : x.file.name,
                line     : err.line,
                col      : err.character - 1,
                message  : err.reason
            };
            client_log(msg);
            results.push(msg);
        });
    });
    callback(null, results);
}

function project_lint_kendo(proj, callback) {
    proj = get_project(proj);
    var results = [];
    proj.files.forEach(function(f){
        if (!f.lib && f.type == "js") {
            var filename = PATH.join(proj.path, f.name);
            var code = FS.readFileSync(filename, "utf8");
            var warnings = KLINT.lint_javascript_file(code, f.name, results);
            warnings.forEach(function(msg){
                msg.cprefix = "KLint";
                msg.proj_id = proj.id;
                client_log(msg);
            });
        }
    });
    callback(null, results);
}

function add_file(args, callback) {
    var proj = get_project(args.proj_id);
    if (!proj)
        return callback(new Error("Project " + args.proj_id + " not found"));
    args.filename = args.filename.replace(/\\/g, "/");
    if (proj.files.contains(null, function(f){ return f.name == args.filename }))
        return callback(new Error("A file with the same name already exists"));
    var ext = PATH.extname(args.filename).replace(/^\.+/, "").toLowerCase();
    var new_file = {
        id   : args.id != null ? args.id : UTILS.uuid(),
        name : args.filename,
        type : ext,
        lib  : args.library,
        page : args.page,
    };
    proj.files.push(new_file);
    function cont(err, data) {
        if (err) return callback(err);
        var fullpath = PATH.join(proj.path, args.filename);
        FS.writeFile(fullpath, data, "utf8", function(err){
            if (err) return callback(err);
            save_meta(proj, function(err){
                if (err) return callback(err);
                var tmp = UTILS.shallow_copy(new_file);
                tmp.proj_id = proj.id;
                EVENTS.notify("project_add_file", tmp);
                callback();
            });
        });
    }
    if (args.datapath) {
        return FS.readFile(args.datapath, "utf8", cont);
    }
    else if (args.page) {
        FS.readFile(CONFIG.get_project_template_file("__new-page.html"), "utf8", cont);
    }
    else {
        cont(null, "");
    }
}

function delete_file(proj_id, filename, callback) {
    var proj = get_project(proj_id);
    var file = get_file_by_name(proj, filename);
    if (file) proj.files.remove(null, function(f){
        f.deps.remove(file.id);
        return f.name == filename;
    });
    save_meta(proj, function(err){
        if (err) return callback(err);
        var fullname = PATH.join(proj.path, filename);
        PFILES.delete_file(fullname, function(err){
            if (err) return callback(err);
            EVENTS.notify("project_delete_file", {
                proj_id : proj.id,
                file    : filename
            });
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
    var data = JSON.stringify(proj, null, 4);
    FS.writeFile(destination, data, "utf8", callback);
}

function bootstrap(args, callback) {
    args = UTILS.defaults(args, {
        id    : null,
        name  : null,
        path  : null,
        force : false
    });

    var dest_dir = args.path;

    function cont() {
        UTILS.fs_ensure_directory(PATH.dirname(dest_dir), function(err){
            if (err) return callback(err);
            UTILS.fs_copytree(CONFIG.get_project_template_directory(), dest_dir, {
                filter: function(f) {
                    // we'll declare that files starting with two
                    // underscores from project_template have special
                    // use and are not to be copied in the new project
                    // directory.
                    return !/^__/.test(f.name);
                },
                callback: function(err){
                    if (err) return callback(err);
                    init_project_template(args, function(err, project_meta){
                        if (err) return callback(err);
                        register_project(project_meta, args.path);
                        callback(null, project_meta);
                    });
                }
            });
        });
    };

    FS.stat(dest_dir, function(err, dest_dir_stat){
        if (dest_dir_stat) {
            if (!args.force)
                return callback(new Error("Directory exists"));
            UTILS.fs_rmpath(dest_dir, cont);
        }
        else cont();
    });
};

function init_project_template(args, callback) {
    var metafile = PATH.join(args.path, METADATA_FILE);
    var meta;
    var project_files = [];
    var template_args = {
        PROJECT_ID   : args.id,
        PROJECT_NAME : args.name,
        KENDO_THEMES : [
            "default",
            "black",
            "blueopal",
            "bootstrap",
            "highcontrast",
            "metroblack",
            "metro",
            "moonlight",
            "silver",
            "uniform"
        ]
    };
    STEP(
        function read_metadata() {
            FS.readFile(metafile, "utf8", this);
        },
        function process_metadata(err, content) {
            if (err) return callback(err);
            var tmpl = HANDLEBARS.compile(content);
            content = tmpl(template_args);
            meta = JSON.parse(content);
            FS.writeFile(metafile, content, "utf8", this);
        },
        function read_other_files(err) {
            if (err) return callback(err);
            var group = this.group();
            meta.files.forEach(function(f){
                project_files.push(f);
                FS.readFile(PATH.join(args.path, f.name), "utf8", group());
            });
        },
        function process_other_files(err, contents) {
            if (err) return callback(err);
            var group = this.group();
            project_files.forEach(function(f, i){
                var file = PATH.join(args.path, f.name);
                var content = contents[i];
                var tmpl = HANDLEBARS.compile(content);
                content = tmpl(template_args);
                FS.writeFile(file, content, "utf8", group());
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
            return comp.widgets.contains(null, function(el){
                if (el.name.toLowerCase() == name) {
                    detected_widgets.push(el.name);
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
        components              : components,
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
        if (proj.files[i].id == "kendo") {
            kendo_dest_file = proj.files[i];
            break;
        }
    }
    if (!kendo_dest_file) {
        its_new_file = true;
        proj.files.push(kendo_dest_file = {
            name : "kendo/kendo.min.js",
            type : "js",
            lib  : true,
            id   : "kendo"
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
            filename = PATH.join(TOPLEVEL_DIR, "kendosrc", "js", filename);
            var code = FS.readFileSync(filename, "utf8");
            toplevel = U2.parse(code, {
                filename: filename,
                toplevel: toplevel
            });
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
    return required;
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

function build_page(proj, page, build_type) {
    proj = get_project(proj);
    page = get_file_by_name(proj, page);
    var filename = PATH.join(proj.path, page.name);
    var content = FS.readFileSync(filename, "utf8");
    var loads = generate_load_files(proj, page, build_type).map(function(f){
        return PFILES.browser_load(f, !build_type.devel);
    });
    return content.replace(
        (/<!--KENDO_BOOTSTRAPPER:FILES-->([^]*?)<!--\/KENDO_BOOTSTRAPPER:FILES-->/),
        "<!--KENDO_BOOTSTRAPPER:FILES-->" +
            loads.join("\n") +
            "<!--/KENDO_BOOTSTRAPPER:FILES-->"
    );
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
    if (zip && build_type.concat && production) {
        var others = [];
        var js = loads.filter(function(f){
            var is_js = PFILES.get_output_type(f.type) == "js";
            if (!is_js) others.push(f);
            return is_js;
        });
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
        loads = others;
    }
    return content.replace(
        (/(^\s*)?<!--KENDO_BOOTSTRAPPER:FILES-->([^]*?)<!--\/KENDO_BOOTSTRAPPER:FILES-->/m),
        loads.map(function(f){
            return "$1" + PFILES.browser_load(f, !build_type.devel);
        }).join("\n")
    );
};

function build_distro(proj, build_type, callback) {
    proj = get_project(proj);
    project_rebuild_all(proj, build_type, function(err, data){
        if (err) return callback(err);
        var all_files = [];
        UTILS.fs_find(proj.path, {
            callback: function(err, f) {
                if (!f.stat.isDirectory() && !/~$/.test(f.rel)) {
                    all_files.push(f);
                }
            },
            finish: function() {
                try {
                    var zip = new ZIP();
                    var folder = zip.folder(proj.id);
                    all_files.forEach(function(f){
                        var pf = get_file_by_name(proj, f.rel);
                        client_log({
                            proj_id  : proj.id,
                            filename : pf ? pf.name : null,
                            cprefix  : "Bundle",
                            message  : f.rel
                        });
                        if (pf && pf.page) {
                            client_log({
                                proj_id  : proj.id,
                                filename : pf.name,
                                cprefix  : "Build",
                                message  : "Building Web page " + pf.name
                            });
                            var data = build_page_for_distro(proj, pf, build_type, folder);
                            folder.file(f.rel, data);
                        } else {
                            var data = FS.readFileSync(f.full, "binary");
                            folder.file(f.rel, data, {
                                binary: true,
                                optimizedBinaryString: true // SPEED x2
                            });
                        }
                    });
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
                    callback(ex);
                }
            }
        })
    });
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
exports.build_page = build_page;
exports.client_log = client_log;

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
    request.validate("path", args.path, function(dir){
        try {
            var stat = FS.statSync(dir);
            if (!stat.isDirectory())
                return "Path " + dir + " exists and is not a directory";
            if (FS.readdirSync(dir).length > 0)
                return "Directory " + dir + " is not empty";
            return true;
        } catch(ex) {
            if (ex.code == "ENOENT") return true;
        }
    });
    bootstrap({ id   : args.id,
                name : args.name,
                path : args.path },
              request.make_handler());
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
