var rpc = require("./rpc");

rpc.defhandler("ping", function(request){
    return "PONG";
});
