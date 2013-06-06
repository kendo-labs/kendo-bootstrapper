function maphash(obj, f) {
    var j = 0, ret = [];
    for (var i in obj) if (obj.hasOwnProperty(i)) {
        ret.push[ f(obj[i], i, j++) ];
    }
    return ret;
};

Array.prototype.contains = function(el) {
    return this.indexOf(el) >= 0;
};

Array.prototype.pushNew = function(el) {
    if (!this.contains(el)) this.push(el);
};

Array.prototype.find = function(pred) {
    for (var i = 0; i < this.length; ++i)
        if (pred(this[i], i))
            return this[i];
};

String.prototype.globToRegexp = function() {
    var pat = this.replace(/(\*\*|\*|\.|\\|\?)/g, function(s, p){
        return {
            "**" : "[^]*?",
            "*"  : "[^/]*?",
            "."  : "\\.",
            "\\" : "\\\\",
            "?"  : ".",
        }[p];
    });
    return new RegExp(pat, "i");
};

Function.prototype.delayed = function(delay) {
    if (delay == null) delay = 0;
    var f = this, timer;
    function g() {
        var self = this, args = arguments;
        return timer = setTimeout(function(){
            return f.apply(self, args);
        }, delay);
    };
    g.cancel = function(){ return clearTimeout(timer), g };
    return g;
};

function htmlescape(txt) {
    return txt.replace(/&/g, "&amp;")
        .replace(/\x22/g, "&quot;")
        .replace(/\x27/g, "&#x27;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\u00A0/g, "&#xa0;")
};

function deep_clone(obj) {
    if (obj instanceof Array)
        return obj.map(deep_clone);
    if (typeof obj == "object") {
        var ret = {};
        for (var i in obj) ret[i] = deep_clone(obj[i]);
        return ret;
    }
    return obj;
};

function defaults(args, defs) {
    var ret = {};
    for (var i in defs)
        ret[i] = args.hasOwnProperty(i) ? args[i] : defs[i];
    return ret;
};

function jsonml_to_html(tree, refs) {
    if (!refs) refs = {};
    var section = null;
    var param = null;
    return (function donode(tree) {
        if (typeof tree == "string") return htmlescape(tree);
        if (tree instanceof Array) {
            var tag = tree[0];
            if (tag instanceof Array) {
                // rootless tree
                return tree.map(function(tree){
                    return donode(tree)
                }).join("");
            }
            var has_attr = typeof tree[1] == "object" && !(tree[1] instanceof Array);
            var attr = has_attr ? deep_clone(tree[1]) : {};
            switch (tag) {
              case "bulletlist" : tag = "ul"   ; break;
              case "numberlist" : tag = "ol"   ; break;
              case "listitem"   : tag = "li"   ; break;
              case "para"       : tag = "p"    ; break;
              case "code_block" : tag = "pre"  ; break;
              case "inlinecode" : tag = "code" ; break;
              case "linebreak"  : tag = "br"   ; break;
              case "link"       : tag = "a"    ; break;

              case "markdown":
              case "root":
                tag = "div";
                if (!refs && has_attr)
                    refs = attr.references;
                break;

              case "header":
                if (typeof tree[2] == "string") {
                    attr.name = tree[2].trim();
                }
                if (attr.level == 2) {
                    attr.name = attr.name.toLowerCase();
                    section = attr.name;
                } else if (attr.level == 3) {
                    attr.name = section + "-" + attr.name;
                }
                tag = "h" + attr.level;
                delete attr.level;
                break;

              case "img":
                attr.src = attr.href;
                delete attr.href;
                break;

              case "link_ref":
                var ref = refs[attr.ref];
                if (!ref) return attr.original;
                tag = "a";
                attr.href = ref.href;
                if (ref.title) attr.title = ref.title;
                delete attr.original;
                break;

              case "img_ref":
                var ref = refs[attr.ref];
                if (!ref) return attr.original;
                tag = "img";
                attr.src = ref.href;
                if (ref.title) attr.title = ref.title;
                delete attr.original;
                break;
            }
            var output = "<" + tag;
            for (var i in attr)
                output += " " + i + "=\"" + htmlescape(attr[i]) + "\"";
            output += ">";
            output += tree.slice(has_attr ? 2 : 1).map(function(el){
                return donode(el);
            }).join("");
            output += "</" + tag + ">";
            return output;
        }
    })(tree);
};

function path_join(x) {
    if (!(x instanceof Array)) x = [].slice.call(arguments);
    return x.map(function(x, i){
        x = x.replace(/[\\\/]+$/, "");
        if (i > 0) x = x.replace(/^[\\\/]+/, "");
        return x;
    }).join(SERVER_CONFIG.pathsep);
};

function path_normalize(path) {
    path = path.replace(/[\\\/]+/, SERVER_CONFIG.pathsep).replace(/[\\\/]+$/, "");
    if (SERVER_CONFIG.windows) {
        path = path.replace(/^[\\\/]+/, "");
    }
    return path;
};

function path_split(path) {
    path = path_normalize(path);
    return path.split(/[\\\/]+/);
};

function path_relative(full, dir) {
    full = path_normalize(full);
    dir = path_normalize(dir);
    if (SERVER_CONFIG.windows) {
        full = full.toLowerCase();
        dir = dir.toLowerCase();
    }
    full = path_split(full);
    dir = path_split(dir);
    var i = 0;
    while (true) {
        if (dir.length == 0) return path_join(full);
        if (full.length == 0) return null; // WAT.
        if (full[0] == dir[0]) {
            full.shift();
            dir.shift();
        } else {
            for (var i = dir.length, ret = full; i-- > 0;) ret.unshift("..");
            return path_join(ret);
        }
    }
};

function path_dirname(path) {
    var x = path_split(path);
    x.pop()
    return path_join(x);
};
