// application entry point
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
