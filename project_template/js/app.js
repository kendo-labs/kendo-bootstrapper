// application entry point
{{#if USE_REQUIREJS}}
require([ "../kendo/js/jquery.min", "../kendo/js/kendo.web.min" ], function(){
    $(document).ready(function(){
        var dlg = $("#hello-world-window").kendoWindow({
            title: "Hello World!",
            width: "400px",
            close: function() {
                alert("It's closing!")
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
            alert("It's closing!")
        }
    }).data("kendoWindow");
    dlg.open();
    dlg.center();
});
{{/if}}
