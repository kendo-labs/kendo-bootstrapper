var FS = require("fs");
var PATH = require("path");
var U2 = require("uglify-js");

var KENDO_CONFIG = JSON.parse(
    FS.readFileSync(PATH.join(PATH.dirname(__filename), "..", "kendosrc", "js", "kendo-config.json"), "utf8")
);

var WIDGETS = read_kendo_config();

function read_kendo_config() {
    var widgets = {};
    KENDO_CONFIG.components.forEach(function(comp){
        if (comp.category == "web") {
            if (comp.widgets) {
                comp.widgets.forEach(function(w){
                    widgets[w.name] = w;
                });
            }
        }
    });
    if (!widgets.Widget) {
        // hack to add the base class options
        widgets.Widget = {
            name    : "Widget",
            options : [ "prefix" ]
        };
    }
    return widgets;
}

function get_widget_options(w) {
    var options = [];
    while ((w = WIDGETS[w])) {
        options = options.concat(w.options, w.events);
        w = w.inherits;
    }
    return options;
}

function check_widget_options(w, args, results) {
    var options = get_widget_options(w);
    args.forEach(function(arg){
        if (arg instanceof U2.AST_ObjectKeyVal) {
            var name = arg.key;
            if (options.indexOf(name) < 0) {
                results.push({
                    message : "No property \"" + name + "\" in widget " + w,
                    line    : arg.start.line,
                    col     : arg.start.col
                });
            }
        } else {
            if (options.indexOf(arg) < 0) {
                results.push({
                    message : "No property \"" + name + "\" in widget " + w
                });
            }
        }
    });
}

function kendo_lint_javascript(code, filename) {
    var ast = U2.parse(code, {
        filename: filename
    });
    var results = [];
    ast.walk(new U2.TreeWalker(function(node, descend){
        var m;
        if (node instanceof U2.AST_Call
            && node.expression instanceof U2.AST_Dot
            && node.args[0] instanceof U2.AST_Object) {

            // (...).kendoSomething()
            if ((m = /^kendo(.*)$/.exec(node.expression.property))) {
                var widget = m[1];
                check_widget_options(widget, node.args[0].properties, results);
            }
        }
    }));
    return results;
}

function kendo_lint_html(code) {

}
