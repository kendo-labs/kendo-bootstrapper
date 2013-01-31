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
    RPC.listen("project_add_file", function(data){
        var proj = PROJECTS.get(data.proj_id);
        var dest = data.library ? proj.min_files : proj.files;
        var x = dest[data.ext];
        if (!x) {
            x = dest.insert([]);
        }
        x.push(data.file);
        if (proj.id == ACTIVE_PROJECT) {
            setActiveProject(proj); // refresh views
        }
    });
    RPC.listen("project_delete_file", function(data){
        var proj = PROJECTS.get(data.proj_id);
        var filename = data.file;
        [ proj.min_files, proj.files ].forEach(function(bag){
            // bag is an ObservableObject
            bag.forEach(function(files, type){
                var pos = files.indexOf(filename);
                if (pos >= 0) files.splice(pos, 1);
            });
        });
        if (proj.id == ACTIVE_PROJECT) {
            setActiveProject(proj); // refresh views
        }
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
    $("#btn-file-new").click(function(){
        if (!ACTIVE_PROJECT) return alert("Select a project first");
        projectAddFile(ACTIVE_PROJECT);
    });
    $("#btn-file-delete").click(function(){
        if (!ACTIVE_PROJECT) return alert("Select a project first");
        var proj = PROJECTS.get(ACTIVE_PROJECT);
        var tree = $("#project-file-tree>div:first").data("kendoTreeView");
        var sel = tree.select();
        if (sel.length == 0) return alert("No file selected");
        sel = tree.dataItem(sel);
        if (sel.hasChildren) return alert("Please select a file");
        areYouSure({
            message: "Really delete file " + sel.filename + "?",
            okLabel: "Yes",
            cancelLabel: "NOOO!",
        }, function(ok){
            if (ok) RPC.call("project/delete-file", proj.id, sel.filename);
        });
    });
}

function projectFileLink(proj, path) {
    return "/@proj/" + proj.id + "/" + path.replace(/^\/+/, "");
}

var ACTIVE_PROJECT = null;

function setActiveProject(proj) {
    if (typeof proj != "object")
        proj = PROJECTS.get(proj);
    ACTIVE_PROJECT = proj.id;
    $("#files .title").html(proj.name);

    // display project tree
    var files_data = new kendo.data.HierarchicalDataSource({
        data: [
            make_tree(proj.files, "Project files"),
            make_tree(proj.min_files, "Libraries"),
        ]
    });
    function make_tree(data, label) {
        var top_item = { text: label, items: [] };
        data.forEach(function(files, type){
            var type_item = { text: type, items: [] };
            top_item.items.push(type_item);
            files.forEach(function(file){
                type_item.items.push({ text: file, filename: file });
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
        RPC.listen_once(expect, function(){
            dlg.close();
        });
    });
}

function areYouSure(options, callback) {
    var dlg_el = $("<div></div>").html(getTemplate("confirm-dialog")({
        message     : options.message,
        okLabel     : options.okLabel,
        cancelLabel : options.cancelLabel
    })).kendoWindow({
        title: options.title || "Confirm",
        modal: true
    }).on("click", ".btn-ok", function(){
        dlg.close();
        callback(true);
    }).on("click", ".btn-cancel", function(){
        dlg.close();
        callback(false);
    });
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
}
