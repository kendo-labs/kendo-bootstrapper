var VM = require("vm");
var PATH = require("path");
var FS = require("fs");

function load(file) {
    file = PATH.resolve(PATH.dirname(module.filename), file);
    var code = FS.readFileSync(file, "utf8");
    VM.runInThisContext(code, file);
};

load("./tp/jszip/jszip.js");
load("./tp/jszip/jszip-deflate.js");

module.exports = JSZip;
