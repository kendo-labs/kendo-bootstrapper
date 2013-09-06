KENDO_THEMEBUILDER_OPTIONS.saveButton = {
    handler: function(format, code, filename, callback) {
        RPC("project/save-custom-theme", __THIS_PROJECT__, {
            filename : filename,
            filetype : (format == "string" ? "js" : format),
            content  : code
        }, function(isNew, err){ // Doh, reversed order here. :-\
            if (err && typeof err == "object" && err.error)
                err = err.error.code;
            callback(err, isNew);
        });
    }
};

window.onload = function(){
    setTimeout(function(){
        var script = document.createElement("script");
        script.src = "http://" + RPC.HOST + "/kendo/themebuilder/bootstrap.js";
        document.getElementsByTagName("body")[0].appendChild(script);
    }, 500);
};
