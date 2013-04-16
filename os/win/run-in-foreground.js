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
shell.AppActivate(app);
