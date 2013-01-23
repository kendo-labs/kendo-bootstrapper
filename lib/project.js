var handlebars  = require("handlebars");
var path        = require("path");
var fs          = require("fs");
var Step        = require("step");

var utils = require("./utils");
var config = require("./config");

var METADATA_FILE = "bootstrapper.json";

var PROJECTS = new utils.Dictionary();
var EVENTS = require("./events")();

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

function bootstrap(args, callback) {
    args = utils.defaults(args, {
        id    : null,
        name  : null,
        path  : null,
        force : false
    });

    var project_template_dir = path.join(TOPLEVEL_DIR, "project_template");
    var dest_dir = args.path;

    function cont() {
        utils.fs_ensure_directory(path.dirname(dest_dir), function(err){
            if (err) return callback(err);
            utils.fs_copytree(project_template_dir, dest_dir, function(err){
                if (err) return callback(err);
                init_project_template(args, function(err, project_meta){
                    if (err) return callback(err);
                    register_project(project_meta, path);
                });
            });
        });
    };

    fs.stat(dest_dir, function(err, dest_dir_stat){
        if (dest_dir_stat) {
            if (!args.force)
                return callback(new Error("Directory exists"));
            utils.fs_rmpath(dest_dir, cont);
        }
        else cont();
    });
};

function init_project_template(args, callback) {
    var metafile = path.join(args.path, METADATA_FILE);
    var meta;
    var project_files = [];
    var template_args = {
        PROJECT_ID   : args.id,
        PROJECT_NAME : args.name
    };
    Step(
        function read_metadata() {
            fs.readFile(metafile, "utf8", this);
        },
        function process_metadata(err, content) {
            if (err) return callback(err);
            var tmpl = handlebars.compile(content);
            content = tmpl(template_args);
            meta = JSON.parse(content);
            fs.writeFile(metafile, content, "utf8", this);
        },
        function read_other_files(err) {
            if (err) return callback(err);
            var group = this.group();
            function dofiles(files, type) {
                files.forEach(function(file){
                    file = path.join(args.path, file);
                    project_files.push({ name: file, type: type });
                    fs.readFile(file, "utf8", group());
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
                var tmpl = handlebars.compile(content);
                content = tmpl(template_args);
                fs.writeFile(file, content, "utf8", group());
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
