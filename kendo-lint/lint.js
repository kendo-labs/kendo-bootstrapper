var FS = require("fs");
var PATH = require("path");
var U2 = require("uglify-js");

var KAPI = require("./parsedocs.js").kendo_apidoc;

function check_widget_options(w, args, results) {
    var comp = KAPI.get_ui_comp(w);
}

function lint_javascript_file(code, filename) {
    var ast = U2.parse(code, {
        filename: filename
    });
    var results = [];
    ast.walk(new U2.TreeWalker(function(node){
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
