var FS = require("fs");
var PATH = require("path");

Array.prototype.remove = function(el, test) {
    if (test == null) {
        var pos = this.indexOf(el);
        if (pos >= 0) this.splice(pos, 1);
    } else {
        for (var i = this.length; --i >= 0;) {
            if (test(this[i], el)) this.splice(i, 1);
        }
    }
    return this;
};

Array.prototype.remove_duplicates = function() {
    var seen = [];
    for (var i = this.length; --i >= 0;) {
        var el = this[i];
        if (seen.contains(el)) this.splice(i, 1);
        seen.push(el);
    }
    return this;
};

Array.prototype.contains = function(el, test) {
    if (test == null) return this.indexOf(el) >= 0;
    for (var i = this.length; --i >= 0;) if (test(this[i], el)) return true;
};

Array.prototype.pushUniq = function(el, test) {
    if (test == null) {
        if (this.indexOf(el) < 0) {
            this.push(el);
            return true;
        }
        return false;
    }
    for (var i = this.length; --i >= 0;)
        if (test(this[i], el)) return false;
    this.push(el);
    return true;
};

Array.prototype.minus = function(other, test) {
    return this.filter(function(el){
        return !other.contains(el, test);
    });
};

String.prototype.sane_path = function() {
    return this.replace(/\\/g, "/");
};

function defaults(args, defs) {
    var ret = {};
    for (var i in defs)
        ret[i] = args.hasOwnProperty(i) ? args[i] : defs[i];
    return ret;
};

function shallow_copy(src, dest) {
    if (dest == null) dest = {};
    for (var i in src) dest[i] = src[i];
    return dest;
};

// filesystem operations

function fs_ensure_directory(dir, callback) {
    dir = PATH.normalize(dir);
    try {
        if (FS.statSync(dir).isDirectory()) return callback(null, dir);
        else callback(new Error("fs_ensure_directory: " + dir + " exists and is not a directory!"));
    } catch(ex) {
        fs_ensure_directory(PATH.dirname(dir), function(err){
            if (err) return callback(err);
            FS.mkdirSync(dir, 0755);
            callback(null, dir);
        });
    }
};

function fs_copylist(files, dest, callback) {
    function cont(err) {
        if (err) return callback(err);
        if (++copied == files.length) callback();
    };
    var copied = 0;
    for (var i = files.length; --i >= 0;)
        fs_copy(files[i], dest, cont);
};

var copy_in_progress = 0;
function fs_copy(source, dest, callback) {
    // we have to place some limit on the max number of files we copy
    // at once, to avoid the "EMFILE" error.
    //
    // http://stackoverflow.com/questions/8965606/node-and-error-emfile-too-many-open-files
    //
    // tried "graceful-fs" but it doesn't really work..
    if (copy_in_progress >= 150) {
        setTimeout(function(){
            fs_copy(source, dest, callback);
        }, 10);
    } else {
        ++copy_in_progress;
        _fs_do_copy(source, dest, function(){
            --copy_in_progress;
            return callback.apply(this, arguments);
        });
    }
}

function _fs_do_copy(source, dest, callback) {
    if (source instanceof Array)
        return fs_copylist(source, dest, callback);
    fs_ensure_directory(PATH.dirname(dest), function(err){
        if (err) return callback(err);
        FS.lstat(source, function(err, stat){
            if (err) return callback(err);
            else if (stat.isDirectory()) {
                dest = PATH.join(dest, PATH.basename(source));
                return fs_ensure_directory(dest, function(){
                    fs_copytree(source, dest, callback);
                });
            }
            else if (stat.isSymbolicLink()) {
                FS.readlink(source, function(err, data){
                    if (err) return callback(err);
                    FS.lstat(dest, function(err, stat){
                        if (err && err.code != "ENOENT") return callback(err);
                        if (!err && stat.isDirectory()) {
                            dest = PATH.join(dest, PATH.basename(source));
                        }
                        FS.symlink(data, dest, callback);
                    });
                });
            }
            else FS.readFile(source, function(err, data){
                if (err) return callback(err);
                FS.stat(dest, function(err, stat){
                    if (err && err.code != "ENOENT") return callback(err);
                    if (!err && stat.isDirectory()) {
                        dest = PATH.join(dest, PATH.basename(source));
                    }
                    FS.writeFile(dest, data, callback);
                });
            });
        });
    });
};

function fs_copytree(source, dest, options) {
    if (!options) options = {};
    if (typeof options == "function") options = {
        callback: options
    };
    if (!options.callback) options.callback = function(err) {
        if (err) throw err;
    };
    var finished = false, count = 0;
    var args = {
        callback: function(err, f) {
            if (err) return options.callback(err);
            if (!f.stat.isDirectory()) {
                ++count;
                fs_copy(f.full, PATH.join(dest, f.rel), function(err){
                    if (err) return options.callback(err);
                    --count;
                    if (finished && count == 0)
                        options.callback();
                });
            }
        },
        filter: options.filter,
        recurse: options.recurse,
        finish: function() {
            finished = true;
        }
    };
    fs_find(source, args);
};

function is_vcs_dir(name) {
    return (/^(\.git|\.hg|\.bzr|SVN|CVS|_darcs)$/.test(name));
};

