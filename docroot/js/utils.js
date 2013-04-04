function maphash(obj, f) {
    var j = 0, ret = [];
    for (var i in obj) if (obj.hasOwnProperty(i)) {
        ret.push[ f(obj[i], i, j++) ];
    }
    return ret;
};

Array.prototype.contains = function(el) {
    return this.indexOf(el) >= 0;
};

Array.prototype.pushNew = function(el) {
    if (!this.contains(el)) this.push(el);
};
