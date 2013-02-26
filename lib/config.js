var PATH = require("path");
var FS = require("fs");

var PROJECT = require("./project");
var UTILS = require("./utils");
var PLATFORM = require("./platform");

var CONFIG;
init_config();

function init_config() {
    CONFIG = {
        projects: new UTILS.Dictionary()
    };
}

function get_projects_directory() {
    return PATH.join(TOPLEVEL_DIR, "PROJECTS");
};

function get_config_file() {
    return PATH.join(TOPLEVEL_DIR, "bootstrapper.json");
};

function read_config() {
    try {
        var data = FS.readFileSync(get_config_file(), "utf8");
        CONFIG = JSON.parse(data);
        var paths = CONFIG.projects;
        CONFIG.projects = new UTILS.Dictionary();
        paths.forEach(PROJECT.load);
    } catch(ex) {
        if (ex.code == "ENOENT") {
            save_config();
        }
    }
};

function save_config() {
    var tmp = UTILS.defaults({}, CONFIG);
    tmp.projects = CONFIG.projects.map(function(proj){
        return proj.path;
    });
    FS.writeFileSync(get_config_file(), JSON.stringify(tmp, null, 4), "utf8");
};

function get(key) {
    var path = key.split(".");
    var x = CONFIG;
    for (var i = 0; i < path.length; ++i) {
        x = x[path[i]];
        if (x === undefined) return x;
    }
    return x;
};

function set(key, value) {
    var path = key.split(".");
    var x = CONFIG;
    for (var i = 0; i < path.length; ++i) {
        if (i == path.length - 1) {
            x[path[i]] = value;
            return;
        }
        var y = x[path[i]];
        if (y === undefined) y = x[path[i]] = {};
        x = y;
    }
};

function get_chrome_exe(callback) {
    if (CONFIG.chrome_exe)
	return callback(null, CONFIG.chrome_exe);

    // XXX: we could be smarter than this for linux
    if (/linux|freebsd/i.test(process.platform))
	return callback(null, "google-chrome");

    if (/win/.test(process.platform)) {
	return PLATFORM.locate_application("chrome.exe", function(err, path){
	    if (err) return callback(err);
	    CONFIG.chrome_exe = path;
	    save_config();
	    callback(null, path);
	});
    }

    throw new Error("Implement CONFIG.get_chrome_exe on " + process.platform);
};

var KENDO_CONFIG;
function get_kendo_config() {
    if (!KENDO_CONFIG) {
        KENDO_CONFIG = JSON.parse(FS.readFileSync(PATH.join(
            TOPLEVEL_DIR, "kendosrc", "js", "kendo-config.json"
        ), "utf8"));
    }
    return KENDO_CONFIG;
};

function cleanup() {
    init_config();
    save_config();
}

exports.get_projects_directory = get_projects_directory;
exports.save = save_config;
exports.get = get;
exports.set = set;
exports.get_chrome_exe = get_chrome_exe;
exports.get_kendo_config = get_kendo_config;
exports.read_config = read_config;
exports.cleanup = cleanup;
