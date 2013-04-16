var CP = require("child_process");
var PATH = require("path");

function run_program(cmd, args, opts, callback) {
    var out = "", err = "";
    var p = CP.spawn(cmd, args, opts);
    p.stdout.on("data", function(data){ out += data });
    p.stderr.on("data", function(data){ err += data });
    p.stdout.on("end", function(){
        if (!/\S/.test(err)) err = null;
        callback(err, out);
    });
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
    dispatch(
	function linux(){ throw "Implement locate_application on Linux" },
	function win_search() {
	    do_search(names, [
		process.env.LOCALAPPDATA,
		process.env.PROGRAMFILES,
		process.env.COMMONPROGRAMFILES,
		process.env.APPDATA,
		process.env.HOME,
		process.env.WINDIR,
	    ].filter(function(x){ return x != null }));
	    function do_search(x, paths) {
		if (x.length == 0) {
		    if (paths.length == 0) {
			callback(new Error("Cannot find executable: " + names));
		    } else {
			do_search(names, paths.slice(1));
		    }
		    return;
		}
		var cp = CP.spawn(process.env.ComSpec, [
		    "/c",
		    "DIR /b /s " + x[0]
		], {
		    cwd: paths[0]
		});
		var data = "";
		cp.stdout.setEncoding("utf8");
		cp.stdout.on("data", function(str){ data += str });
		cp.stdout.on("end", function(){
		    data = data.replace(/^\s+|\s+$/g, "").split(/(\r?\n)+/);
		    if (/\S/.test(data[0])) {
			return callback(null, data[0]);
		    }
		    do_search(x.slice(1), paths);
		});
	    }
	}
    );
}

exports.edit_file = function(root, filename, line, col, callback) {
    dispatch(
        function linux() {
	    // XXX: error handling
            var cmd = "gedit", args = [ filename ];
            if (line !== undefined) {
                args.push("+" + line + ":" + (parseFloat(col) + 1));
            }
	    CP.spawn(cmd, args, { cwd: root });
	    callback(null, cmd);
        },
        function win() {
	    locate_application([ "notepad++.exe", "gvim.exe", "wordpad.exe" ], function(err, cmd){
		if (err) cmd = "notepad.exe";
		var args = [ filename ];
		if (/gvim\.exe/.test(cmd)) {
		    if (line !== undefined) {
			args.unshift("+" + line);
		    }
		}
		else if (/notepad\+\+\.exe/.test(cmd)) {
		    if (line !== undefined) {
			args.unshift("-n" + line);
		    }
		}
		else if (/wordpad\.exe/.test(cmd)) {
		    if (line !== undefined) {
			// XXX: no idea how to tell WordPad to open at a certain line.
		    }
		}
		CP.spawn(cmd, args, { cwd: root });
		callback(null, cmd);
	    });
        }
    );
}

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
