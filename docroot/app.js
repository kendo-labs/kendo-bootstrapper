$(document).ready(function(){
    console.log("Init");

    RPC.listen("register_project", function(proj){
        console.log("REGISTER PROJECT:", proj);
    });
});
