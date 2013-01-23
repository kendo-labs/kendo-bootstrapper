var fs = require("fs");
var path = require("path");

Array.prototype.remove = function(el, test) {
    if (test == null) {
        var pos = this.indexOf(el);
        if (pos >= 0) this.splice(pos, 1);
    } else {
        for (var i = this.length; --i >= 0;) {
            if (test(this[i], el)) this.splice(i, 1);
        }
    }
    return this;
};

function defaults(args, defs) {
    var ret = {};
    for (var i in defs)
        ret[i] = args.hasOwnProperty(i) ? args[i] : defs[i];
    return args;
};

function ensure_path(x, callback) {
    x = path.normalize(x);
    fs.stat(x, function(err, s){
        if (err) {
            if (err.code == "ENOENT") {
                ensure_path(path.dirname(x), function(){
                    fs.mkdir(x, 0755, callback);
                });
                return;
            }
            callback(err);
            return;
        }
        if (!s.isDirectory()) {
            callback({
                code: "ENOTDIR",
                errno: 27,
                path: x
            });
            return;
        }
        callback();
    });
};

exports.defaults = defaults;
exports.ensure_path = ensure_path;
