#!/usr/bin/env node

var FS = require("graceful-fs");
var PATH = require("path");
var TMP = require("tmp");
var UTILS = require("../lib/utils.js");
var SYS = require("util");
var CP = require("child_process");

var SRCDIR = PATH.join(__dirname, "..");
var DEST = "/tmp/kendo-bootstrapper.zip";

TMP.dir({ unsafeCleanup: true }, function(err, TMPDIR){
    var FILES = [
        "bin",
        "docroot",
        "lib",
        "node_modules",
        "os",
        "project_template",
        "tools",

        "README.md",
        "kendo-config.json",
    ];

    UTILS.fs_copy(
        FILES.map(function(f){
            return PATH.join(SRCDIR, f);
        }),
        PATH.join(TMPDIR, "kendo-bootstrapper"),
        function(err, ret){
            if (err) {
                console.log(err);
            }
            var zip = CP.spawn("zip", [
                "-r",
                "/tmp/kendo-bootstrapper.zip",
                "kendo-bootstrapper"
            ], {
                cwd: TMPDIR
            });
            zip.stdout.on("data", function(data){
                SYS.print(data);
            });
            zip.stderr.on("data", function(data){
                SYS.error(data);
            });
            zip.stdout.on("end", function(){
                // done.
            });
        }
    );
});
