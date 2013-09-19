var CP = require("child_process");
var PATH = require("path");
var FS = require("fs");

var UTILS = require("./utils.js");
var PROJECT = require("./project.js");
var CONFIG = require("./config.js");
var PLIST = require("./plist.js");

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
		    data = data.replace(/^\s+|\s+$/g, "").split(/\r?\n/);
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

function darwin_edit_file_unknown_editor(root, filename, line, col, callback) {
    PROJECT.client_log({
	cprefix: "Info",
	message: "No editor defined, trying `open -t`"
    });
    run_program("open", [ "-t", filename ], { cwd: root });
    callback(null, "open");
};

function darwin_run_applescript(script) {
    if (script instanceof Array)
        script = script.join("\n");
    var p = CP.spawn("osascript");
    p.stdin.write(script, "utf8");
    p.stdin.end();
};

function darwin_edit_file_with_application(editor, filename) {
    darwin_run_applescript([
        'tell application ' + JSON.stringify(editor),
        '  activate',
        '  open POSIX file ' + JSON.stringify(filename),
        'end tell',
    ]);
};

function darwin_get_editor_apps() {
    var appdir = "/Applications";
    var applications = FS.readdirSync(appdir);
    var editors = [];
    applications.forEach(function(app){
        if (!(/\.app$/).test(app)) return;
        try {
            var stat = FS.statSync(PATH.join(appdir, app));
            if (!stat.isDirectory()) return;
        } catch(ex) {}
        var contents = PATH.join(appdir, app, "Contents");
        var info = FS.readFileSync(PATH.join(contents, "Info.plist"), "utf8");
        try {
            info = PLIST.parse_xml(info);
            if (!info) return;
            if (!info.CFBundleDocumentTypes) return;
            info.CFBundleDocumentTypes.forEach(function(dt){
                if (!(/^editor$/i.test(dt.CFBundleTypeRole))) return;
                if (!dt.CFBundleTypeExtensions) return;
                if (dt.CFBundleTypeExtensions.contains(null, function(el){
                    return (/^(js|css|coffee|html?|php|asp)$/i.test(el));
                })) {
                    throw info;
                }
            });
        } catch(ex) {
            if (ex === info) editors.push({
                name       : info.CFBundleName,
                executable : info.CFBundleExecutable,
                info       : info.CFBundleGetInfoString,
                icon       : PATH.join(contents, "Resources", info.CFBundleIconFile),
            });
            else {
                console.log(ex.stack);
                throw ex;
            }
        }
    });
    return editors;
};

exports.darwin_get_editor_apps = darwin_get_editor_apps;

function edit_file(root, filename, line, col, callback) {
    var editor = CONFIG.get("editor");

    if (process.platform == "darwin") {
        if (!editor) {
            darwin_edit_file_unknown_editor(root, filename, line, col, callback);
        } else {
            darwin_edit_file_with_application(editor.name, PATH.join(root, filename));
        }
        return;
    }

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
	    var script = PATH.join(TOPLEVEL_DIR, "tools", "win", "run-in-foreground.js");
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
            locate_application([ "sublime_text", "subl", "gvim", "mvim" ], callback);
        }
    );
};

exports.locate_application = locate_application;

function get_tool(name) {
    return dispatch(
        function linux() {
            return name;
        },
        function win() {
            return PATH.join(TOPLEVEL_DIR, "tools", "win", name + ".exe");
        },
        function mac() {
            return PATH.join(TOPLEVEL_DIR, "tools", "osx", name);
        }
    );
};

exports.get_tool = get_tool;

function optimize_image(filename, callback) {
    if (/\.jpe?g$/i.test(filename)) return optimize_image_jpeg(filename, callback);
    if (/\.png$/i.test(filename)) return optimize_image_png(filename, callback);
    return callback(new Error("Can't optimize " + filename));
};

function write_a_pile_of_chunks_into_a_file(filename, chunks, callback) {
    FS.open(filename, "w", parseInt(644, 8), function(err, fd){
        // wow, file descriptors!  I'm so back to '89.
        (function next(err) {
            if (err) return callback(err);
            if (chunks.length == 0) {
                FS.close(fd, callback);
            } else {
                var buf = chunks.shift();
                FS.write(fd, buf, 0, buf.length, null, next);
            }
        })(err);
    });
};

function optimize_image_jpeg(filename, callback) {
    var jpegtran = get_tool("jpegtran");
    var chunks = [];
    var p = CP.spawn(jpegtran, [ filename ]);
    p.stderr.on("data", function(data){ console.log(data) });
    p.stdout.on("data", function(buffer){ chunks.push(buffer) });
    p.stdout.on("end", function(){
        write_a_pile_of_chunks_into_a_file(filename, chunks, callback);
    });
};

function optimize_image_png(filename, callback) {
    var optipng = get_tool("optipng");
    var p = CP.spawn(optipng, [ filename ]);
    p.stdout.on("end", function(){
        callback();
    });
};

exports.optimize_image = optimize_image;

exports.HOME = function() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

exports.tray_notification = function(msg) {
    return dispatch(
        function linux() {
            CP.spawn("notify-send", [ "-a", "Kendo Bootstrapper", msg.title, msg.body ]);
        },
        function win() {
            CP.spawn(get_tool("notifu"),
                     [ "/p", msg.title,
                       "/m", msg.body,
                       "/d", 10, // disappear after 10 seconds
                       "/i", PATH.join(TOPLEVEL_DIR, "docroot", "favicon.ico")
                     ]);
        },
        function mac() {
            CP.spawn(get_tool("usernotification"), [
                "-title", "Kendo Bootstrapper",
                "-subtitle", msg.title,
                "-informativeText", msg.body
            ]);
        }
    );
};

function win32_get_drives(callback) {
    run_program("cscript", [ PATH.join(TOPLEVEL_DIR, "tools", "win", "list-drives.js") ],
		{},
		function(err, output){
		    if (err) return callback(err);
		    output = output.replace(/^[^]*---CUT-HERE---\s*/, "");
		    var lines = output.replace(/^\s+|\s+$/g, "").split(/\r?\n/);
		    callback(null, lines.map(function(line){
			var a = line.split(/\s*\|\s*/);
			return {
			    disk: a[0],
			    type: a[1],
			    name: a[2],
			};
		    }));
		});
};

exports.win32_get_drives = win32_get_drives;

exports.windows = /^win(32|64)$/i.test(process.platform);
