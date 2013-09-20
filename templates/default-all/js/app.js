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

        $("#dialog").kendoWindow({
            title: "Hello World",
        }).data("kendoWindow").open().center();

        $("#chart").kendoChart({
            series: [
                { type: "line", data: [ 1, 2, 3 ] },
                { type: "bar", data: [ 4, 5, 6 ] }
            ]
        });

    });
});
{{else}}
$(document).ready(function(){

    $("#dialog").kendoWindow({
        title: "Hello World",
    }).data("kendoWindow").open().center();

    $("#chart").kendoChart({
        series: [
            { type: "line", data: [ 1, 2, 3 ] },
            { type: "bar", data: [ 4, 5, 6 ] }
        ]
    });

});
{{/if}}
