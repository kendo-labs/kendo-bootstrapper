var SERVER_CONFIG = {};
var PLATFORM;
var PROJECTS = new kendo.data.DataSource();

setupListeners();

$(document).ready(function(){
    getTemplate("template-library");
    setupLayout();
    function getConfig(settings) {
        SERVER_CONFIG = settings;
        if (/^win/i.test(settings.platform)) {
            SERVER_CONFIG.windows = true;
        }
    }
    RPC.listen("setup", getConfig);
    RPC.call("settings/get", function(settings){
        getConfig(settings);
        if (!SERVER_CONFIG.kendo_src_dir) {
            filePicker(".", {
                infoText: getTemplate("info-configure-kendo-src-dir")(),
                dirsonly: true,
                noCancel: true,
            }, function(fp){
                if (fp) {
                    RPC.call("config/set-kendo-dir", fp.path, function(accepted, err){
                        if (accepted) {
                            fp.dlg.close();
                        } else {
                            showMessage({
                                class: "error",
                                message: "Seems it's not in " + fp.path + "\nPlease try again."
                            });
                        }
                    });
                }
            });
        }
    });
});

var TMPL = function(cache){
    var yajet = new YAJET({
        with_scope: false,
        filters: {
            txthtml: function(msg) {
                return htmlescape(msg).trim().replace(/\n/g, "<br/>");
            },
            bytes: function(sz) {
                sz = parseFloat(sz);
                if (isNaN(sz)) return "Watman";
                if (sz < 1000) return (sz/1024).toFixed(2) + "K";
                sz /= 1024;
                if (sz < 1000) return Math.round(sz) + "K";
                sz /= 1024;
                if (sz < 1000) return sz.toFixed(2) + "M";
                sz /= 1024;
                return sz.toFixed(3) + "G";
            }
        }
    });
    return {
        getTemplate: function(cls) {
            var tmpl = cache["$" + cls];
            if (tmpl) return tmpl;
            var html = $("script[type='x/yajet-template']." + cls).text();
            return cache["$" + cls] = yajet.compile(html);
        },
        process: function(tmpl, obj, args) {
            return yajet.process(tmpl, obj, args);
        },
        compile: function(html) {
            return yajet.compile(html);
        }
    };
}({});

var getTemplate = TMPL.getTemplate;

