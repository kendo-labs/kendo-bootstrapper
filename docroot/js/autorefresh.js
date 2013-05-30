(function(){
    function is_this_page(name) {
        return name == __THIS_PAGE__.name;
    }

    function is_dependency(name) {
        var a = __THIS_PAGE_FILES__;
        for (var i = a.length; --i >= 0;) {
            if (a[i].name == name)
                return true;
        }
    }

    RPC.listen("fswatch", function(msg){
        if (is_this_page(msg.filename)) {
            window.location.reload(true);
            return; //?
        }
        if (!is_dependency(msg.filename))
            return;
        if (msg.file_type == "less") {
            less.refresh();
        }
        else if (msg.file_type == "css") {
            $("link[rel=\"stylesheet\"]").each(function(){
                this.href = this.href.replace(/\?.*$/, "") + "?" + Date.now();
            });
        }
        else {
            window.location.reload(true);
        }
    });
}());
