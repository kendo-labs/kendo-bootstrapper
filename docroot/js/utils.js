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

Function.prototype.delayed = function(delay) {
    if (delay == null) delay = 0;
    var f = this, timer;
    function g() {
        var self = this, args = arguments;
        return timer = setTimeout(function(){
            return f.apply(self, args);
        }, delay);
    };
    g.cancel = function(){ clearTimeout(timer) };
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

function jsonml_to_html(tree, refs) {
    if (!refs) refs = {};
    if (typeof tree == "string") return htmlescape(tree);
    if (tree instanceof Array) {
        var tag = tree[0];
        if (tag instanceof Array) {
            // rootless tree
            return tree.map(function(tree){
                return jsonml_to_html(tree, refs)
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
            return jsonml_to_html(el, refs);
        }).join("");
        output += "</" + tag + ">";
        return output;
    }
};
