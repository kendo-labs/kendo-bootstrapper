#! /usr/local/bin/node --stack_size=100000

var PATH = require("path");
var STEP = require("step");
var FS = require("fs");

var UTILS = require("../lib/utils.js");

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
            var themebuilder_dest = PATH.join(dest, "themebuilder");
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

    function kendo_config() {
        var next = this;
        var kendo_config = PATH.join(KENDO_DIR, "download-builder", "config", "kendo-config.json");
        FS.readFile(kendo_config, "utf8", function(err, data){
            FS.writeFile(PATH.join(TOPLEVEL_DIR, "kendo-config.json"), data, "utf8", next);
        });
    },

    function themebuilder() {
        UTILS.fs_copytree(
            PATH.join(KENDO_DIR, "dist", "themebuilder", "production"),
            PATH.join(TOPLEVEL_DIR, "docroot", "kendo", "themebuilder"), {
                callback : this,
                filter   : function(f) {
                    if (f.name == "web.config")
                        return false;
                    return true;
                },
            }
        );
    }

);
