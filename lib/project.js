var handlebars = require("handlebars");
var ncp = require("ncp");
var path = require("path");
var utils = require("utils");

var utils = require("./utils");
var config = require("./config");

var METADATA_FILE = "bootstrapper.json";

function bootstrap(args, callback) {
    args = utils.defaults(args, {
        id   : null,
        name : null,
        path : null,
    });

    var project_template_dir = path.join(TOPLEVEL_DIR, "project_template");
    var dest_dir = args.path;

    fs.stat(dest_dir, function(err, dest_dir_stat){
        if (dest_dir_stat) return callback("Directory exists");
        utils.ensure_path(path.dirname(dest_dir), function(err){
            if (err) return callback(err);
            ncp(project_template_dir, dest_dir, function(err){
                if (err) return callback(err);
                init_project_template(args, callback);
            });
        });
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
                var file = f.file, type = f.type;
                var content = contents[i];
                var tmpl = handlebars.compile(content);
                content = tmpl(template_args);
                fs.writeFile(file, content, "utf8", group());
            });
        },
        function are_we_there_yet(err) {
            if (err) return callback(err);
            callback(null);     // DONE.
        }
    );
};
