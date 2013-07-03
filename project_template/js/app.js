// application entry point
{{#if USE_REQUIREJS}}
require.config({
    paths: {
        "jquery": "kendo/js/jquery.min",
        "kendo": "kendo/js/kendo.web.min"
    }
});

require([ "jquery", "kendo" ], function(){
    $(document).ready(function(){
        var dlg = $("#hello-world-window").kendoWindow({
            title: "Hello World!",
            width: "400px",
            close: function() {
                window.alert("It's closing!");
            }
        }).data("kendoWindow");
        dlg.open();
        dlg.center();
    });
});
{{else}}
$(document).ready(function(){
    var dlg = $("#hello-world-window").kendoWindow({
        title: "Hello World!",
        width: "400px",
        close: function() {
            window.alert("It's closing!");
        }
    }).data("kendoWindow");
    dlg.open();
    dlg.center();
});
{{/if}}
