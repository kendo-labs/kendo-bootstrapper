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
    PROJECTS.set(proj.id, {
        meta: proj,
        path: path,
    });
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

exports.bootstrap = bootstrap;
exports.init_project_template = init_project_template;
exports.get_project = get_project;
exports.EVENTS = EVENTS;
exports.forEach = function(f) {
    PROJECTS.each(f);
};
