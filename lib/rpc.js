var HANDLERS = {};

function defhandler(name, func) {
    HANDLERS["$" + name] = {
        exec: func
    };
};

function gethandler(name) {
    return HANDLERS["$" + name];
};

function handle_request(ws, message) {
    var a = JSON.parse(message);
    var req_id = a[0];
    var cmd = a[1];
    var args = a.slice(2);
    var handler = gethandler(cmd);
    var request = {
        id      : req_id,
        command : cmd,
        client  : ws,
    };
    if (!handler) {
        send_error(request, "Unknown command: " + cmd);
    } else {
        args.unshift(request);
        var result = handler.exec.apply(null, args);
        if (result !== undefined) {
            send_result(request, result);
        }
    }
};

function send_result(request, obj) {
    var message = JSON.stringify([
        request.id,
        request.command,
        obj
    ]);
    request.client.send(message);
};

function send_error(request, error) {
    send_result(request, { error: error });
};

function notify(client, msg, data) {
    client.send(JSON.stringify([ msg, data ]));
};

exports.handle_request = handle_request;
exports.send_error = send_error;
exports.send_result = send_result;
exports.defhandler = defhandler;
exports.notify = notify;
