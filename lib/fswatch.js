var FS = require("fs");

var TIMERS = {};

function queue(f, timeout) {
    if (!timeout) timeout = 1000;
    var timer = null;
    return function() {
        if (timer) clearTimeout(timer);
        var args = arguments;
        timer = setTimeout(function(){
            f.apply(null, args);
        }, timeout);
    };
}

function watch(filename, callback) {
    if (Array.isArray(filename))
        return watchMany(filename, callback);
    var unwatch, watcher;
    try {
        (function setupWatcher() {
            watcher = FS.watch(filename, { persistent: true }, queue(function(event){
                try {
                    var stat = FS.statSync(filename);
                    callback("change", filename, stat);
                    // hack: some editors will delete/rename the file
                    // then save a new one.  the existing watcher will
                    // silently stop working in that case, so to play
                    // safe we close it ourselves and re-watch.
                    unwatch();
                    setupWatcher();
                } catch(ex) {
                    callback("delete", filename);
                    unwatch();
                }
            }));
        })();
        unwatch = function() {
            watcher.close();
        };
        return { close: unwatch, filename: filename };
    } catch(ex) {
        if (ex && ex.code == "EISDIR") {
            // take two: this is needed for windows on network filesystem.
            unwatch = function() {
                FS.unwatchFile(filename);
            };
            FS.watchFile(filename, { persistent: true, interval: 250 }, function(currStat, prevStat){
                if (!currStat.isFile()) {
                    callback("delete", filename);
                    unwatch();
                    return;
                }
                if (currStat.mtime != prevStat.mtime) {
                    callback("change", filename, currStat);
                }
            });
            return { close: unwatch, filename: filename };
        }
        throw ex;
    }
}

function watchMany(files, callback) {
    var watchers = [];
    files.forEach(add);
    function unwatchAll() {
        watchers.forEach(function(w){ w.close() });
        watchers = [];
    }
    function add(filename) {
        var w = watch(filename, function(event){
            if (event == "delete") {
                watchers.remove(w); // the watcher is closed already
            }
            callback.apply(null, arguments);
        });
        watchers.push(w);
    }
    function remove(filename) {
        watchers.remove(null, function(w){
            if (w.filename == filename) {
                w.close();
                return true;
            }
        });
    }
    return {
        close  : unwatchAll,
        add    : add,
        remove : remove,
    };
}

exports.watch = watch;
