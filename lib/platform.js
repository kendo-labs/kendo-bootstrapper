var CP = require("child_process");

function dispatch(unix, win, mac) {
    switch (process.platform) {
      case "linux":
      case "freebsd":
        return unix();

      case "win32":
      case "win64":
        return win();

      case "sunos":
        throw new Error("What? SunOS??");

      case "darwin":
        if (mac) return mac();
        throw new Error("To be implemented");
    }
}

function locate_application(names, callback) {
    if (!(names instanceof Array)) names = [ names ];
    dispatch(
	function linux(){ throw "Implement locate_application on Linux" },
	function win_search(x) {
            if (!x) x = names;
	    if (x.length == 0)
		return callback(new Error("Cannot find executable: " + names));
	    var cp = CP.spawn(process.env.ComSpec, [
		"/c",
		"DIR /b /s " + x[0]
	    ], {
		cwd: process.env.ProgramFiles
	    });
	    var data = "";
	    cp.stdout.setEncoding("utf8");
	    cp.stdout.on("data", function(str){ data += str });
	    cp.stdout.on("end", function(){
		data = data.replace(/^\s+|\s+$/g, "").split(/(\r?\n)+/);
		if (/\S/.test(data[0])) {
		    return callback(null, data[0]);
		}
		win_search(x.slice(1));
	    });
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
	    locate_application([ "gvim.exe", "notepad++.exe", "wordpad.exe" ], function(err, cmd){
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
