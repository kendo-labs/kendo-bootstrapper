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
    RPC.listen("console", function(msg){
        consoleAddMessage(msg);
    });
    RPC.listen("ENDCALL", function(){
        $("#console").children().last().addClass("endcall");
    });
}

function getSelectedProject() {
    if (!ACTIVE_PROJECT) throw ("Select a project first");
    return PROJECTS.get(ACTIVE_PROJECT);
}

function getSelectedFile() {
    if (!ACTIVE_PROJECT) throw ("Select a project first");
    var proj = PROJECTS.get(ACTIVE_PROJECT);
    var tree = $("#project-file-tree").data("kendoTreeView");
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
    kendo.bind($("#top-layout"));
    var top_layout = $("#top-layout").data("kendoLayoutManager");
    $(window).resize(function(){
        top_layout.setOuterSize($(window).innerWidth(),
                                $(window).innerHeight());
    });
    $(window).resize();
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
    $("#btn-kendo-doc").click(function(){
        kendoDocBrowser();
    });
    $("#btn-file-new").click(function(){
        withSelectedProject(projectAddFile);
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
    $(document.body).on("click", "[command=edit-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("filename");
        var line = $(this).attr("line");
        var col = $(this).attr("col");
        RPC.call("project/edit-file", proj, file, line, col);
        ev.preventDefault();
    }).on("click", "[command=deps-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("fileid");
        projectEditFileDependencies(proj, file);
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
    $(".project-title").html(proj.name);

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
    $("#project-file-tree").data("kendoTreeView").setDataSource(files_data);
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
    var el = $("#content").html(getTemplate("project-view")({
        id           : proj.id,
        project_name : proj.name,
        files        : filesByType(proj.files),
        file_info    : file_info,
        make_link    : function(path) {
            return projectFileLink(proj, path);
        }
    })).children();
    kendo.bind(el);
    $(window).resize();
}

function showBuildErrors(proj_id, title, errors) {
    var dlg_el = $("<div></div>").html(getTemplate("build-errors-dialog")({
        proj_id : proj_id,
        errors  : errors
    })).kendoWindow({
        title : title,
        modal : true,
        width : 500,
        height: 400,
        resize: function() {
            var sz = this.getInnerSize();
            lm.setOuterSize(sz.x, sz.y);
        }
    }).on("click", ".btn-close", function(){
        dlg.close();
    });
    kendo.bind(dlg_el);
    var lm = $(".layout", dlg_el).data("kendoLayoutManager");
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");
}

function rebuildProject(proj, callback) {
    RPC.call("project/rebuild-all", proj.id, function(fileinfo, err){
        if (err && err instanceof Array) {
            showBuildErrors(proj.id, "Build errors", err);
            if (callback) callback(null, true);
        }
        else {
            drawContent(proj, fileinfo);
            if (callback) callback(fileinfo, false);
        }
    });
}

function projectLintJavaScript(proj) {
    RPC.call("project/lint-javascript", proj.id, function(results, err){
        if (results.length > 0) {
            showBuildErrors(proj.id, "JSHint warnings", results);
        } else {
            alert("No warnings. :-)");
        }
    });
}

function projectLintKendo(proj) {
    RPC.call("project/lint-kendo", proj.id, function(results, err){
        if (results.length > 0) {
            showBuildErrors(proj.id, "Kendo Lint warnings", results);
        } else {
            alert("No warnings. :-)");
        }
    });
}

function projectAddFile(proj) {
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
            dlg_el.find("[name=\"page\"]").each(function(){
                this.checked = /\.(html?|php|asp)$/i.test(name);
            });
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
                console.log(err);
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
            if (!manually_changed_path)
                $("input[name=path]", dlg_el).val(dest + "/" + name);
            $("input[name=id]", dlg_el).val(val.replace(/[^a-z0-9_]/ig, "_"));
        }, 100);
    });
    var manually_changed_path = false;
    kendo.bind(dlg_el, {
        directorySelected: function(ev) {
            manually_changed_path = true;
            $("input[name=path]", dlg_el).val(ev.value);
        }
    });
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
}

