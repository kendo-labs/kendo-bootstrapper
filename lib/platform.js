var CP = require("child_process");
var PATH = require("path");
var FS = require("fs");

var UTILS = require("./utils.js");
var PROJECT = require("./project.js");
var CONFIG = require("./config.js");

function run_program(cmd, args, opts, callback) {
    var p = CP.spawn(cmd, args, opts);
    if (callback) {
        var out = "", err = "";
        p.stdout.on("data", function(data){ out += data });
        p.stderr.on("data", function(data){ err += data });
        p.stdout.on("end", function(){
            if (!/\S/.test(err)) err = null;
            callback(err, out);
        });
    }
    return p;
}

function dispatch(unix, win, mac) {
    switch (process.platform) {
      case "linux":
      case "freebsd":
        return unix();
        break;

      case "win32":
      case "win64":
        return win();
        break;

      case "sunos":
        throw new Error("What? SunOS??");

      case "darwin":
        if (mac) return mac();
        break;

      default:
        throw new Error("To be implemented");
    }
}

function locate_application(names, callback) {
    if (!(names instanceof Array)) names = [ names ];
    function log_search(name) {
        PROJECT.client_log({
            message: "Searching application: " + name
        });
    }
    function linux(){
        var paths = process.env.PATH.split(/:+/);
        do_search(paths);
        function do_search(p) {
            if (p.length == 0) {
                callback(new Error("Cannot find executable: " + names));
                return;
            }
            var found = {};
            FS.stat(p[0], function(err, stat){
                if (err || !stat.isDirectory()) {
                    return do_search(p.slice(1));
                }
                UTILS.fs_find(p[0], {
                    filter: function(f) {
                        return !f.stat.isDirectory() && names.indexOf(f.name) >= 0;
                    },
                    callback: function(err, f) {
                        if (!err)
                            found[f.full] = f;
                    },
                    recurse: function(){ return false },
                    finish: function() {
                        var files = Object.keys(found);
                        if (files.length > 0) {
                            files.sort(function(a, b){
                                a = found[a];
                                b = found[b];
                                return names.indexOf(a.name) - names.indexOf(b.name);
                            });
                            callback(null, files[0]);
                        } else {
                            do_search(p.slice(1));
                        }
                    }
                });
            });
        }
    };
    dispatch(
        linux,
	function win() {
	    var paths = [
		process.env.LOCALAPPDATA,
                process.env['PROGRAMFILES(X86)'],
		process.env.PROGRAMFILES,
		process.env.COMMONPROGRAMFILES,
		process.env.APPDATA,
		process.env.HOME,
		process.env.WINDIR,
	    ].filter(function(x){ return x != null });
            log_search(names[0]);
            do_search(names, paths);
            function do_search(x, p) {
                if (p.length == 0) {
                    if (x.length == 0) {
                        callback(new Error("Cannot find executable: " + names));
                    } else {
                        log_search(x[1]);
			do_search(x.slice(1), paths);
		    }
		    return;
		}
		var cp = CP.spawn(process.env.ComSpec, [
		    "/c",
		    "DIR /b /s " + x[0]
		], {
		    cwd: p[0]
		});
		var data = "";
		cp.stdout.setEncoding("utf8");
		cp.stdout.on("data", function(str){ data += str });
		cp.stdout.on("end", function(){
		    data = data.replace(/^\s+|\s+$/g, "").split(/(\r?\n)+/);
		    if (/\S/.test(data[0])) {
			return callback(null, data[0]);
		    }
		    do_search(x, p.slice(1));
		});
	    }
	},
        linux                   // we can use the same semantics on OSX
    );
};

function edit_file(root, filename, line, col, callback) {
    var editor = CONFIG.get("editor");
    if (!editor) {
        PROJECT.client_log({
            cprefix: "Error",
            message: "No editor configured"
        });
        callback(new Error("No editor configured"));
        return;
    }

    var args =
        col != null ? (editor.args.cmd3 || editor.args.cmd2 || editor.args.cmd1)
        : line != null ? (editor.args.cmd2 || editor.args.cmd1)
        : (editor.args.cmd1 || [ "{file}" ]);
    args = args.map(function(tmpl){
        return UTILS.template(tmpl, {
            file : filename,
            line : line,
            col  : col
        });
    });
    var cmd = editor.path;
    function linux() {
	run_program(cmd, args, { cwd: root });
	callback(null, cmd);
    };
    dispatch(
        linux,
        function win() {
	    var script = PATH.join(TOPLEVEL_DIR, "os", "win", "run-in-foreground.js");
	    var p = run_program("cscript", [
		script,
		cmd,
	    ].concat(args), { cwd: root });
	    callback(null, cmd);
        },
        linux
    );
};

exports.edit_file = edit_file;

exports.locate_code_editor = function(callback) {
    dispatch(
        function linux() {
            locate_application([ "sublime_text", "gedit", "gvim", "emacs" ], callback);
        },
        function win() {
            locate_application([ "sublime_text.exe", "notepad++.exe", "gvim.exe", "notepad.exe" ], callback);
        },
        function mac() {
            locate_application([ "sublime_text", "gvim" ], callback);
        }
    );
};

exports.locate_application = locate_application;

exports.select_directory = function(dir, callback) {
    var root = PATH.join(TOPLEVEL_DIR, "PROJECTS");
    dispatch(
        function linux(){
            var script = PATH.join(TOPLEVEL_DIR, "os", "linux", "select-folder.sh");
            run_program(script, [], { cwd: root }, function(err, out){
                // deliberately ignoring stderr, GTK apps have the
                // nasty habit of reporting various unimportant
                // stories.
                var dir = out && out.trim();
                callback(null, {
		    selected: !!dir,
		    directory: dir || null
		});
            });
        },
        function win(){
            var script = PATH.join(TOPLEVEL_DIR, "os", "win", "select-folder.vbs");
            run_program("cscript", [ script ], { cwd: root }, function(err, out){
                // the first few lines are M$ copyright stuff
                var lines = out.trim().split(/[\r\n]+/);
		var pos = lines.indexOf("** The end of copyright notices **");
		lines = lines.slice(pos + 1);
		var selected = lines[0] == "yes";
                var dir = lines[1];
                callback(null, {
		    selected: selected,
		    directory: selected ? dir : null
		});
            });
        }
    )
};
