(function(){

    var PENDING = {};
    var QUEUE = [];
    var NOTIFICATIONS = {};
    var REQUEST_ID = 0;
    var HOST = window.location.host.replace(/(:[0-9]+)?$/, ":7569");

    var WS = new WebSocket("ws://" + HOST + "/");
    var CONN_UP = false;
    WS.onopen = function() {
        console.log("Socket open");
        CONN_UP = true;
    };
    WS.onclose = function() {
        console.log("Socket closed");
        CONN_UP = false;
        showEndAppDialog();
    };
    WS.onmessage = function(ev) {
        //console.log("Got message: ", ev.data);
        var message = JSON.parse(ev.data);
        if (message.length == 2)
            return notify(message[0], message[1]);
        var id = message[0], result = message[2];
        var cmd = PENDING[id];
        if (cmd && cmd.callback) {
            var error = null;
            if (result != null && result.error) error = result.error;
            cmd.callback.call(null, result, error);
            delete PENDING[id];
        }
        notify("ENDCALL", cmd);
    };
    WS.onerror = function(ev) {
        console.log("Got error: ", ev);
    };

    function send(cmd) {
        var id = cmd.id = ++REQUEST_ID;
        PENDING[id] = cmd;
        var message = [ id, cmd.cmd ].concat(cmd.args);
        WS.send(JSON.stringify(message));
    };

    function queue(cmd) {
        QUEUE.push(cmd);
        startTimer();
    };

    var TIMER = null;
    function startTimer() {
        if (TIMER) clearTimeout(TIMER);
        if (QUEUE.length > 0) {
            TIMER = setTimeout(function(){
                while (CONN_UP && QUEUE.length > 0) {
                    send(QUEUE.shift());
                }
                if (QUEUE.length > 0) startTimer();
            }, 500);
        }
    };

    function notify(msg, data) {
        var a = NOTIFICATIONS["$" + msg];
        if (a) {
            a.forEach(function(handler){
                handler(data);
            });
        }
    };

    function listen(msg, handler) {
        var a = NOTIFICATIONS["$" + msg] || (
            NOTIFICATIONS["$" + msg] = []
        );
        a.push(handler);
    };

    function unlisten(msg, handler) {
        var a = NOTIFICATIONS["$" + msg];
        if (a) {
            var pos = a.indexOf(handler);
            if (pos >= 0)
                a.splice(pos, 1);
            if (a.length == 0)
                delete NOTIFICATIONS["$" + msg];
        }
    };

    function listen_once(msg, handler) {
        listen(msg, function tmp(data){
            handler(data);
            unlisten(msg, tmp);
        });
    };

    function call(cmd) {
        var args = [].slice.call(arguments, 1);
        var callback = null;
        if (args[args.length - 1] instanceof Function) {
            callback = args.pop();
        }
        cmd = {
            cmd      : cmd,
            args     : args,
            callback : callback
        };
        if (CONN_UP) {
            send(cmd);
        } else {
            queue(cmd);
        }
    };

    var RPC = window.RPC = call;

    RPC.call = call;
    RPC.notify = notify;
    RPC.listen = listen;
    RPC.unlisten = unlisten;
    RPC.listen_once = listen_once;
    RPC.HOST = HOST;

})();
