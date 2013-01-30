var PROJECTS;

$(document).ready(function(){
    PROJECTS = new kendo.data.DataSource();
    setupListeners();
    setupLayout();
});

var getTemplate = function(cache){
    var yajet = new YAJET({
        with_scope: false
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
        proj.meta.path = proj.path;
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

    RPC.call("project/file-info", proj.id, function(fileinfo){
        refreshContent(proj, fileinfo);
    });
}

function refreshContent(proj, data) {
    // fill the #content div with project details
    var file_info = {};
    data.forEach(function(f){
        file_info[f.rel] = f;
    });
    $("#content").html(getTemplate("project-view")({
        id           : proj.id,
        project_name : proj.name,
        min_files    : proj.min_files,
        files        : proj.files,
        file_info    : file_info,
        make_link    : function(path) {
            return projectFileLink(proj, path);
        }
    }));
}

function rebuildProject(proj_id) {
    var proj = PROJECTS.get(proj_id);
    RPC.call("project/rebuild-all", proj_id, function(fileinfo, err){
        refreshContent(proj, fileinfo);
    });
}

function projectAddFile(proj_id) {
    var proj = PROJECTS.get(proj_id);
    var expect = "add-file-" + Date.now();
    var dlg_el = $("<div></div>").html(getTemplate("add-file-dialog")({
        expect : expect,
        id     : proj.id,
        path   : proj.path
    })).kendoWindow({
        title : "Add file to project " + proj.name,
        modal : true
    }).on("change", "input[name=file]", function(ev){
        var filename = this.value.replace(/^.*[\/\\]([^\/\\]+)$/, "$1");
        if (!/\S/.test(input.val())) {
            input.val(filename);
            updateName();
        }
    }).on("click", ".btn-cancel", function(ev){
        dlg.close();
        ev.preventDefault();
    });
    var timeout;
    var input = dlg_el.find("input[name=filename]");
    function updateName(){
        clearTimeout(timeout);
        setTimeout(function(){
            var name = $(input).val().replace(/^\/+/, "");
            dlg_el.find(".display-full-path").text(proj.path + "/" + name);
        }, 100);
    }
    input.on({
        keydown: updateName,
        paste: updateName
    });
    dlg_el.find("input[type=file]").kendoUpload({
        autoUpload : false,
        multiple   : false
    });
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();

    dlg_el.find("form").on("submit", function(){
        RPC.listen_once(expect, function(data){
            dlg.close();
        });
    });
}
