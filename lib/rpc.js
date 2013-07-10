var HANDLERS = {};

function RPC_Error(msg) { this.msg = msg };
function RPC_Validation_Error(arg, value, msg) {
    RPC_Error.call(this, msg);
    this.arg = arg;
    this.value = value;
}
RPC_Validation_Error.prototype = new RPC_Error;

function Request(id, command, client) {
    this.id = id;
    this.command = command;
    this.client = client;
}

Request.prototype = {
    validate: function(name, value, pred, msg) {
        var valid;
        if (pred instanceof Function) {
            valid = pred(value, name);
            if (typeof valid == "string") {
                msg = valid;
                valid = false;
            }
        } else if (pred instanceof RegExp) {
            valid = pred.test(value);
        } else if (typeof pred == "string") switch (pred) {
          case "required":
            valid = value != null && /\S/.test(value + "");
            break;
          case "integer":
            value = parseFloat(value);
            valid = !isNaN(value) && value == Math.floor(value);
            break;
          case "positive_integer":
            value = parseFloat(value);
            valid = !isNaN(value) && value == Math.floor(value) && value >= 0;
            break;
          case "null":
            valid = value == null;
            break;
        }
        if (!valid) throw new RPC_Validation_Error(name, value, msg);
        return value;
    },
    make_handler: function() {
        var self = this;
        return function(err, data) {
            if (err) send_error(self, err);
            else send_result(self, data);
        };
    },
    notify: function() {
        var args = [].slice.call(arguments);
        args.unshift(this.client);
        return notify.apply(null, args);
    }
};

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
    var request = new Request(req_id, cmd, ws);
    var result;
    if (!handler) {
        send_error(request, "Unknown command: " + cmd);
    } else {
        args.unshift(request);
        try {
            result = handler.exec.apply(null, args);
        }
        catch(ex) {
            if (ex instanceof RPC_Error) {
                send_error(request, ex);
            }
        }
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

exports.Error = RPC_Error;