function setupListeners() {
    RPC.listen("register_project", function(proj){
        PROJECTS.insert(proj);
    });
    RPC.listen("unregister_project", function(proj_id){
        var proj = PROJECTS.get(proj_id);
        PROJECTS.remove(proj);
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

    // XXX: only useful while developing the bootstrapper
    RPC.listen("docroot_watch", function(ev){
        if (/\.less$/i.test(ev.file)) {
            less.refresh();
        }
        else if (/\.css$/i.test(ev.file)) {
            $("link[rel=\"stylesheet\"]").each(function(){
                this.href = this.href.replace(/\?.*$/, "") + "?" + Date.now();
            });
        }
        setTimeout(function(){
            $(window).resize();
        }, 50);
    });

    RPC.listen("set_active_project", function(proj){
        $("#project-list").data("kendoListView").select("#project-list [value=" + proj + "]"); // ;-(
    });

}

function getSelectedProject() {
    if (!ACTIVE_PROJECT) throw ("Select a project first");
    return PROJECTS.get(ACTIVE_PROJECT);
}

function withSelectedProject(f) {
    try { f(getSelectedProject()) }
    catch(ex) { showMessage({ class: "error", message: ex }) }
}

function setupLayout() {
    var updateDocSearch = function() {
        var query = $("#apidoc-search").val().trim();
        if (query) {
            model.apidoc_lv.dataSource.filter({
                field: "name", operator: "contains", value: query
            });
        } else {
            model.apidoc_lv.dataSource.filter(null);
        }
    }.delayed(300);

    var updateFileSearch = function() {
        if (ACTIVE_PROJECT) {
            projectRefreshContent(ACTIVE_PROJECT);
        }
    }.delayed(300);

    var model = kendo.observable({
        apidoc: [],
        onAPISearchKeydown: function() {
            updateDocSearch.cancel()();
        },
        onAPISearchChange: function() {
            updateDocSearch.cancel()();
        },
        onSettings: function() {
            bootstrapperSettingsDialog();
        },
        onAddFile: function() {
            withSelectedProject(projectAddFile);
        },
        onProjectConfig: function() {
            withSelectedProject(projectConfig);
        },
        onJSHint: function() {
            withSelectedProject(projectLintJavaScript);
        },
        onKendoLint: function() {
            withSelectedProject(projectLintKendo);
        },
        onEditDeps: function() {
            withSelectedProject(projectEditDependencies);
        },
        onCompile: function() {
            withSelectedProject(rebuildProject);
        },
        onOptimizeImages: function() {
            withSelectedProject(optimizeImages);
        },
        onBuildKendo: function() {
            withSelectedProject(projectBuildKendo);
        },
        onBundle: function() {
            withSelectedProject(projectBuildDistro);
        },
        onFileSearchKeydown: function() {
            updateFileSearch.cancel()();
        },
        onFileSearchChange: function() {
            updateFileSearch.cancel()();
        },

        // menu
        onMenuSelectAllFiles: function() {
            withSelectedProject(function(proj){
                $("#content .file-checkbox").each(function(){
                    $(this).prop("checked", true);
                    FILE_SELECTION()["$" + $(this).val()] = true;
                });
            });
        },
        onMenuUnselectAllFiles: function() {
            withSelectedProject(function(proj){
                $("#content .file-checkbox").each(function(){
                    $(this).prop("checked", false);
                    delete FILE_SELECTION()["$" + $(this).val()];
                });
            });
        },
        onMenuMakeProjectFiles : operateOnSelectedFiles("make_project_files"),
        onMenuMakeLibraryFiles : operateOnSelectedFiles("make_library_files"),
        onMenuUnregisterFiles  : operateOnSelectedFiles("unregister_files"),
        onMenuDeleteFiles      : operateOnSelectedFiles("delete_files"),
    });

    function getSelectedFiles() {
        return [].slice.call($("#content .file-checkbox:checked").map(function(){
            return $(this).val();
        }));
    };

    function operateOnSelectedFiles(how) {
        var ops = {
            make_project_files: {
                shortDesc: "Make project files",
                confirm: "Mark ${ this.count => plural([ 'NO', 'one file', '# files' ]) } as “project ${ this.count => plural([ 0, 'file', 'files' ]) }”?"
            },
            make_library_files: {
                shortDesc: "Make library files",
                confirm: "Mark ${ this.count => plural([ 'NO', 'one file', '# files' ]) } as “library ${ this.count => plural([ 0, 'file', 'files' ]) }”?"
            },
            unregister_files: {
                shortDesc: "Remove files",
                confirm: "Unregister ${ this.count => plural([ 'NO', 'one file', '# files' ]) }?<br />The ${ this.count => plural([ 0, 'file', 'files' ]) } will not be removed from the project directory."
            },
            delete_files: {
                shortDesc: "Delete files",
                confirm: "Delete ${ this.count => plural([ 'NO', 'one file', '# files' ]) }?<br />The ${ this.count => plural([ 0, 'file', 'files' ]) } will be removed from the disk too!"
            }
        };
        var confirmation = ops[how].confirm;
        if (confirmation)
            confirmation = TMPL.compile(confirmation);
        function doit(proj, file_names) {
            RPC.call("project/operate-on-files", proj.id, how, file_names, function(ret, err){
                projectRefreshContent(proj.id);
            });
        }
        return function() {
            withSelectedProject(function(proj){
                var sel = getSelectedFiles();
                if (sel.length == 0) {
                    showMessage("No files selected");
                    return;
                }
                if (confirmation) {
                    areYouSure({
                        icon: "icon-question",
                        shortDesc: ops[how].shortDesc,
                        htmlMessage: confirmation({ count: sel.length }),
                    }, function(ok){
                        if (ok) doit(proj, sel);
                    });
                } else {
                    doit(proj, sel);
                }
            });
        }
    }

    kendo.bind($("#top-layout"), model);
    var top_layout = $("#top-layout").data("kendoLayoutManager");
    $(window).resize(function(){
        top_layout.setOuterSize($(window).innerWidth(),
                                $(window).innerHeight());
    });

    $("#project-list").kendoListView({
        dataSource : PROJECTS,
        selectable : true,
        template   : getTemplate("simple-list-item-projects"),
        change     : function(ev) {
            var proj = this.select().attr("value");
            if (proj) {
                setActiveProject(proj);
                RPC("config/set-active-project", proj);
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
    $("#btn-project-import").click(function(){
        filePicker(SERVER_CONFIG.projects_dir, {
            infoText: "Select existing project directory",
            dirsonly: true
        }, function(fp){
            if (fp) RPC.call("fs/stat", [ path_join(fp.path, "bootstrapper.json") ], function(stat, err){
                stat = stat[0];
                if (stat.error) {
                    editIncludedFiles({
                        path: fp.path
                    }, function(rules){
                        if (rules) RPC.call("project/import-project", {
                            import_rules : rules,
                            path         : fp.path,
                        }, function(ret, err){
                            if (err) {
                                console.log(err);
                                showMessage({ class: "error", message: err.msg });
                                return;
                            }
                            fp.dlg.close();
                        });
                    });
                } else {
                    RPC.call("project/import-bootstrapper-project", fp.path, function(ret, err){
                        if (err) {
                            console.log(err);
                            showMessage({ class: "error", message: err.msg });
                            return;
                        }
                        // nothing to do here, the project should be
                        // already shown in the list via a
                        // notification from the server.
                        fp.dlg.close();
                    });
                }
            });
        });
    });
    $("#btn-project-delete").click(function(){
        withSelectedProject(function(proj){
            areYouSure({
                icon: "icon-warning",
                shortDesc: "Remove project “" + htmlescape(proj.name) + "”",
                htmlMessage: ("Are you sure you want to unregister this project?<br />" +
                              "The files will not be deleted from disk."),
                okLabel: "Yes",
                cancelLabel: "No"
            }, function(ok){
                if (ok) {
                    RPC.call("project/unregister", proj.id);
                }
            });
        });
    });

    RPC.call("kdoc/get-all-docs", function(components){
        var widgets = [];
        for (var i in components) {
            widgets.push({
                name : components[i].name.replace(/^kendo\./, ""),
                id   : i
            });
        }
        model.apidoc = new kendo.data.DataSource({
            data: widgets,
            sort: { field: "name", dir: "asc" }
        });
        model.apidoc_lv = $("#apidoc-list").kendoListView({
            template   : getTemplate("simple-list-item-api"),
            dataSource : model.apidoc,
            selectable : true,
            change     : function(ev) {
                var item = ev.sender.select();
                var id = item.attr("value");
                var comp = components[id];
                docBrowserDialog.open_comp(comp);
            }
        }).data("kendoListView");
        docBrowserDialog.setup(components);
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
        var file = $(this).attr("file-id");
        projectEditFileDependencies(proj, file);
        ev.preventDefault();
    }).on("click", "[command=props-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("file-id");
        projectFilePropsDialog(proj, file);
        ev.preventDefault();
    }).on("click", "[command=delete-file]", function(ev){
        var proj = $(this).attr("project-id");
        var file = $(this).attr("filename");
        areYouSure({
            icon        : "icon-warning",
            shortDesc   : "Delete file “" + file + "”",
            htmlMessage : "Are you sure you want to delete this file?<br />It will be removed from the disk too!",
            okLabel     : "Yes",
            cancelLabel : "No",
        }, function(ok){
            if (ok) RPC.call("project/delete-file", proj, file);
        });
        ev.preventDefault();
    }).on("click", ".input-with-clear-button .clear-button", function(){
        $(this).parent().find("input").val("").trigger("change");
    });
    $(window).focus(function(){
        if (ACTIVE_PROJECT) {
            projectRefreshContent(ACTIVE_PROJECT);
        }
    });

    $(window).resize();
    $(window).resize();         // funny?

    $("#top-layout").kendoTooltip({ filter: "[title]" });
}

var docBrowserDialog = (function(){
    var COMPS;
    function setup(comps) {
        COMPS = comps;
    }
    function parse_anchor(anchor) {
        var m = /^(.*?)(-(.*))?$/.exec(anchor);
        var section = m[1];
        if (section == "configuration")
            section = "config";
        var ret = {
            section : section,
        };
        if (m[3]) ret.prop = m[3].split(".");
        return ret;
    }
    function link_target(comp, anchor) {
        anchor = parse_anchor(anchor);
        var bag = comp[anchor.section];
        for (var i = 0; i < bag.length; ++i) {
            var prop = bag[i];
            if (prop.name == anchor.prop[0]) {
                if (anchor.prop.length == 1) {
                    return {
                        comp    : comp,
                        section : anchor.section,
                        prop    : prop,
                    };
                }
                anchor.prop.shift();
                bag = prop.sub;
                i = 0;
            }
        }
    }
    function open_link(url) {
        if (/^(https?:)?\/\//i.test(url)) {
            window.open(url, "KENDODOC");
            return;
        }
        var m = /^(.*?)(#(.*))?$/.exec(url);
        var file = m[1];
        var anchor = m[3];
        var comp = null;
        if (file) {
            file += ".md";
            for (var i in COMPS) {
                var c = COMPS[i];
                if (c.file.substr(-file.length) == file) {
                    comp = c;
                    break;
                }
            }
        }
        if (!comp && !anchor) {
            open_link("http://docs.kendoui.com" + url);
        }
        if (!comp) comp = current_comp;
        open_comp(comp, anchor);
    }
    var current_comp, prevUndo = false;
    function open_comp(comp, target, isUndo) {
        get_dlg();
        var content = $(".docbrowser-content", DLG_EL);
        var h = {
            comp: comp,
        }, q;
        if (history.now) {
            history.now.pos = content.scrollTop();
            if (!isUndo) {
                history.unshift(history.now);
            }
        }
        history.now = h;
        prevUndo = isUndo;
        if (current_comp !== comp) {
            current_comp = comp;
            content.html(jsonml_to_html(comp.doc, comp.refs));
            $(".docbrowser-index", DLG_EL).html(
                TMPL.process("docbrowser_index", comp, [ comp ])
            );
            DLG.title("Kendo API — " + current_comp.name);
        }
        if (isUndo) {
            content.scrollTop(target);
        } else {
            if (target) {
                var el = $("[name='" + target + "']", content);
                el[0].scrollIntoView();
            }
        }
    }
    var DLG = null;
    var DLG_EL = null;
    var history = [];
    function get_dlg() {
        if (!DLG) {
            DLG_EL = $("<div></div>").html(getTemplate("docbrowser-dialog")({
                closeLabel: "close"
            })).kendoWindow({
                title: "Kendo UI — API Documentation",
                width: "90%",
                height: 500,
                resize: function() {
                    var sz = this.getInnerSize();
                    lm.setOuterSize(sz.x, sz.y);
                },
            }).on("click", ".btn-ok", function(){
                DLG.close();
            }).on("click", "a", function(ev){
                try {
                    open_link($(ev.target).attr("href"));
                } catch (ex) {
                    console.log(ex);
                    console.log(ex.stack);
                }
                ev.preventDefault();
            });
            kendo.bind(DLG_EL, {
                onOnlineDocs: function() {
                    var url = "http://docs.kendoui.com/" + current_comp.file
                        .substr(current_comp.file.lastIndexOf("api/"))
                        .replace(/\.md$/i, "");
                    window.open(url, "KENDODOC");
                },
                onHistoryPrev: function() {
                    if (history.now) {
                        history.push(history.now);
                        var h = history.shift();
                        open_comp(h.comp, h.pos, true);
                    }
                },
                onHistoryNext: function() {
                    if (history.now) {
                        history.unshift(history.now);
                        var h = history.pop();
                        open_comp(h.comp, h.pos, true);
                    }
                }
            });
            var lm = $(".layout", DLG_EL).data("kendoLayoutManager");
            DLG = DLG_EL.data("kendoWindow");
            DLG.open();
            DLG.center();
            DLG.trigger("resize");
        }
        DLG.open();
    }
    return {
        open_comp : open_comp,
        setup     : setup
    };
})();

function projectFileLink(proj, path) {
    return "/@proj/" + proj.id + "/" + path.replace(/^\/+/, "");
}

var ACTIVE_PROJECT = null;

function FILE_SELECTION() {
    var proj = PROJECTS.get(ACTIVE_PROJECT);
    return proj.FILE_SELECTION || (proj.FILE_SELECTION = {});
}

function setActiveProject(proj) {
    if (typeof proj != "object")
        proj = PROJECTS.get(proj);
    $("#file-filter").val("");
    ACTIVE_PROJECT = proj.id;
    $(".project-title").html(proj.name);
    projectRefreshContent(proj.id);
}

function projectRefreshContent(proj_id) {
    var proj = PROJECTS.get(proj_id);
    RPC.call("project/file-info", proj_id, function(ret, err){
        if (!err) {
            proj.files = ret.files;
            drawContent(proj, ret.stats);
        }
    });
}

function filesByType(files, query) {
    var hash = {};
    if (query) query = query.globToRegexp();
    function matches(f) {
        if (!query) return true;
        return query.test(f.name);
    }
    files.forEach(function(f){
        if (matches(f)) {
            var a = hash[f.type] || (hash[f.type] = []);
            a.push(f);
        }
    });
    return hash;
}

function drawContent(proj, data) {
    RPC.call("project/get-preview-url", proj.id, function(preview_url, err){
        // fill the #content div with project details
        var file_info = {};
        data.forEach(function(f){
            file_info[f.rel] = f;
        });
        var el = $("#content").html(getTemplate("project-view")({
            id           : proj.id,
            project_name : proj.name,
            files        : filesByType(proj.files, $("#file-filter").val()),
            file_info    : file_info,
            make_link    : function(path) {
                return projectFileLink(proj, path);
            },
            is_selected  : function(file) {
                return FILE_SELECTION()["$" + file.name];
            },
            preview_url  : preview_url
        })).children();
        kendo.bind(el, {
            onFileCheckboxClick: function(ev) {
                var input = ev.target;
                if (input.checked) {
                    FILE_SELECTION()["$" + input.value] = true;
                } else {
                    delete FILE_SELECTION()["$" + input.value];
                }
            }
        });
        new QRCode("qrcode", {
            text: preview_url,
            width: 160,
            height: 160,
            colorDark : "#000000",
            colorLight : "#ffffff",
        })
        $(window).resize();
    });
}

function showBuildErrors(proj_id, title, errors, refreshcmd) {
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

    if (refreshcmd) {
        var onFileChangeListener = function(f) {
            if (f.proj_id == proj_id) {
                if (errors.find(function(r){ return r.filename == f.filename })) {
                    RPC(refreshcmd, proj_id, function(results, err){
                        if (results.length > 0) {
                            errors = results;
                            $(".build-errors", dlg_el).replaceWith(TMPL.process("build_errors_list", {
                                proj_id : proj_id,
                                errors  : errors
                            }));
                        } else {
                            dlg.close();
                            showMessage("No warnings. :-)");
                        }
                    });
                }
            }
        };
        RPC.listen("fswatch", onFileChangeListener);
        dlg.bind("close", function(){
            RPC.unlisten("fswatch", onFileChangeListener);
        });
    }
}

function rebuildProject(proj, callback) {
    RPC.call("project/rebuild-all", proj.id, function(ret, err){
        if (err && err instanceof Array) {
            showBuildErrors(proj.id, "Build errors", err);
            if (callback) callback(null, true);
        }
        else {
            drawContent(proj, ret.stats);
            if (callback) callback(ret, false);
        }
    });
}

function projectLintJavaScript(proj) {
    RPC.call("project/lint-javascript", proj.id, function(results, err){
        if (results.length > 0) {
            showBuildErrors(proj.id, "JSHint warnings", results, "project/lint-javascript");
        } else {
            showMessage("No warnings. :-)");
        }
    });
}

function projectLintKendo(proj) {
    RPC.call("project/lint-kendo", proj.id, function(results, err){
        if (results.length > 0) {
            showBuildErrors(proj.id, "Kendo Lint warnings", results, "project/lint-kendo");
        } else {
            showMessage("No warnings. :-)");
        }
    });
}

function projectAddRemoteFile(proj) {
    var tmpl = getTemplate("add-remote-file-dialog");
    var tmp = $("<div></div>").html(tmpl({ mvvm: true }));
    var dlg_el = tmp.children()[0];
    var model = kendo.observable({
        libraries: [
            { name: "---", id: "", url: "", file: "" },
            { name: "jQuery", id: "jquery", file: "jquery.js", url: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js" },
            { name: "Angular JS", id: "angular", file: "angular.js", url: "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.3/angular.min.js" },
            { name: "Underscore", id: "underscore", file: "underscore.js", url: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js" },
        ],
        library: null,
        onLibraryChange: function(ev) {
            var lib = model.libraries.find(function(l){
                return l.id == ev.sender.value();
            });
            model.set("url", lib.url);
            model.set("filename", lib.file ? "libs/" + lib.file : "");
            model.set("download", !!lib.file);
            model.set("id", lib.id);
        },
        onCancel: function() {
            dlg.close();
        },
        onOK: function() {
            var opts = {
                filename : model.filename,
                library  : true,
                remote   : true,
                url      : model.url,
                download : model.download
            };
            RPC.call("fs/stat", [ path_join(proj.path, opts.filename || "") ], function(ret){
                var stat = ret[0];
                if (stat.error && stat.error.code == "ENOENT") {
                    RPC.call("project/add-file", proj.id, opts, function(file, err){
                        if (err) {
                            console.log(err);
                            showMessage({ class: "error", message: err });
                            return;
                        }
                        projectRefreshContent(proj.id);
                        projectFilePropsDialog(proj.id, file.id);
                        dlg.close();
                    });
                } else {
                    showMessage("File " + opts.filename + " already exists in the project directory.\nPlease chose another local name for this library.");
                }
            });
        }
    });
    kendo.bind(dlg_el, model);
    var dlg = $(dlg_el).data("kendoWindow");
    dlg.open();
    dlg.center();
}

function projectAddFile(proj) {
    filePicker(proj.path, {
        proj: proj,
        moreButtons: [
            {
                label: "Add remote file",
                handler: function(ev, dlg) {
                    projectAddRemoteFile(proj);
                    dlg.close();
                }
            }
        ],
        infoText: "<b>Add project file.</b>  If the file already exists, select it.  Otherwise enter the target directory and type a new file name in the text field below.  To load a remote file use the “Remote” button."
    }, function(filepicker){
        if (filepicker) {
            var filename = path_join(filepicker.path, filepicker.name);
            var relative = path_relative(filename, proj.path);
            // XXX: check/warn/error if it's outside the project directory?
            RPC.call("fs/stat", [ filename ], function(ret, err){
                function addFile() {
                    RPC.call("project/add-file", proj.id, {
                        filename: relative
                    }, function(file, err){
                        if (err) {
                            console.log(err);
                            showMessage({ class: "error", message: err });
                            return;
                        }
                        projectRefreshContent(proj.id);
                        projectFilePropsDialog(proj.id, file.id);
                        filepicker.dlg.close();
                    });
                }
                var stat = ret[0];
                if (stat.error) {
                    if (stat.error.code == "ENOENT") {
                        // file not found
                        addFile();
                    } else {
                        console.log(stat.error);
                        showMessage({ class: "error", message: "An error has occurred\n\n" + JSON.stringify(stat.error, null, 2) });
                    }
                } else {
                    // existing file
                    addFile();
                }
            });
        }
    });
};

function projectConfig(proj) {
    var tmpl = getTemplate("project-config-dlg");
    var tmp = $("<div></div>").html(tmpl({ mvvm: true }));
    var dlg_el = tmp.children()[0];
    if (!proj.config) {
        proj.config = {};
    }
    var model = kendo.observable({
        f_onsave_jshint         : proj.config.onsave_jshint,
        f_onsave_klint          : proj.config.onsave_klint,
        f_onsave_compile        : proj.config.onsave_compile,
        f_preview_themebuilder  : proj.config.preview_themebuilder,

        dlgResize: function(ev) {
            var sz = dlg.getInnerSize();
            top_layout.setOuterSize(sz.x, sz.y);
        },
        onCancel: function() {
            dlg.close()
        },
        onOK: function() {
            var config = {
                onsave_jshint         : model.f_onsave_jshint,
                onsave_klint          : model.f_onsave_klint,
                onsave_compile        : model.f_onsave_compile,
                preview_themebuilder  : model.f_preview_themebuilder,
            };
            RPC("project/save-config", proj.id, config, function(ret, err){
                if (!err) {
                    proj.config = config;
                    dlg.close();
                }
            });
        }
    });
    kendo.bind(dlg_el, model);
    var dlg = $(dlg_el).data("kendoWindow");
    var top_layout = $(".layout", dlg_el).data("kendoLayoutManager");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");
};

function projectFilePropsDialog(proj_id, file_id) {
    var proj = PROJECTS.get(proj_id);
    var file = getProjectFileById(proj, file_id);
    var tmpl = getTemplate("fileprops-dialog");
    var html = tmpl({
        mvvm: true
    });
    var tmp = $("<div></div>").html(html);
    var dlg_el = tmp.children()[0];
    var model = kendo.observable({
        f_name      : file.name,
        f_type      : file.type,
        f_lib       : file.lib,
        f_page      : file.page,
        f_url       : file.url,
        f_remote    : file.remote,
        f_download  : file.download,

        onCancel : function() {
            dlg.close();
        },
        onOK: function() {
            RPC.call("project/set-file-props", proj.id, file.name, {
                name     : model.f_name,
                type     : model.f_type,
                lib      : model.f_lib,
                page     : model.f_page,
                url      : model.f_url,
                remote   : model.f_remote,
                download : model.f_download,
            }, function(ret){
                projectRefreshContent(proj.id);
                dlg.close();
            });
        }
    });
    kendo.bind(dlg_el, model);
    var dlg = $(dlg_el).data("kendoWindow");
    dlg.open();
    dlg.center();
};

function projectNew() {
    RPC.call("project-templates/get-list", function(templates) {
        var timeout = null;
        var dest = SERVER_CONFIG.projects_dir.replace(/\/+$/, "");
        var dlg_el = $("<div></div>").html(getTemplate("new-project-dialog")({
            destination: dest
        })).kendoWindow({
            title: "Create new project",
            modal: true
        }).on("click", ".btn-ok", function(){
            var args = {
                id           : $("input[name=id]"        , dlg_el).val(),
                name         : $("input[name=name]"      , dlg_el).val(),
                path         : $("input[name=path]"      , dlg_el).val(),
                confirm      : $("input[name=confirm]"   , dlg_el).prop("checked"),
                requirejs    : $("input[name=requirejs]" , dlg_el).prop("checked"),
                template_id  : model.template_id,
            };
            RPC.call("project/bootstrap", args, function(data, err){
                if (err) {
                    if (err == "NOTEMPTY") {
                        $(".confirm", dlg_el).fadeIn();
                        return;
                    }
                    console.log(err);
                    showMessage({ class: "error", message: err.msg });
                    return;
                }
                dlg.close();
                $("#project-list").data("kendoListView").select("#project-list [value=" + args.id + "]"); // ;-(
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
        var default_template = (SERVER_CONFIG.kendo_all ? "default-all"
                                : SERVER_CONFIG.kendo_web ? "default-web"
                                : SERVER_CONFIG.kendo_mobile ? "default-mobile"
                                : null);
        var model = kendo.observable({
            template_id: default_template,
            templates: templates,
            onBrowse: function() {
                var input = $("input[name=path]", dlg_el);
                filePicker(input.val(), {
                    dirsonly: true,
                    newFolder: true,
                    infoText: "Enter the directory where you want to bootstrap the new project.  Create it if it doesn't exist.",
                }, function(ret){
                    if (ret) {
                        // XXX: need to check if empty folder.  Otherwise suggest "import project".
                        input.val(path_join(ret.path, ret.name));
                        manually_changed_path = true;
                        ret.dlg.close();
                    }
                });
            }
        });
        kendo.bind(dlg_el, model);
        var dlg = dlg_el.data("kendoWindow");
        dlg.open();
        dlg.center();
    });
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
            showMessage({ class: "error", message: err.msg });
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
            okLabel    : "Build!",
            kvariant   : proj.use_kendo,
        })).kendoWindow({
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
                detected    : detected,
                selected    : user_selection,
                update_deps : $("input[name=\"update-deps\"]", dlg_el).prop("checked"),
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
            var dlg_el = $("<div></div>").html(getTemplate("build-distro-dialog")({

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
        width  : 900,
        height : 500,
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
    }).on("click", ".btn-move-up", function(){
        deps_select.moveUp();
    }).on("click", ".btn-move-down", function(){
        deps_select.moveDown();
    });
    var the_deps = projectGetDepsHash(proj);
    var deps_select = $(".deps-select", dlg_el).kendoMultiPicker({
        textField  : "name",
        valueField : "id",
        sort       : "type",
        choices    : proj.files.filter(function(f){ return f !== file && !f.drop }),
        value      : the_deps[file_id],
        change     : function(ev) {
            the_deps[file_id] = ev.value;
            var btns = $(".move-buttons", dlg_el);
            if (ev.selection.length > 0) {
                btns.show();
            } else {
                btns.hide();
            }
            updateDepsPreview();
        }
    }).data("kendoMultiPicker");
    var lm = $(".project-deps-dialog", dlg_el);
    kendo.bind(lm);
    var lm = lm.data("kendoLayoutManager");
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");

    function updateDepsPreview() {
        var el = $(".deps-graph", dlg_el);
        var deps = the_deps[file_id];
        var args = {
            proj : proj,
            file : file,
            deps : the_deps
        };
        el.html(TMPL.process("draw_file_deps", args));
    }

    updateDepsPreview();
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
        dataSource : {
            data: proj.files.filter(function(f){ return !f.drop }),
        },
        selectable : true,
        template   : getTemplate("simple-list-item"),
        change     : function(ev) {
            var id = this.select().attr("value");
            if (!id) {
                return;
            }
            selected_file = getProjectFileById(proj, id);
            $(".deps .title", dlg_el).html(
                "Select below direct dependencies of <b>" + htmlescape(selected_file.name) + "</b>"
            );
            var deps = [].slice.call(the_deps[selected_file.id] || []);
            deps_select.reset(proj.files.filter(function(f){
                return f !== selected_file && !f.drop;
            }), deps);
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

////// Console

function consoleAddMessage(msg) {
    var cs = $("#console");
    var el = $(getTemplate("console-message")(msg));
    cs.append(el);
    el.get(0).scrollIntoView();
}

function areYouSure(options, callback) {
    if (options.okSecondary === undefined) options.okSecondary = true;
    var dlg_el = $("<div></div>").html(getTemplate("confirm-dialog")(options)).kendoWindow({
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

function optimizeImages(proj) {
    RPC.call("project/optimize-images", proj.id);
}

function darwin_selectEditorApp(cont) {
    RPC("platform/darwin-list-code-editors", function(editors){
        var dlg_el = $("<div></div>").html(getTemplate("darwin-select-editor-dlg")({
            mvvm: true
        })).children().first();
        var model = kendo.observable({
            editors: editors,

            onOK: function() {
                select();
            },
            onCancel: function() {
                dlg.close();
                cont(null);
            },
            dlgResize: function() {
                var sz = dlg.getInnerSize();
                top_layout.setOuterSize(sz.x, sz.y);
                grid._setContentHeight();
            }
        });
        kendo.bind(dlg_el, model);
        var dlg = dlg_el.data("kendoWindow");
        var top_layout = $(".layout", dlg_el).data("kendoLayoutManager");
        var grid = $("[data-role=\"grid\"]", dlg_el)
            .on("dblclick", "tr.k-state-selected", select)
            .data("kendoGrid");
        dlg.open();
        dlg.center();
        dlg.trigger("resize");

        function select() {
            var attr = grid.select().attr(kendo.attr("uid"));
            if (attr) {
                var item = grid.dataSource.getByUid(attr);
                cont(item);
                dlg.close();
            } else {
                showMessage({ class: "error", message: "Nothing selected" });
            }
        }
    });
}

function bootstrapperSettingsDialog() {
    var is_darwin = SERVER_CONFIG.platform == "darwin";
    var dlg_el = $("<div></div>").html(getTemplate("bootstrapper-settings-dialog")({
        mvvm: true,
    })).children().first();
    var editor = SERVER_CONFIG.editor, editor_cmd1 = "{file}", editor_cmd2 = "{file}", editor_cmd3 = "{file}";
    if (!is_darwin && editor && editor.args) {
        if (editor.args.cmd1) editor_cmd1 = editor.args.cmd1.join(" ");
        if (editor.args.cmd2) editor_cmd2 = editor.args.cmd2.join(" ");
        if (editor.args.cmd3) editor_cmd3 = editor.args.cmd3.join(" ");
    }
    var model = kendo.observable({
        editor: is_darwin ? editor : {
            path: editor ? editor.path : "",
            args: {
                cmd1: editor_cmd1,
                cmd2: editor_cmd2,
                cmd3: editor_cmd3,
            },
        },
        kendo_src_dir: SERVER_CONFIG.kendo_src_dir,
        onBrowseEditor: function() {
            filePicker(path_dirname(model.editor.path), {}, function(ret){
                if (ret) {
                    model.set("editor.path", path_join(ret.path, ret.name));
                    ret.dlg.close();
                }
            });
        },
        onBrowseEditorDarwin: function() {
            darwin_selectEditorApp(function(editor){
                model.set("editor.name", editor.name);
            });
        },
        onBrowseKendoSrc: function() {
            filePicker(model.kendo_src_dir, {
                dirsonly: true,
                infoText: "Select path to Kendo UI source directory:"
            }, function(ret){
                if (ret) {
                    model.set("kendo_src_dir", ret.path);
                    ret.dlg.close();
                }
            });
        },
        onOK: SERVER_CONFIG.platform == "darwin" ? saveDarwin : savePC,
        onCancel: function() {
            dlg.close();
        }
    });
    function saveDarwin() {
        saveSettings({
            editor: {
                name: model.editor.name
            }
        });
    }
    function savePC() {
        var filename = model.editor.path;
        RPC.call("fs/stat", [ filename ], function(stats){
            var stat = stats[0];
            if (stat.error) {
                if (stat.error.code == "ENOENT") {
                    showMessage({ class: "error", message: "File " + filename + " doesn't exist." });
                    return;
                }
                showMessage({ class: "error", message: "There was an error accessing " + filename + ", code: " + stat.error.code });
                return;
            }
            if (stat.isDirectory) {
                showMessage({ class: "error", message: "You selected a directory" });
                return;
            }
            saveSettings({
                editor: {
                    path: filename,
                    args: {
                        cmd1: model.editor.args.cmd1.trim().split(/\s+/),
                        cmd2: model.editor.args.cmd2.trim().split(/\s+/),
                        cmd3: model.editor.args.cmd3.trim().split(/\s+/),
                    }
                }
            });
        });
    }
    function saveSettings(args) {
        RPC.call("config/set-kendo-dir", model.kendo_src_dir, function(accepted, err){
            if (accepted) {
                RPC.call("settings/save", args, function(){
                    dlg.close();
                });
            } else {
                showMessage({ class: "error", message: "Cannot find Kendo UI sources in " + model.kendo_src_dir + "\nPlease try again." });
            }
        });
    }
    kendo.bind(dlg_el, model);
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
}

function editIncludedFiles(args, callback) {
    args = defaults(args, {
        path: null,
        rules: [
            "- node_modules/**",
            "+ /\\.(js|coffee|css|less|html|php|asp|jsp)$/i",
        ].join("\n")
    });
    var dlg_el = $("<div></div>").html(getTemplate("import-project-exclusions-dlg")({
        mvvm: true
    })).children().first();
    var model = kendo.observable({
        rules: args.rules,
        dlgResize: function() {
            var sz = dlg.getInnerSize();
            top_layout.setOuterSize(sz.x, sz.y);
        },
        onPreview: function() {
            RPC.call("project/preview-files-to-import", {
                path: args.path,
                rules: this.rules
            }, function(ret){
                ret = ret.sort(function(a, b){
                    a = a.rel.toLowerCase();
                    b = b.rel.toLowerCase();
                    return a < b ? -1 : a > b ? 1 : 0;
                });
                var html = "<ul>" +
                    ret.map(function(f){ return "<li>" + htmlescape(f.rel) + "</li>" }).join("") +
                    "</ul>";
                $(".preview", dlg_el).html(html);
            });
        },
        onOK: function() {
            dlg.close();
            callback(this.rules);
        },
        onCancel: function() {
            dlg.close();
            callback(null);
        }
    });
    kendo.bind(dlg_el, model);
    var dlg = dlg_el.data("kendoWindow");
    var top_layout = $(".layout", dlg_el).data("kendoLayoutManager");
    dlg.open();
    dlg.center();
    dlg.trigger("resize");
    model.onPreview();
}

function clearConsole() {
    $("#console").html("");
}

function showMessage(args) {
    if (typeof args == "string") {
        args = { message: args };
    }
    var popup = $(getTemplate("notification")(args)).appendTo(document.body);
    (function() {
        popup.addClass("active");
        (function() {
            popup.addClass("hiding");
            (function(){
                popup.remove();
            }.delayed(2000)());
        }.delayed(args.timeout || 3000)());
    }.delayed(1)());
}

function showEndAppDialog() {
    var dlg_el = $("<div></div>").html(getTemplate("server-down-dialog")()).children().first();
    kendo.bind(dlg_el);
    var dlg = dlg_el.data("kendoWindow");
    dlg.open();
    dlg.center();
}





// <File-Picker>

function filePicker(path, options, callback) {
    options = defaults(options, {
        proj        : null,
        moreButtons : null,
        title       : null,
        infoText    : null,
        newFolder   : true,
        filter      : null,
        dirsonly    : false,
        noCancel    : false,
    });
    if (!callback) callback = function(){};
    options.path = path;
    if (options.moreButtons) {
        options.moreButtons.forEach(function(btn, i){
            btn.handler_name = i;
        });
    }
    var tmpl = getTemplate("filepicker-dialog");
    var html = tmpl(options);
    var tmp = $("<div></div>").html(html);
    var dlg_el = tmp.children()[0];
    var model = kendo.observable({
        filelist: [],

        onOK: function() {
            callback({
                path : current_path,
                name : search.val(),
                dlg  : dlg
            });
        },

        onCancel: function() {
            dlg.close();
            callback(null);
        },

        dlgResize: function(ev) {
            var sz = ev.sender.getInnerSize();
            layout.setOuterSize(sz.x, sz.y);
            grid._setContentHeight();
        },

        onNewFolder: function() {
            grid.addRow();
        },

        onBack: function() {
            if (history_pointer > 0) {
                setPath(history[--history_pointer], null, true);
            }
        },

        onUpFolder: function() {
            setPath(current_path, true);
        },

        onGridEdit: function() {
        },

        onGridSave: function(ev) {
            RPC.call("fs/mkdir", current_path, ev.model.rel, function(ret, err){
                if (err) {
                    // XXX: do nicely
                    console.log(err);
                    showMessage(err);
                    return;
                }
                setPath(ret);
            });
        }.delayed(10), // XXX: need the delay, otherwise the model is not populated. :^{

        onGridCancel: function(ev) {
            var row = ev.container.closest("tr");
            grid.removeRow(row);
        },

        onGridChange: function() {
            var attr = grid.select().attr(kendo.attr("uid"));
            var item = grid.dataSource.getByUid(attr);
            click(item);
        }
    });
    if (options.moreButtons) {
        options.moreButtons.forEach(function(btn){
            model["moreButtons_" + btn.handler_name] = function(ev) {
                btn.handler(ev, dlg);
            };
        });
    }
    kendo.bind(dlg_el, model);
    var dlg = $(dlg_el)
        .on("click", ".folder-link", function(ev){
            var path = $(this).attr("path");
            setPath(path);
            ev.preventDefault();
        })
        .data("kendoWindow");
    var layout = $(".layout", dlg_el).data("kendoLayoutManager");
    var search = $("input.search", dlg_el).keydown(function(ev){
        updateSearch.cancel()(ev.keyCode);
    });
    var grid = $(".filesystem-grid", dlg_el)
        .on("dblclick", "tr.k-state-selected", function(){
            var attr = grid.select().attr(kendo.attr("uid"));
            var item = grid.dataSource.getByUid(attr);
            dblClick(item);
        })
        .data("kendoGrid");

    dlg.open();
    dlg.center();
    dlg.trigger("resize");

    var updateSearch = function(key) {
        if (key == kendo.keys.ESC) search.val("");
        var query = search.val().trim();
        if (!query) {
            grid.dataSource.filter(null);
            return;
        }
        grid.dataSource.filter({ field: "name", operator: "startswith", value: query });
    }.delayed(300);

    var current_path;
    var history = [];
    var history_pointer = 0;

    function makePathLink(path) {
        var parts = path.replace(/[\/\\]+$/, "").split(/[\/\\]+/), prefix = [];
        function one(path, part) {
            return "<a class='folder-link' href='#' path='" + htmlescape(path) + "'>" +
                htmlescape(part) +
                "</a>" + SERVER_CONFIG.pathsep;
        };
        var x = parts.map(function(part){
            prefix.push(part);
            return one(prefix.join(SERVER_CONFIG.pathsep), part);
        });
        if (SERVER_CONFIG.windows) {
            x[0] = one(parts[0] + "\\", parts[0]);
            x.unshift(one("//", "Drive"));
        } else {
            x[0] = one("/", "ROOT");
        }
        return x.join("");
    };

    function setPath(path, parent, isUndo) {
        search.val("");
        RPC.call("fs/readdir", path, {
            dirsonly : options.dirsonly,
            filter   : options.filter,
            parent   : parent
        }, function(ret, err){
            if (err) {
                if (path != "~") {
                    return setPath("~");
                }
                console.log(err);
                showMessage({
                    class: "error",
                    message: "Error reading the directory. Check the JS console.",
                });
            }
            current_path = ret.path;
            if (history[history.length - 1] != current_path)
                history.push(current_path);
            if (!isUndo)
                history_pointer = history.length - 1;
            $(".current-path", dlg_el).html(makePathLink(current_path));
            var data = ret.list;
            data.sort(select_file.compare_name);
            grid.setDataSource(new kendo.data.DataSource({ data: data }));
            dlg.trigger("resize");
        });
    };

    function dblClick(item) {
        if (item.isDirectory) {
            setPath(item.full);
            return;
        }
        search.val(item.rel);
        setTimeout(function(){
            model.onOK();
        }, 10);
    };

    function click(item) {
        search.val(item.rel);
    };

    setPath(path);
};

// XXX: temporary hacks, hopefully, for the file picker.

var select_file = {};

function formatFileSize(sz, fixed) {
    sz = parseFloat(sz);
    var K = 1024, M = 1024 * K, G = 1024 * M, T = 1024 * G;
    var spec = "b";
    if (sz < K);
    else if (sz < M) sz /= K, spec = "K";
    else if (sz < G) sz /= M, spec = "M";
    else if (sz < T) sz /= G, spec = "G";
    if (fixed && sz != Math.round(sz)) return sz.toFixed(fixed) + spec;
    return Math.round(sz) + spec;
};

select_file.template_stat_size = function(item) {
    if (!item.stat) return "--NEW--";
    if (item.isDirectory) {
        return "";
    }
    return formatFileSize(item.stat.size) + "";
};

select_file.template_name = function(item) {
    if (!item.name) return "--NEW--";
    var cls = [];
    if (item.isDirectory) {
        cls.push("icon-folder bigger-icon");
    }
    return "<span class='" + cls.join(" ") + "'>" + htmlescape(item.name) + "</span>";
};

select_file.compare_name = function(a, b, rev) {
    if (a.isDirectory && !b.isDirectory) return rev ? 1 : -1;
    if (b.isDirectory && !a.isDirectory) return rev ? -1 : 1;
    a = a.rel.toLowerCase();
    b = b.rel.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
};

select_file.compare_stat_size = function(a, b, rev) {
    if (a.isDirectory) return rev ? -1 : 1;
    if (b.isDirectory) return rev ? 1 : -1;
    return a.stat.size - b.stat.size;
};

// </File-Picker>

window.open('', '_self', '');   // window.close() magically works after this O_O
