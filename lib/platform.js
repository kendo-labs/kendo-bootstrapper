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
