var FS = require("fs");
var PATH = require("path");

var UTILS = require("./utils.js");
var CONFIG = require("./config.js");
var RPC = require("./rpc.js");

var TEMPLATES = {};
var TMPLDIR = PATH.join(TOPLEVEL_DIR, "templates");

function init_project_templates() {
    FS.readdirSync(TMPLDIR).forEach(function(dir){
        dir = PATH.join(TMPLDIR, dir);
        var stat = FS.statSync(dir);
        if (stat.isDirectory()) {
            var config = FS.readFileSync(PATH.join(dir, "bootstrapper.json"));
            config = JSON.parse(config);
            TEMPLATES[config.template_id] = config;
        }
    });
}

function get_template(tmpl) {
    if (typeof tmpl == "string") tmpl = TEMPLATES[tmpl];
    return tmpl;
}

function get_template_dir(tmpl) {
    tmpl = get_template(tmpl);
    return PATH.join(TMPLDIR, tmpl.template_id);
}

function get_template_filename(tmpl, filename) {
    return PATH.join(get_template_dir(tmpl), filename);
}

init_project_templates();

function list_templates() {
    return Object.keys(TEMPLATES).map(function(key){
        return TEMPLATES[key];
    });
}

exports.list_templates = list_templates;
exports.get_template_dir = get_template_dir;
exports.get_template_filename = get_template_filename;
exports.get_template = get_template;

RPC.defhandler("project-templates/get-list", function(request){
    RPC.send_result(request, list_templates().filter(function(tmpl){
        if (tmpl.use_kendo == "web" && !CONFIG.get("kendo_web")) return false;
        if (tmpl.use_kendo == "mobile" && !CONFIG.get("kendo_mobile")) return false;
        if (tmpl.use_kendo == "dataviz" && !CONFIG.get("kendo_dataviz")) return false;
        if (tmpl.use_kendo == "all" && !CONFIG.get("kendo_all")) return false;
        return true;
    }));
});
