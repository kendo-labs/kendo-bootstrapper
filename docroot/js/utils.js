function maphash(obj, f) {
    var j = 0, ret = [];
    for (var i in obj) if (obj.hasOwnProperty(i)) {
        ret.push[ f(obj[i], i, j++) ];
    }
    return ret;
};
