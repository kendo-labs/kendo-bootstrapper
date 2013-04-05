#! /usr/bin/env node

var pattern = require("../lib/pattern");
var sys = require("util");
var fs = require("fs");

var kendo_apidoc = (function(P){

    var MD = require("markdown").markdown;

    function Component(name) {
        this.name = name;
        this.config = [];
        this.methods = [];
        this.events = [];
    };

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
                var a = /\(default:?\s+(.*?)\)/i.exec(text);
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
            comp.events.push(get_method(name, m.body.content(), pat_event_data));
        });
    };

    var components = {};

    function read_file(file) {
        var text = fs.readFileSync(file, "utf8");
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
                }
            });
        });
    };

    return {
        parse      : read_file,
        components : components
    };

})(pattern);




kendo_apidoc.parse("../kendosrc/docs/api/web/menu.md");

console.log(sys.inspect(kendo_apidoc.components, null, null));
