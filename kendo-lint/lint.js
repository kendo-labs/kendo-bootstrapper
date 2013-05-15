var FS = require("fs");
var PATH = require("path");
var U2 = require("uglify-js");
var CHEERIO = require("cheerio");

var KAPI = require("./parsedocs.js").kendo_apidoc;

function check_widget_options(w, config, results) {
    var comp = typeof w == "string" ? KAPI.get_ui_comp(w) : w;
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

function lint_html_file(code, filename, results) {
    var $ = CHEERIO.load(code);
    var warnings = [];
    $("[data-role]").each(function(){
        //console.log(this[0]);
        var role = this.attr("data-role");
        var comp = KAPI.get_ui_comp_ci(role);
        if (!comp) {
            warnings.push({
                message: "Could not find component specified in data-role: " + role
            });
        } else {
            var attrs = this[0].attribs;
            var options = [];
            for (var i in attrs) {
                var m = /^data-(.*)$/.exec(i);
                if (m) {
                    var opt = m[1];
                    if (opt == "role" || opt == "bind") continue;
                    opt = opt.replace(/-[a-z]/g, function(str){
                        return str[1].toUpperCase();
                    });
                    var val = attrs[i];
                    try {
                        var expr = U2.parse(val, { expression: true });
                        options.push(new U2.AST_ObjectKeyVal({
                            key   : opt,
                            value : expr
                        }));
                    } catch(ex) {
                        if (ex instanceof U2.JS_Parse_Error) {
                            warnings.push({
                                message: "Cannot parse expression " + val + " (in attribute " + i + ")"
                            });
                        } else {
                            console.log(ex);
                            console.log(ex.stack);
                        }
                    }
                }
            }
            var obj = new U2.AST_Object({ properties: options });
            check_widget_options(comp, obj, warnings);
        }
    });
    warnings.forEach(function(w){ w.filename = filename });
    if (results) {
        results.push.apply(results, warnings);
    }
    return warnings;
}

exports.lint_javascript_file = lint_javascript_file;
exports.lint_html_file = lint_html_file;
