var FS = require("fs");
var PATH = require("path");
var U2 = require("uglify-js");

var KAPI = require("./parsedocs.js").kendo_apidoc;

function check_widget_options(w, config, results) {
    var comp = KAPI.get_ui_comp(w);
    config.properties.forEach(function(prop){
        comp.check_option(null, prop, results);
    });
}

function lint_javascript_file(code, filename, results) {
    try {
        var ast = U2.parse(code, {
            filename: filename
        });
    } catch(ex) {
        if (ex instanceof U2.JS_Parse_Error) {
            results.push({
                filename : filename,
                message  : ex.message,
                line     : ex.line,
                col      : ex.col
            });
            return;
        }
        throw ex;
    }
    var m;
    var warnings = [];
    ast.walk(new U2.TreeWalker(function(node){
        if (node instanceof U2.AST_Call
            && node.expression instanceof U2.AST_Dot
            && node.args[0] instanceof U2.AST_Object) {

            // (...).kendoSomething()
            if ((m = /^kendo(.*)$/.exec(node.expression.property))) {
                var widget = m[1];
                check_widget_options(widget, node.args[0], warnings);
            }
        }
    }));
    warnings.forEach(function(w){ w.filename = filename });
    if (results) {
        results.push.apply(results, warnings);
    }
    return warnings;
}

exports.lint_javascript_file = lint_javascript_file;
