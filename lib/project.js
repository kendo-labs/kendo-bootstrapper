var HANDLEBARS  = require("handlebars");
var PATH        = require("path");
var FS          = require("fs");
var STEP        = require("step");

var UTILS = require("./utils");
var CONFIG = require("./config");

var METADATA_FILE = "bootstrapper.json";

var PROJECTS = new UTILS.Dictionary();
var PFILES = require("./files");
var EVENTS = require("./events")();
var RPC = require("./rpc");

function register_project(proj, path) {
    proj = {
        meta: proj,
        path: path,
    };
    PROJECTS.set(proj.meta.id, proj);
    EVENTS.notify("register_project", proj);
}

function delete_project(proj) {
    var found = PROJECTS.has(proj.id);
    PROJECTS.del(proj.id);
    if (found) EVENTS.notify("delete_project", proj);
}

function get_project(id) {
    return PROJECTS.get(id);
}

function project_file_info(id, callback) {
    var proj = get_project(id);
    var dir = proj.path;
    var file_info = [];
    var index = 0;
    STEP(function(){
        var group = this.group();
        function do_filegroup(files, type, islib) {
            files.forEach(function(file){
                file_info[index++] = {
                    rel     : file,
                    type    : type,
                    library : islib,
                };
                PFILES.file_info(PATH.join(dir, file), group());
            });
        }
        UTILS.maphash(proj.meta.min_files, function(files, type){
            do_filegroup(files, type, true);
        });
        UTILS.maphash(proj.meta.files, function(files, type){
            do_filegroup(files, type, false);
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
                    rel   : PATH.relative(dir, f.build.file),
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

function project_rebuild_all(id, callback) {
    var proj = get_project(id);
    var dir = proj.path;
    STEP(function(){
        var group = this.group();
        UTILS.maphash(proj.meta.files, function(files, type){
            files.forEach(function(file){
                PFILES.build_file(PATH.join(dir, file), group());
            });
        });
    }, function(err){
        if (err) return callback(err);
        project_file_info(id, callback);
    });
}

function add_file(args, callback) {
    var proj = get_project(args.proj_id);
    if (!proj) return callback(new Error("Project " + args.proj_id + " not found"));
    var dest = args.library ? proj.meta.min_files : proj.meta.files;
    var ext = PATH.extname(args.filename).replace(/^\.+/, "").toLowerCase();
    if (!dest[ext]) dest[ext] = [];
    dest[ext].push(args.filename);
    function cont(err, data) {
        if (err) return callback(err);
        var fullpath = PATH.join(proj.path, args.filename);
        FS.writeFile(fullpath, data, "utf8", function(err){
            if (err) return callback(err);
            save_meta(proj, function(err){
                if (err) return callback(err);
                EVENTS.notify("project_add_file", {
                    proj_id : proj.meta.id,
                    library : args.library,
                    ext     : ext,
                    file    : args.filename,
                });
                callback();
            });
        });
    }
    if (args.datapath) return FS.readFile(args.datapath, "utf8", cont);
    else cont(null, "");
}

function save_meta(proj, callback) {
    var destination = PATH.join(proj.path, METADATA_FILE);
    var data = JSON.stringify(proj.meta, null, 4);
    FS.writeFile(destination, data, "utf8", callback);
}

function bootstrap(args, callback) {
    args = UTILS.defaults(args, {
        id    : null,
        name  : null,
        path  : null,
        force : false
    });

    var project_template_dir = PATH.join(TOPLEVEL_DIR, "project_template");
    var dest_dir = args.path;

    function cont() {
        UTILS.fs_ensure_directory(PATH.dirname(dest_dir), function(err){
            if (err) return callback(err);
            UTILS.fs_copytree(project_template_dir, dest_dir, function(err){
                if (err) return callback(err);
                init_project_template(args, function(err, project_meta){
                    if (err) return callback(err);
                    register_project(project_meta, args.path);
                    callback(null, project_meta);
                });
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
        PROJECT_NAME : args.name
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
            function dofiles(files, type) {
                files.forEach(function(file){
                    file = PATH.join(args.path, file);
                    project_files.push({ name: file, type: type });
                    FS.readFile(file, "utf8", group());
                });
            }
            if (meta.files) {
                if ( meta.files.html ) dofiles(meta.files.html , "html");
                if ( meta.files.js   ) dofiles(meta.files.js   , "js");
                if ( meta.files.css  ) dofiles(meta.files.css  , "css");
                if ( meta.files.less ) dofiles(meta.files.less , "less");
            }
        },
        function process_other_files(err, contents) {
            if (err) return callback(err);
            var group = this.group();
            project_files.forEach(function(f, i){
                var file = f.name, type = f.type;
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

function edit_file(proj_id, filename) {
    var proj = get_project(proj_id);
    var dir = proj.path;
    var fullname = PATH.join(dir, filename);
    var cmd, args = [ filename ];
    switch (process.platform) {
      case "linux":
      case "freebsd":
        cmd = "gedit";
        break;
      case "sunos":
        throw new Error("What? SunOS??");
      case "win32":
      case "win64":
        cmd = "notepad.exe";
        break;
      case "darwin":
        throw new Error("To be implemented");
        break;
    }
    var cp = require("child_process");
    cp.spawn(cmd, args, {
        cwd: dir,
    });
    return cmd;
};

/* -----[ Exports ]----- */

exports.bootstrap = bootstrap;
exports.init_project_template = init_project_template;
exports.get_project = get_project;
exports.EVENTS = EVENTS;
exports.forEach = function(f) { PROJECTS.each(f) };
exports.add_file = add_file;

/* -----[ RPC handlers ]----- */

RPC.defhandler("project/file-info", function(request, proj_id){
    project_file_info(proj_id, function(err, info){
        if (err) return RPC.send_error(request, err.toString());
        RPC.send_result(request, info);
    });
});

RPC.defhandler("project/rebuild-all", function(request, proj_id){
    project_rebuild_all(proj_id, function(err, info){
        if (err) return RPC.send_error(request, err.toString());
        RPC.send_result(request, info);
    });
});

RPC.defhandler("project/delete-file", function(request, proj_id, filename){
    var proj = get_project(proj_id);
    [ proj.meta.min_files, proj.meta.files ].forEach(function(bag){
        UTILS.maphash(bag, function(files, type){
            files.remove(filename);
        });
    });
    save_meta(proj, function(err){
        if (err) return callback(err);
        var fullname = PATH.join(proj.path, filename);
        PFILES.delete_file(fullname, function(err){
            if (err) return RPC.send_error(request, err);
            EVENTS.notify("project_delete_file", {
                proj_id : proj.meta.id,
                file    : filename
            });
        });
    });
});

RPC.defhandler("project/edit-file", function(request, proj_id, filename){
    var cmd = edit_file(proj_id, filename);
    RPC.send_result(request, { command: cmd });
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
