module.exports = function() {

    var events = {};

    function listen(msg, handler) {
        if (msg instanceof Array) {
            msg.forEach(function(msg){
                listen(msg, handler);
            });
        }
        else if (typeof msg == "object") {
            Object.keys(msg).forEach(function(key){
                listen(key, msg[key])
            });
        }
        else {
            var a = events["$" + msg] || (
                events["$" + msg] = []
            );
            a.push(handler);
        }
    };

    function unlisten(msg, handler) {
        var a = events["$" + msg];
        if (a) {
            var pos = a.indexOf(handler);
            if (pos >= 0)
                a.splice(pos, 1);
            if (a.length == 0)
                delete events["$" + msg];
        }
    };

    function listen_once(msg, handler) {
        listen(msg, function tmp(data){
            handler.call(this, data);
            unlisten(msg, tmp);
        });
    };

    function notify(msg, data) {
        var a = events["$" + msg];
        if (a) {
            var ev = { event: msg };
            a.forEach(function(handler){
                handler.call(ev, data);
            });
        }
    };

    return {
        listen      : listen,
        unlisten    : unlisten,
        listen_once : listen_once,
        notify      : notify,
    };

};
