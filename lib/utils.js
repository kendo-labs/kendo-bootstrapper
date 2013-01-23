var fs = require("fs");
var path = require("path");

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

function defaults(args, defs) {
    var ret = {};
    for (var i in defs)
        ret[i] = args.hasOwnProperty(i) ? args[i] : defs[i];
    return args;
};

// filesystem operations

function fs_ensure_directory(dir, callback) {
    dir = path.normalize(dir);
    try {
        if (fs.statSync(dir).isDirectory()) return callback();
        else callback(new Error("fs_ensure_directory: " + dir + " exists and is not a directory!"));
    } catch(ex) {
        fs_ensure_directory(path.dirname(dir), function(err){
            if (err) return callback(err);
            fs.mkdirSync(dir, 0755);
            callback();
        });
    }
};

function fs_copy(source, dest, callback) {
    fs_ensure_directory(path.dirname(dest), function(err){
        if (err) return callback(err);
        fs.readFile(source, function(err, data){
            if (err) return callback(err);
            fs.writeFile(dest, data, function(err){
                callback(err);
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
    var args = {
        callback: function(err, f) {
            if (err) return options.callback(err);
            if (!f.stat.isDirectory()) {
                fs_copy(f.full, path.join(dest, f.rel), function(err){
                    if (err) return options.callback(err);
                });
            }
        },
        filter: options.filter,
        recurse: options.recurse,
        finish: function() {
            options.callback();
        }
    };
    fs_find(source, args);
};

function fs_find(dir, options, prefix, level, finish) {
    if (dir == null) dir = process.cwd();
    if (prefix == null) prefix = ".";
    if (level == null) {
        level = 0;
        finish = options.finish;
    }
    fs.readdir(dir, function(err, ret){
        if (err) return options.callback(err);
        var async_calls = 0;
        ret.forEach(function(name){
            var fullname = path.join(dir, name);
            ++async_calls;
            fs.stat(fullname, function(err, stat){
                if (err) return options.callback(err);
                var rel = path.join(prefix, name);
                var f = {
                    name : name,
                    full : fullname,
                    stat : stat,
                    dir  : dir,
                    rel  : rel
                };
                if (!options.filter || options.filter(f))
                    options.callback(null, f);
                if (stat.isDirectory() && (!options.recurse || options.recurse(f))) {
                    fs_find(fullname, options, rel, level + 1, function(){
                        if (--async_calls == 0)
                            finish();
                    });
                } else if (--async_calls == 0)
                    finish();
            });
        });
        if (async_calls == 0)
            finish();
    });
};

function fs_rmpath(dir, callback, deep) {
    fs.stat(dir, function(err, stat){
        if (err) return deep ? callback(err) : callback();
        if (stat.isDirectory()) {
            fs.readdir(dir, function(err, entries){
                if (err) return callback(err);
                function cont() {
                    fs.rmdir(dir, function(err){
                        if (err) return callback(err);
                        callback();
                    });
                };
                var n = entries.length;
                if (n == 0) cont();
                else entries.forEach(function(e){
                    fs_rmpath(path.join(dir, e), function(err){
                        if (err) return callback(err);
                        if (--n == 0) cont();
                    }, true);
                });
            });
        } else {
            fs.unlink(dir, function(err){
                if (err) return callback(err);
                callback();
            });
        }
    });
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

exports.defaults = defaults;
exports.fs_ensure_directory = fs_ensure_directory;
exports.fs_find = fs_find;
exports.fs_copy = fs_copy;
exports.fs_copytree = fs_copytree;
exports.fs_rmpath = fs_rmpath;
exports.Dictionary = Dictionary;
