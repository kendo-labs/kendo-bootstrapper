#! /usr/local/bin/node --stack_size=100000

var PATH = require("path");
var STEP = require("step");
var FS = require("fs");

var UTILS = require("../lib/utils.js");
var KDOCS = require("../kendo-lint/parsedocs.js").kendo_apidoc;

var TOPLEVEL_DIR = PATH.join(PATH.dirname(__filename), "..");
var KENDO_DIR = PATH.join(TOPLEVEL_DIR, "..", "kendo");

STEP(

    // 1. copy kendo to docroot, necessary to run the bootstrapper UI
    function kendo_for_docroot() {
        var next = this;
        var dest = PATH.join(TOPLEVEL_DIR, "docroot", "kendo");
        UTILS.fs_rmpath(dest, function(){
            var js_dest = PATH.join(dest, "js");
            var css_dest = PATH.join(dest, "css");
            var n = 2;
            UTILS.fs_ensure_directory(js_dest, function(){
                UTILS.fs_copy([
                    PATH.join(KENDO_DIR, "src", "jquery.min.js"),
                    PATH.join(KENDO_DIR, "src", "kendo.web.min.js")
                ], js_dest, function(){
                    if (--n == 0) next();
                });
            });
            UTILS.fs_ensure_directory(css_dest, function(){
                UTILS.fs_copy(
                    FS.readdirSync(PATH.join(KENDO_DIR, "styles", "web")).map(function(file){
                        return PATH.join(KENDO_DIR, "styles", "web", file);
                    }),
                    css_dest, function(err){
                        if (--n == 0) next();
                    }
                );
            });
        });
    },

    // 2. update kendo in the project_template too
    function kendo_for_projects() {
        var next = this;
        var dest = PATH.join(TOPLEVEL_DIR, "project_template", "kendo");
        UTILS.fs_rmpath(dest, function(){
            UTILS.fs_copytree(PATH.join(TOPLEVEL_DIR, "docroot", "kendo"), dest, function(){
                next();
            });
        });
    },

    // 3. copy individual files so that we can build custom kendo.min.js based on component usage
    function kendo_full_source() {
        var next = this;
        var dest = PATH.join(TOPLEVEL_DIR, "kendosrc", "js");
        UTILS.fs_rmpath(dest, function(){
            UTILS.fs_ensure_directory(dest, function(){
                var kendo_config = PATH.join(KENDO_DIR, "download-builder", "config", "kendo-config.json");
                FS.readFile(kendo_config, "utf8", function(err, data){
                    data = JSON.parse(data);
                    var files = data.components.map(function(c){
                        return PATH.join(KENDO_DIR, "src", c.source);
                    });
                    files.push(kendo_config);
                    UTILS.fs_copy(files, dest, next);
                });
            });
        });
    },

    function kendo_docs() {
        var group = this.group();
        [ "framework", "mobile", "web", "dataviz" ].forEach(function(dir){
            UTILS.fs_copytree(PATH.join(KENDO_DIR, "..", "kendo-docs", "api", dir),
                              PATH.join(TOPLEVEL_DIR, "kendosrc", "docs", "api", dir),
                              group());
        });
    },

    function parse_kendo_docs() {
        var next = this;
        UTILS.fs_find(PATH.join(__dirname, "..", "kendosrc", "docs"), {
            filter: function(f) {
                return f.stat.isFile() && PATH.extname(f.full) == ".md" && /docs\/api\/(web|dataviz|mobile|framework)\//.test(f.full.sane_path());
            },
            callback: function(err, f) {
                if (!err) {
                    console.log("Parsing API: " + f.rel);
                    KDOCS.parse(f.full);
                }
            },
            finish: function() {
                FS.writeFile(PATH.join(__dirname, "..", "kendosrc", "api.json"),
                             JSON.stringify(KDOCS.components),
                             next);
            }
        });
    }

);
