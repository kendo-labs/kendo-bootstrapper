var PROJECTS;
var SERVER_CONFIG = {};

$(document).ready(function(){
    getTemplate("template-library");
    PROJECTS = new kendo.data.DataSource();
    setupListeners();
    setupLayout();
});

var getTemplate = function(cache){
    var yajet = new YAJET({
        with_scope: false
    });
    return function(cls) {
        var tmpl = cache["$" + cls];
        if (tmpl) return tmpl;
        var html = $("script[type='x/yajet-template']." + cls).text();
        return cache["$" + cls] = yajet.compile(html);
    };
}({});

function setupListeners() {
    RPC.listen("setup", function(config){
        SERVER_CONFIG = config;
    });
    RPC.listen("register_project", function(proj){
        proj.meta.path = proj.path;
        PROJECTS.insert(proj.meta);
    });
    RPC.listen("project_add_file", function(data){
        var proj = PROJECTS.get(data.proj_id);
        proj.files.push({
            name : data.name,
            type : data.type,
            lib  : data.lib
        });
        if (proj.id == ACTIVE_PROJECT) {
            setActiveProject(proj); // refresh views
        }
    });
    RPC.listen("project_delete_file", function(data){
        var proj = PROJECTS.get(data.proj_id);
        var filename = data.file;
        for (var i = proj.files.length; --i >= 0;) {
            if (proj.files[i].name == filename)
                proj.files.splice(i, 1);
        }
        if (proj.id == ACTIVE_PROJECT) {
            setActiveProject(proj); // refresh views
        }
    });
}

function getSelectedProject() {
    if (!ACTIVE_PROJECT) throw ("Select a project first");
    return PROJECTS.get(ACTIVE_PROJECT);
}

function getSelectedFile() {
    if (!ACTIVE_PROJECT) throw ("Select a project first");
    var proj = PROJECTS.get(ACTIVE_PROJECT);
    var tree = $("#project-file-tree>div:first").data("kendoTreeView");
    var sel = tree.select();
    if (sel.length == 0) throw ("No file selected");
    sel = tree.dataItem(sel);
    if (sel.hasChildren) throw ("Please select a file");
    return sel;
}

function withSelectedProject(f) {
    try { f(getSelectedProject()) }
    catch(ex) { alert(ex) }
}

function withSelectedFile(f) {
    try { f(getSelectedProject(), getSelectedFile().filename) }
    catch(ex) { alert(ex) }
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
    $("#btn-project-new").click(function(){
        projectNew();
    });
    $("#btn-project-preview").click(function(){
        withSelectedProject(function(proj){
            window.open("/@proj/" + proj.id + "/", "PROJECTPREVIEW");
        });
    });
    $("#btn-file-new").click(function(){
        withSelectedProject(function(proj){
            projectAddFile(proj.id);
        });
    });
    $("#btn-file-edit").click(function(){
        withSelectedFile(function(proj, file){
            RPC.call("project/edit-file", proj.id, file);
        });
    });
    $("#btn-file-delete").click(function(){
        withSelectedFile(function(proj, file){
            areYouSure({
                message: "Really delete file " + file + "?",
                okLabel: "Yes",
                cancelLabel: "NOOO!",
            }, function(ok){
                if (ok) RPC.call("project/delete-file", proj.id, file);
            });
        });
    });
    $(window).focus(function(){
        if (ACTIVE_PROJECT) {
            projectRefreshContent(ACTIVE_PROJECT);
        }
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
        ]
    });
    function make_tree(files, label) {
        var top_item = { text: label, items: [] };
        files.forEach(function(f){
            top_item.items.push({ text: f.name, filename: f.name });
        });
        return top_item;
    };
    $("#project-file-tree").html("<div></div>");
    $("#project-file-tree div").kendoTreeView({ dataSource: files_data });

    projectRefreshContent(proj.id);
}

function projectRefreshContent(proj_id) {
    RPC.call("project/file-info", proj_id, function(fileinfo, err){
        if (!err) {
            drawContent(PROJECTS.get(proj_id), fileinfo);
        }
    });
}

function filesByType(files) {
    var hash = {};
    files.forEach(function(f){
        var a = hash[f.type] || (hash[f.type] = []);
        a.push(f);
    });
    return hash;
}

function drawContent(proj, data) {
    // fill the #content div with project details
    var file_info = {};
    data.forEach(function(f){
        file_info[f.rel] = f;
    });
    $("#content").html(getTemplate("project-view")({
        id           : proj.id,
        project_name : proj.name,
        files        : filesByType(proj.files),
        file_info    : file_info,
        make_link    : function(path) {
            return projectFileLink(proj, path);
        }
    })).on("click", "[command=edit-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("filename");
        RPC.call("project/edit-file", proj, file);
        ev.preventDefault();
    });
}

function showBuildErrors(proj_id, errors) {
    var dlg_el = $("<div></div>").html(getTemplate("build-errors-dialog")({
        proj_id : proj_id,
        errors  : errors
    })).kendoWindow({
        title : "Build errors",
        modal : true
    }).on("click", ".btn-close", function(){
        dlg.close();
    }).on("click", "[command=edit-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("filename");
        var line = $(this).attr("line");
        var col = $(this).attr("col");
        RPC.call("project/edit-file", proj_id, file, line, col);
        ev.preventDefault();
    });
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
}

function rebuildProject(proj_id) {
    var proj = PROJECTS.get(proj_id);
    RPC.call("project/rebuild-all", proj_id, function(fileinfo, err){
        if (err && err instanceof Array) {
            showBuildErrors(proj_id, err);
        }
        else drawContent(proj, fileinfo);
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

function projectNew() {
    var timeout = null;
    var dest = SERVER_CONFIG.projects_dir.replace(/\/+$/, "");
    var dlg_el = $("<div></div>").html(getTemplate("new-project-dialog")({
        destination: dest
    })).kendoWindow({
        title: "Create new project",
        modal: true
    }).on("click", ".btn-ok", function(){
        var args = {
            id   : $("input[name=id]"   , dlg_el).val(),
            name : $("input[name=name]" , dlg_el).val(),
            path : $("input[name=path]" , dlg_el).val(),
        }
        RPC.call("project/bootstrap", args, function(data, err){
            if (err) {
                alert(err.msg);
                return;
            }
            dlg.close();
        });
    }).on("click", ".btn-cancel", function(){
        dlg.close();
    }).on("keydown", "input[name=name]", function(){
        clearTimeout(timeout);
        var self = this;
        setTimeout(function(){
            var val = $(self).val();
            var name = val.replace(/[^a-z0-9_.-]/ig, "_");
            $("input[name=path]", dlg_el).val(dest + "/" + name);
            $("input[name=id]", dlg_el).val(val.replace(/[^a-z0-9_]/ig, "_"));
        }, 100);
    });
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
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
