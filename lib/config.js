var PATH = require("path");
var FS = require("fs");

var PROJECT = require("./project");
var UTILS = require("./utils");
var PLATFORM = require("./platform");
var RPC = require("./rpc");

var KNOWN_EDITORS = {
    "gedit": {
        cmd1: [ "{file}" ],
        cmd2: [ "{file}", "+{line}" ],
        cmd3: [ "{file}", "+{line}:{col}" ],
    },
    "gvim": {
        cmd1: [ "{file}" ],
        cmd2: [ "+{line}", "{file}" ],
        cmd3: [ "+{line}:{col}", "{file}" ],
    },
    "emacs": {
        cmd1: [ "{file}" ],
        cmd2: [ "+{line}", "{file}" ],
        cmd3: [ "+{line}:{col}", "{file}" ],
    },
    "notepad++": {
        cmd1: [ "{file}" ],
        cmd2: [ "-n{line}", "{file}" ],
    },
    "sublime_text": {
        cmd1: [ "{file}" ],
        cmd2: [ "{file}:{line}" ],
        cmd3: [ "{file}:{line}:{col}" ],
    },
    "subl": {
        cmd1: [ "{file}" ],
        cmd2: [ "{file}:{line}" ],
        cmd3: [ "{file}:{line}:{col}" ],
    },
    "notepad": {
        cmd1: [ "{file}" ],
        cmd2: [ "{file}" ],
        cmd3: [ "{file}" ],
    },
};

var CONFIG;
init_config();

function init_config() {
    CONFIG = {
        projects: new UTILS.Dictionary(),
    };
}

function get_projects_directory() {
    return PLATFORM.HOME();
};

function get_config_file() {
    return PATH.join(PLATFORM.HOME(), "kendo-bootstrapper.json");
};

function read_config() {
    function ensure_editor(cont) {
        if (!CONFIG.editor) {
            if (process.platform == "darwin") {
                var editors = PLATFORM.darwin_get_editor_apps();
                if (editors.length > 0) {
                    CONFIG.editor = editors[0];
                    save_config();
                    if (cont) cont(true);
                } else {
                    if (cont) cont(false);
                }
            } else {
                PLATFORM.locate_code_editor(function(err, filename){
                    if (err) {
                        PROJECT.client_log({
                            cprefix: "Warning",
                            message: "No code editor found"
                        });
                        if (cont) cont(false);
                    } else {
                        var name = PATH.basename(filename).replace(/\.exe$/i, "");
                        CONFIG.editor = {
                            type: name,
                            path: filename,
                            args: KNOWN_EDITORS[name] || {
                                cmd1: [ "{file}" ],
                                cmd2: [ "{file}" ],
                                cmd3: [ "{file}" ],
                            },
                        };
                        save_config();
                        if (cont) cont(true);
                    }
                });
            }
        }
    }
    try {
        var data = FS.readFileSync(get_config_file(), "utf8");
        CONFIG = JSON.parse(data);
        var paths = CONFIG.projects;
        CONFIG.projects = new UTILS.Dictionary();
        paths.forEach(PROJECT.load);
        ensure_editor();
    } catch(ex) {
        if (ex.code == "ENOENT") {
            ensure_editor(function(saved){
                if (!saved)
                    save_config();
            });
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

    // Mac OSX Reports "darwin"
    if (/darwin/.test(process.platform))
        return callback(null, "/Applications/Google Chrome.app/Contents/MacOS/Google\ Chrome");

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
            TOPLEVEL_DIR, "kendo-config.json"
        ), "utf8"));
    }
    return KENDO_CONFIG;
};

function cleanup() {
    init_config();
    save_config();
}

function settings_for_client() {
    return {
        projects_dir  : get_projects_directory().sane_path(),
        platform      : process.platform,
        pathsep       : PATH.sep,
        editor        : get("editor"),
        kendo_src_dir : get("kendo_src_dir"),
        kendo_web     : get("kendo_web"),
        kendo_mobile  : get("kendo_mobile"),
        kendo_all     : get("kendo_all"),
        kendo_dataviz : get("kendo_dataviz"),
    };
}

function notify_setup(websocket) {
    RPC.notify(websocket, "setup", settings_for_client());
}

exports.get_projects_directory = get_projects_directory;
exports.save = save_config;
exports.get = get;
exports.set = set;
exports.get_chrome_exe = get_chrome_exe;
exports.get_kendo_config = get_kendo_config;
exports.read_config = read_config;
exports.cleanup = cleanup;
exports.notify_setup = notify_setup;

RPC.defhandler("settings/save", function(request, settings){
    set("editor", settings.editor);
    save_config();
    notify_setup(request.client);
    RPC.send_result(request, {});
});

RPC.defhandler("settings/get", function(request){
    RPC.send_result(request, settings_for_client());
    PROJECT.forEach(function(proj){
        request.notify("register_project", proj);
    });
    var active_project = get("active_project");
    if (active_project) {
        request.notify("set_active_project", active_project);
    }
});

RPC.defhandler("platform/darwin-list-code-editors", function(request){
    var editors = PLATFORM.darwin_get_editor_apps();
    RPC.send_result(request, editors);
});
