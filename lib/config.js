var PATH = require("path");
var FS = require("fs");

var UTILS = require("./utils");
var PLATFORM = require("./platform");

var CONFIG = {
    projects: new UTILS.Dictionary()
};

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
        CONFIG.projects.__proto__ = UTILS.Dictionary.prototype;
    } catch(ex) {
        if (ex.code == "ENOENT") {
            save_config();
        }
    }
};

function save_config() {
    FS.writeFileSync(get_config_file(), JSON.stringify(CONFIG, null, 4), "utf8");
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

exports.get_projects_directory = get_projects_directory;
exports.save = save_config;
exports.get = get;
exports.set = set;
exports.get_chrome_exe = get_chrome_exe;

read_config();
