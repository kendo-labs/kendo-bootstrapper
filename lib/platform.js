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
    (function search(x){
	dispatch(
	    function linux(){ throw "Implement locate_application on Linux" },
	    function win() {
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
		    search(x.slice(1));
		});
	    }
	);
    })(names);
}

exports.find_browser = function() {
    return dispatch(
        function linux(){ return "google-chrome" },
        // XXX: any *good* way to do this?
        function win(){ return "c:/Program Files/Google/Chrome/Application/chrome.exe" }
    );
}

exports.edit_file = function(root, filename, line, col) {
    var cmd, args = [ filename ];
    dispatch(
        function linux() {
            cmd = "gedit";
            if (line !== undefined) {
                args.push("+" + line + ":" + (parseFloat(col) + 1));
            }
        },
        function win() {
            //cmd = "notepad.exe";
            cmd = "C:/Program Files/Windows NT/Accessories/wordpad.exe";
        }
    );
    CP.spawn(cmd, args, { cwd: root });
    return cmd;
}

exports.locate_application = locate_application;