function fs_find(dir, options, prefix, level, finish) {
    if (dir == null) dir = process.cwd();
    if (prefix == null) prefix = ".";
    if (level == null) {
        level = 0;
        finish = options.finish || function(){};
    }
    FS.readdir(dir, function(err, ret){
        if (err) return options.callback(err);
        var async_calls = ret.length;
        if (async_calls == 0) {
            finish();
            return;
        }
        ret.forEach(function(name){
            var fullname = PATH.join(dir, name);
            FS.stat(fullname, function(err, stat){
                if (err) {
                    options.callback(err);
                } else {
                    var rel = PATH.join(prefix, name);
                    var f = {
                        name : name,
                        full : fullname,
                        stat : stat,
                        dir  : dir,
                        rel  : rel
                    };
                    if (!options.filter || options.filter(f))
                        options.callback(null, f);
                    if (stat.isDirectory()
                        && (!options.recurse || options.recurse(f))
                        && (!options.skip_vcs || !is_vcs_dir(fullname)))
                    {
                        fs_find(fullname, options, rel, level + 1, function(){
                            if (--async_calls == 0)
                                finish();
                        });
                        return;
                    }
                }
                if (--async_calls == 0) finish();
            });
        });
    });
};

function fs_rmpath(dir, callback, deep) {
    FS.stat(dir, function(err, stat){
        if (err) return deep ? callback(err) : callback();
        if (stat.isDirectory()) {
            FS.readdir(dir, function(err, entries){
                if (err) return callback(err);
                function cont() {
                    FS.rmdir(dir, function(err){
                        if (err) return callback(err);
                        callback();
                    });
                };
                var n = entries.length;
                if (n == 0) cont();
                else entries.forEach(function(e){
                    fs_rmpath(PATH.join(dir, e), function(err){
                        if (err) return callback(err);
                        if (--n == 0) cont();
                    }, true);
                });
            });
        } else {
            FS.unlink(dir, function(err){
                if (err) return callback(err);
                callback();
            });
        }
    });
};

function fs_rmpathSync(x) {
    var stat = FS.statSync(x);
    if (!stat.isDirectory()) {
        FS.unlinkSync(x);
    } else {
        FS.readdirSync(x).forEach(function(file){
            fs_rmpathSync(PATH.join(x, file));
        });
        FS.rmdirSync(x);
    }
};

/* -----[ Dictionary, from UglifyJS ]----- */

function Dictionary() {
    this._values = Object.create(null);
    this._size = 0;
};
Dictionary.prototype = {
    set: function(key, val) {
        if (!this.has(key)) ++this._size;
        this._values["$" + key] = val;
        return this;
    },
    add: function(key, val) {
        if (this.has(key)) {
            this.get(key).push(val);
        } else {
            this.set(key, [ val ]);
        }
        return this;
    },
    get: function(key) { return this._values["$" + key] },
    del: function(key) {
        if (this.has(key)) {
            --this._size;
            delete this._values["$" + key];
        }
        return this;
    },
    has: function(key) { return ("$" + key) in this._values },
    each: function(f) {
        for (var i in this._values)
            f(this._values[i], i.substr(1));
    },
    size: function() {
        return this._size;
    },
    map: function(f) {
        var ret = [];
        for (var i in this._values)
            ret.push(f(this._values[i], i.substr(1)));
        return ret;
    }
};

function string_template(text, props) {
    return text.replace(/\{(.+?)\}/g, function(str, p){
        return props[p];
    });
};

function file_change_time(stat) {
    return stat.mtime && stat.mtime.getTime() > stat.ctime.getTime() ? stat.mtime : stat.ctime;
};

function maphash(obj, f) {
    var j = 0, ret = [];
    for (var i in obj) if (obj.hasOwnProperty(i)) {
        ret.push[ f(obj[i], i, j++) ];
    }
    return ret;
};

function mergeSort(array, cmp) {
    if (array.length < 2)
        return array;
    function merge(a, b) {
        var r = [], ai = 0, bi = 0, i = 0;
        while (ai < a.length && bi < b.length) {
            cmp(a[ai], b[bi]) <= 0
                ? r[i++] = a[ai++]
                : r[i++] = b[bi++];
        }
        if (ai < a.length)
            r.push.apply(r, a.slice(ai));
        if (bi < b.length)
            r.push.apply(r, b.slice(bi));
        return r;
    };
    return (function ms(a) {
        if (a.length <= 1)
            return a;
        var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
        left = ms(left);
        right = ms(right);
        return merge(left, right);
    }(array));
};

exports.defaults = defaults;
exports.shallow_copy = shallow_copy;
exports.fs_ensure_directory = fs_ensure_directory;
exports.fs_find = fs_find;
exports.fs_copy = fs_copy;
exports.fs_copytree = fs_copytree;
exports.fs_rmpath = fs_rmpath;
exports.fs_rmpathSync = fs_rmpathSync;
exports.Dictionary = Dictionary;
exports.template = string_template;
exports.file_change_time = file_change_time;
exports.maphash = maphash;
exports.mergeSort = mergeSort;

// https://gist.github.com/982883#file-annotated-js
exports.uuid = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};

String.prototype.globToRegexp = function() {
    var pat = this.replace(/(\*\*|\*|\.|\\|\?)/g, function(s, p){
        return {
            "**" : "[^]*?",
            "*"  : "[^/]*?",
            "."  : "\\.",
            "\\" : "\\\\",
            "?"  : ".",
        }[p];
    });
    return new RegExp("^" + pat + "$", "i");
};
