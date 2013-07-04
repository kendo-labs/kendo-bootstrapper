WScript.Echo("** The end of copyright notices **");

function quote(arg) {
    arg = arg.replace(/"/g, '""');
    return '"' + arg + '"';
}

var app = WScript.Arguments(0);
var args = [];
for (var i = 1; i < WScript.Arguments.Count(); ++i) {
    args.push(quote(WScript.Arguments(i)));
}
var shell = new ActiveXObject("WScript.Shell");
var cmd = quote(app) + " " + args.join(" ");

shell.run(cmd);
WScript.Sleep(200);

// attempt to activate the app.

// MSDN about Shell.AppActivate:
//
//     "In determining which application to activate, the specified
//     title is compared to the title string of each running
//     application. If no exact match exists, any application whose
//     title string begins with title is activated. If an application
//     still cannot be found, any application whose title string ends
//     with title is activated. If more than one instance of the
//     application named by title exists, one instance is arbitrarily
//     activated."

// taking a wild guess about the *title* of the window here:
var exename = app.replace(/^.*[\\\/]([^\\\/]+)$/, "$1").replace(/\.[^.]*$/, "");
shell.AppActivate(exename);
