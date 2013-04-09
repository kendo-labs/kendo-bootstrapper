var PATTERN = require("./pattern");
var UTILS = require("../lib/utils");
var PATH = require("path");
var U2 = require("uglify-js");
var SYS = require("util");
var FS = require("fs");

function Component(name) {
    this.name = name;
    this.config = [];
    this.methods = [];
    this.events = [];
    this.fields = [];
};

Component.prototype.get_config_option = function(name) {
    return this.config.filter(function(o){
        return o.name == name;
    })[0] || this.get_event(name);
};

Component.prototype.get_event = function(name) {
    return this.events.filter(function(e){
        return e.name == name;
    })[0];
};

Component.prototype.check_option = function(list, prop, results) {
    var name = prop.key;
    var value = prop.value;
    var self = this;
    var op;
    if (!list) {
        op = self.config.filter(function(o){ return o.name == name })[0];
        if (!op)
            op = self.events.filter(function(o){ return o.name == name })[0];
    } else {
        op = list.filter(function(o){ return o.name == name })[0];
    }
    if (!op) {
        results.push({
            message : "Option " + name + " not found",
            line    : prop.start.line,
            col     : prop.start.col
        });
        return;
    }
    // typecheck
    name = op.orig || op.name;
    badtype: if (op.type &&
                 (value instanceof U2.AST_Constant ||
                  value instanceof U2.AST_Object ||
                  value instanceof U2.AST_Array ||
                  value instanceof U2.AST_Lambda))
    {
        for (var i = op.type.length; --i >= 0;) {
            var type = op.type[i];
            if (type == "Array" && value instanceof U2.AST_Array)
                break badtype;
            if ((type == "String" || type == "Selector") && value instanceof U2.AST_String)
                break badtype;
            if (type == "Number" && value instanceof U2.AST_Number)
                break badtype;
            if (type == "Boolean" && value instanceof U2.AST_Boolean)
                break badtype;
            if (type == "Function" && value instanceof U2.AST_Lambda)
                break badtype;
            if (type == "Object" && value instanceof U2.AST_Object) {
                value.properties.forEach(function(prop){
                    self.check_option(op.sub, prop, results);
                });
                break badtype;
            }
        }
        results.push({
            message: "Bad type for option " + name + ". Accepted: " + op.type.join(", "),
            line: value.start.line,
            col: value.start.col
        });
        return;
    }
    // check for default value
    if (op.default) {
        var v1 = U2.parse("(" + op.default + ")").print_to_string();
        var v2 = U2.parse("(" + value.print_to_string() + ")").print_to_string();
        if (v1 == v2) {
            results.push({
                message: "Passed value for option " + name + " is the same as default value: " + v1,
                line: prop.start.line,
                col: prop.start.col
            });
        }
    }
};

var kendo_apidoc = (function(P){

    var MD = require("markdown").markdown;

    function RX(rx) {
        return P.CHECK(function(node){
            return rx.test(node);
        });
    };

    function section_pattern(level, title) {
        return P.compile(
            [ "header", P.CHECK(function(node){ return node.level == level }),
              P.NAMED("title", title || P.WHATEVER()) ],
            P.NAMED("body", P.MANY(
                P.OR([ "header", P.CHECK(function(node){ return node.level > level }) ],
                     [ P.CHECK(function(node){ return node != "header" }) ])
            ))
        );
    };

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    };

    var pat1 = section_pattern(1);
    var pat2 = section_pattern(2);
    var pat3 = section_pattern(3);
    var pat_parameters = section_pattern(4, RX(/Parameters/i));
    var pat_event_data = section_pattern(4, RX(/Event Data/i));
    var pat5 = section_pattern(5);

    var pat_inline = P.compile([
        P.NAMED("tag", P.OR("inlinecode", "em")),
        P.NAMED("text")
    ]);

    function get_param(tree) {
        var param = {
            name: trim(tree[0]),
            type: []
        }
        P.search(tree, pat_inline, function(m){
            var tag = m.tag.first();
            var text = trim(m.text.first());
            if (tag == "inlinecode") {
                param.type = param.type.concat(text.split(/\s*\|\s*/));
            } else if (tag == "em") {
                var a = /\(default:?\s*(.*?)\s*\)$/i.exec(text);
                if (a) param.default = a[1];
            }
        });
        return param;
    };

    function get_method(name, tree, pat_params) {
        var args = [];
        P.search(tree, pat_params, function(m){
            P.search(m.body.content(), pat5, function(m){
                var param = get_param(m.title.content());
                args.push(param);
            });
        });
        return { name: name, args: args };
    };

    function read_config(comp, tree) {
        P.search(tree, pat3, function(m){
            comp.config.push(get_param(m.title.content()));
        });
        // place sub-options in their parent option too
        for (var i = comp.config.length; --i >= 0;) {
            var op = comp.config[i];
            var m = /^(.+)\.([^.]+)$/.exec(op.name);
            if (m) {
                var parent = comp.get_config_option(m[1]), prop = m[2];
                op.orig = op.name;
                op.name = prop;
                if (!parent.sub) parent.sub = [];
                parent.sub.push(op);
                comp.config.splice(i, 1);
            }
        }
    };

    function read_methods(comp, tree) {
        P.search(tree, pat3, function(m){
            var name = trim(m.title.first());
            comp.methods.push(get_method(name, m.body.content(), pat_parameters));
        });
    };

    function read_events(comp, tree) {
        P.search(tree, pat3, function(m){
            var name = trim(m.title.first());
            var ev = get_method(name, m.body.content(), pat_event_data);
            ev.type = [ "Function" ];
            comp.events.push(ev);
        });
    };

    function read_fields(comp, tree) {
        P.search(tree, pat3, function(m){
            var param = get_param(m.title.content());
            comp.fields.push(param);
        });
    };

    var components = {};

    function read_file(file) {
        var text = FS.readFileSync(file, "utf8");
        var tree = MD.parse(text);
        P.search(tree, pat1, function(m){
            var name = trim(m.title.first());
            var comp = components[name] = new Component(name);
            P.search(m.body.content(), pat2, function(m){
                var name = trim(m.title.first());
                if (name == "Configuration") {
                    read_config(comp, m.body.content());
                } else if (name == "Methods") {
                    read_methods(comp, m.body.content());
                } else if (name == "Events") {
                    read_events(comp, m.body.content());
                } else if (name == "Fields") {
                    read_fields(comp, m.body.content());
                }
            });
        });
    };

    return {
        parse         : read_file,
        components    : components,
        get_ui_comp   : function(name) {
            return components["kendo.ui." + name];
        }
    };

})(PATTERN);

UTILS.fs_find(PATH.join(__dirname, "..", "kendosrc", "docs"), {
    filter: function(f) {
        return f.stat.isFile() && PATH.extname(f.full) == ".md" && /docs\/api\/(web|dataviz|mobile)\//.test(f.full);
    },
    callback: function(err, f) {
        if (!err) {
            kendo_apidoc.parse(f.full);
        }
    },
    finish: function() {
        //console.log(SYS.inspect(kendo_apidoc.components, null, null));
    }
});

exports.kendo_apidoc = kendo_apidoc;
