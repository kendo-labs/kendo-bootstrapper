module.exports = function() {

    var events = {};

    function listen(msg, handler) {
        var a = events["$" + msg] || (
            events["$" + msg] = []
        );
        a.push(handler);
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
            handler(data);
            unlisten(msg, tmp);
        });
    };

    function notify(msg, data) {
        var a = events["$" + msg];
        if (a) {
            a.forEach(function(handler){
                handler(data);
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
