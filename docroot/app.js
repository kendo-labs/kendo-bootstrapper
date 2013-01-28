var PROJECTS;

$(document).ready(function(){
    PROJECTS = new kendo.data.DataSource();
    setupListeners();
    setupLayout();
});

var getTemplate = function(cache){
    var yajet = new YAJET({
        with_scope: true
    });
    return function(cls) {
        if (cache["$" + cls])
            return cache["$" + cls];
        var html = $("script[type='x/yajet-template']." + cls).text();
        return yajet.compile(html);
    };
}({});

function setupListeners() {
    RPC.listen("register_project", function(proj){
        PROJECTS.insert(proj.meta);
    });
}

function setupLayout() {
    $("#main-layout").kendoSplitter({
        panes: [
            { collapsible: false, size: "20%" },
            { collapsible: false }
        ]
    });
    $("#projects-and-files").kendoSplitter({
        orientation: "vertical",
        panes: [
            { collapsible: false, size: "50%" },
            { collapsible: false }
        ]
    });
    $("#project-list").kendoListView({
        dataSource : PROJECTS,
        selectable : true,
        template   : getTemplate("simple-list-item"),
        change     : function(ev) {
            var proj = this.select().attr("value");
            if (proj) {
                setActiveProject(proj);
            }
        }
    });

    // button handlers
    $("#btn-project-preview").click(function(){
        var sel = $("#project-list").data("kendoListView").select();
        var proj = sel.attr("value");
        if (proj) {
            window.open("/@proj/" + proj + "/", "PROJECTPREVIEW");
        }
    });
}

function projectFileLink(proj, path) {
    return "/@proj/" + proj.id + "/" + path.replace(/^\/+/, "");
}

function setActiveProject(proj) {
    if (typeof proj != "object")
        proj = PROJECTS.get(proj);
    $("#files .title").html(proj.name);

    // display project tree
    var files_data = new kendo.data.HierarchicalDataSource({
        data: [
            make_tree(proj.min_files, "Libraries"),
            make_tree(proj.files, "Project files")
        ]
    });
    function make_tree(data, label) {
        var top_item = { text: label, items: [] };
        data.forEach(function(files, type){
            var type_item = { text: type, items: [] };
            top_item.items.push(type_item);
            files.forEach(function(file){
                type_item.items.push({ text: file });
            });
        });
        return top_item;
    };
    $("#project-file-tree").html("<div></div>");
    $("#project-file-tree div").kendoTreeView({ dataSource: files_data });

    // fill the #content div with project details
    $("#content").html(getTemplate("project-view")({
        project_name : proj.name,
        min_files    : proj.min_files,
        files        : proj.files,
        _make_link   : function(path) {
            return projectFileLink(proj, path);
        }
    }));
}