function projectBuildKendo(proj) {
    RPC.call("project/widget-usage", proj.id, function(data, err){
        var detected = [];
        var kcomp = data.kendo_config.components;
        var loading = [];
        function require(comp) {
            if (typeof comp == "string") {
                for (var i = 0; i < kcomp.length; ++i) {
                    if (kcomp[i].id == comp) {
                        comp = kcomp[i];
                        break;
                    }
                }
            }
            if (!loading.contains(comp.id)) {
                loading.push(comp.id);
                if (comp.depends) {
                    comp.depends.forEach(require);
                }
                detected.pushNew(comp.id);
            }
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
        var dlg_el = $("<div></div>").html(getTemplate("kendo-widget-usage-dialog")({
            components : data.components,
            kcomp      : kcomp,
            selection  : sel,
            detected   : detected,
            manual     : data.manual_kendo_components,
            okLabel    : "Build!"
        })).kendoTooltip({
            filter: "label",
            position: "right",
            width: "15em"
        }).kendoWindow({
            title: "Build custom Kendo UI",
            modal: true,
            width: "500px",
            height: "400px",
            resize: function() {
                var sz = this.getInnerSize();
                lm.setOuterSize(sz.x, sz.y);
            }
        }).on("click", ".btn-ok", function(){
            var user_selection = [];
            $("input[id^=\"kcomp-\"]:checked", dlg_el).each(function(){
                user_selection.push(this.value);
            });
            RPC.call("project/build-kendo", proj.id, {
                detected: detected,
                selected: user_selection
            }, function(ret, err){
                dlg.close();
                projectRefreshContent(proj.id);
            });
        }).on("click", ".btn-cancel", function(){
            dlg.close();
        });
        var lm = $(".layout", dlg_el);
        kendo.bind(lm);
        lm = lm.data("kendoLayoutManager");
        var dlg = dlg_el.data("kendoWindow");
        dlg.open();
        dlg.center();
        dlg.trigger("resize");
    });
}

function projectBuildDistro(proj) {
    rebuildProject(proj, function(_, err){
        if (!err) {
            var dlg_el = $("<div></div>").html(getTemplate("build-distro")({

            })).kendoWindow({
                title: "Build distro",
                modal: true,
            }).on("click", ".btn-ok", function(){
                var type = dlg_el.find("input[name=\"build-type\"]:checked").val();
                dlg.close();
                var url = "/@build/" + type + "/" + proj.id;
                window.location.replace(url);
            }).on("click", ".btn-cancel", function(){
                dlg.close();
            });
            var dlg = dlg_el.data("kendoWindow");
            dlg.open();
            dlg.center();
        }
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

function projectGetDepsHash(proj) {
    var the_deps = {};
    proj.files.forEach(function(f){
        the_deps[f.id] = f.deps ? [].slice.call(f.deps) : [];
    });
    return the_deps;
}

function _projectSaveDependencies(proj, deps, callback) {
    RPC.call("project/set-dependencies", proj.id, deps, function(ret, err){
        if (err) {
            console.log(err);
            return;
        }
        proj.files.forEach(function(f){
            f.deps = deps[f.id] || [];
        });
        projectRefreshContent(proj.id);
        callback();
    });
}

function projectEditFileDependencies(proj_id, file_id) {
    var proj = PROJECTS.get(proj_id);
    var file = getProjectFileById(proj, file_id);
    var dlg_el = $("<div></div>").html(getTemplate("project-file-deps-dialog")({
        name: file.name
    })).kendoWindow({
        title  : "File dependencies",
        modal  : true,
        width  : 400,
        height : 300,
        resize : function() {
            var sz = this.getInnerSize();
            lm.setOuterSize(sz.x, sz.y);
        }
    }).on("click", ".btn-ok", function(){
        _projectSaveDependencies(proj, the_deps, function(){
            dlg.close();
        });
    }).on("click", ".btn-cancel", function(){
        dlg.close();
    });
    var the_deps = projectGetDepsHash(proj);
    var deps_select = $(".deps-select", dlg_el).kendoMultiPicker({
        textField  : "name",
        valueField : "id",
        sort       : "type",
        choices    : proj.files.filter(function(f){ return f !== file }),
        value      : the_deps[file_id],
        change     : function(ev) {
            the_deps[file_id] = ev.value;
        }
    });
    var lm = $(".project-deps-dialog", dlg_el);
    kendo.bind(lm);
    var lm = lm.data("kendoLayoutManager");
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");
}

function projectEditDependencies(proj) {
    var the_deps = projectGetDepsHash(proj);
    var dlg_el = $("<div></div>").html(getTemplate("project-deps-dialog")({
        files: proj.files,
    })).kendoWindow({
        title: "File dependencies",
        modal: true,
        width: 600,
        height: 400,
        resize: function() {
            var sz = this.getInnerSize();
            top_layout.setOuterSize(sz.x, sz.y);
        }
    }).on("click", ".btn-ok", function(){
        _projectSaveDependencies(proj, the_deps, function(){
            dlg.close();
        });
    }).on("click", ".btn-cancel", function(){
        dlg.close();
    });
    var selected_file;
    var left_files = new kendo.ui.ListView($(".left-files", dlg_el), {
        dataSource : proj.files,
        selectable : true,
        template   : getTemplate("simple-list-item"),
        change     : function(ev) {
            var id = this.select().attr("value");
            if (!id) {
                return;
            }
            selected_file = getProjectFileById(proj, id);
            $(".deps .title", dlg_el).html(
                "Select below direct dependencies of <b>" + kendo.htmlEncode(selected_file.name) + "</b>"
            );
            var deps = [].slice.call(the_deps[selected_file.id] || []);
            deps_select.reset(proj.files.filter(function(f){
                return f !== selected_file;
            }));
            deps_select.value(deps);
            dlg.trigger("resize");
        }
    });
    var deps_select = new kendo.ui.MultiPicker($(".deps-select", dlg_el), {
        textField  : "name",
        valueField : "id",
        sort       : "type",
        change     : function(ev) {
            the_deps[selected_file.id] = ev.value;
        }
    });
    var top_layout = $(".project-deps-dialog", dlg_el);
    kendo.bind(top_layout);
    top_layout = top_layout.data("kendoLayoutManager");
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");
}

function kendoDocBrowser() {
    RPC.call("kdoc/get-all-docs", function(DOCS){
        var dlg_el = $("<div></div>").html(getTemplate("docbrowser-dialog")({
            closeLabel: "Close"
        })).kendoWindow({
            title: "Kendo UI — API Documentation",
            width: 800,
            height: 500,
            actions: [ "Minimize", "Maximize", "Close" ],
            resize: function() {
                var sz = this.getInnerSize();
                lm.setOuterSize(sz.x, sz.y);
            }
        }).on("click", ".btn-ok", function(){
            dlg.close();
        });

        kendo.bind(dlg_el, {
            select: function(e) {
                var comp = e.item.text();
                comp = DOCS[comp];
                $(".content", dlg_el).html(jsonml_to_html(comp.doc, comp.refs));
            }
        });

        var search = $("input.search", dlg_el).data("kendoAutoComplete");

        var data = [];
        for (var i in DOCS) {
            data.push(DOCS[i]);
            var name = DOCS[i].name.replace(/^kendo\./, "");
            DOCS[i].name = name;
            DOCS[name] = DOCS[i];
        }
        data = new kendo.data.DataSource({
            data: data,
            sort: { field: "name", dir: "asc" }
        });

        search.setDataSource(data);

        var lm = $(".layout", dlg_el).data("kendoLayoutManager");
        var dlg = dlg_el.data("kendoWindow");
        dlg.open();
        dlg.center();
        dlg.trigger("resize");
    });
}

////// Console

function consoleAddMessage(msg) {
    var cs = $("#console");
    var el = $(getTemplate("console-message")(msg));
    cs.append(el);
    el.get(0).scrollIntoView();
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
