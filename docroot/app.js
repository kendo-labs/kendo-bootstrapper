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
        PROJECTS.insert(proj);
    });
    RPC.listen("project_add_file", function(data){
        var proj = PROJECTS.get(data.proj_id);
        delete data["proj_id"];
        proj.files.push(data);
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
    $("#content").on("click", "[command=edit-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("filename");
        RPC.call("project/edit-file", proj, file);
        ev.preventDefault();
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
    }));
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

function rebuildProject(proj_id, callback) {
    var proj = PROJECTS.get(proj_id);
    RPC.call("project/rebuild-all", proj_id, function(fileinfo, err){
        if (err && err instanceof Array) {
            showBuildErrors(proj_id, err);
            if (callback) callback(null, true);
        }
        else {
            drawContent(proj, fileinfo);
            if (callback) callback(fileinfo, false);
        }
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
        RPC.listen_once(expect, function(ret){
            if (ret && ret.error) {
                alert(ret.error);
            } else {
                dlg.close();
            }
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

function projectBuildKendo(proj_id) {
    RPC.call("project/widget-usage", proj_id, function(data, err){
        var detected = [];
        var kcomp = data.kendo_config.components;
        function require(comp) {
            if (typeof comp == "string") {
                for (var i = 0; i < kcomp.length; ++i) {
                    if (kcomp[i].id == comp) {
                        comp = kcomp[i];
                        break;
                    }
                }
            }
            // if (comp.depends) {
            //     comp.depends.forEach(require);
            // }
            if (detected.indexOf(comp.id) < 0)
                detected.push(comp.id);
        }
        data.components.forEach(require);
        if (err) {
            alert(err.msg);
            return;
        }
        var sel = detected;
        if (data.manual_kendo_components) {
            sel = sel.concat(data.manual_kendo_components);
        }
        var dlg_el = $("<div></div>").html(getTemplate("kendo-widget-usage")({
            widgets   : data.widgets,
            kcomp     : kcomp,
            selection : sel,
            manual    : data.manual_kendo_components,
            okLabel   : "Build!"
        })).kendoTooltip({
            filter: "label",
            position: "right",
            width: "15em"
        }).kendoWindow({
            title: "Build custom Kendo UI",
            modal: true,
            width: "500px"
        }).on("click", ".btn-ok", function(){
            var user_selection = [];
            $("input[id^=\"kcomp-\"]:checked", dlg_el).each(function(){
                user_selection.push(this.value);
            });
            RPC.call("project/build-kendo", proj_id, {
                detected: detected,
                selected: user_selection
            }, function(ret, err){
                dlg.close();
                projectRefreshContent(proj_id);
            });
        }).on("click", ".btn-cancel", function(){
            dlg.close();
        });
        var dlg = dlg_el.data("kendoWindow");
        dlg.open();
        dlg.center();
    });
}

function projectBuildDistro(proj_id) {
    rebuildProject(proj_id, function(_, err){
        if (!err)
            window.location.replace("/@build/prod/" + proj_id);
    });
}

function getProjectFileById(proj, id) {
    var a = proj.files;
    for (var i = a.length; --i >= 0;)
        if (a[i].id == id)
            return a[i];
}

function getProjectFileByName(proj, name) {
    var a = proj.files;
    for (var i = a.length; --i >= 0;)
        if (a[i].name == name)
            return a[i];
}

function projectEditDependencies(proj_id) {
    var proj = PROJECTS.get(proj_id);
    var the_deps = {};
    proj.files.forEach(function(f){
        the_deps[f.id] = f.deps ? [].slice.call(f.deps) : [];
    });
    var dlg_el = $("<div></div>").html(getTemplate("project-deps-dialog")({
        files: proj.files,
    })).kendoWindow({
        title: "File dependencies",
        modal: true,
        width: 600,
        height: 400,
    }).on("click", ".btn-ok", function(){
        RPC.call("project/set-dependencies", proj.id, the_deps, function(ret, err){
            if (err) {
                console.log(err);
                return;
            }
            dlg.close();
            proj.files.forEach(function(f){
                f.deps = the_deps[f.id] || [];
            });
            projectRefreshContent(proj.id);
        });
    }).on("click", ".btn-cancel", function(){
        dlg.close();
    });
    var left_files = $(".left-files", dlg_el).kendoListView({
        dataSource : proj.files,
        selectable : true,
        template   : getTemplate("simple-list-item"),
        change     : function(ev) {
            var id = this.select().attr("value");
            if (!id) {
                $(".deps", dlg_el).css("display", "none");
                return;
            }
            var file = getProjectFileById(proj, id);
            $(".deps", dlg_el)
                .css("display", "")
                .find(".filename").html(kendo.htmlEncode(file.name));
            var deps = [].slice.call(the_deps[file.id] || []);
            // $(".deps-select", dlg_el).kendoMultiSelect({
            //     dataSource     : proj.files,
            //     dataTextField  : "name",
            //     dataValueField : "id",
            //     placeholder    : "No deps selected",
            //     highlightFirst : false,
            //     value          : deps
            // });
            var deps_select_el = $("<div></div>").kendoListView({
                template: getTemplate("simple-list-item"),
                selectable: "multiple",
                dataSource: proj.files.filter(function(f){
                    return f !== file;
                }),
                change: function() {
                    var val = this.select().map(function(){
                        return $(this).attr("value");
                    });
                    val = [].slice.call(val);
                    the_deps[file.id] = val;
                }
            });
            $(".deps-select", dlg_el).html("<br />").append(deps_select_el);
            var deps_select = deps_select_el.data("kendoListView");
            var elements = deps.map(function(f){
                return $("[value=\"" + f + "\"]", deps_select_el);
            });
            deps_select.select(elements);
        }
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
