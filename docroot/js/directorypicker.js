(function($, kendo){

    var ui = kendo.ui;
    var Widget = ui.Widget;

    var DirectoryPicker = Widget.extend({
        options: {
            name  : "DirectoryPicker",
            value : null
        },
        init: function(element, options) {
            var self = this;
            Widget.fn.init.call(self, element, options);
            element = self.element;
            options = self.options;
            this._value = options.value;
            element.on("click", function(){
                RPC.call("fs/select-directory", self.value(), function(ret, err){
                    if (ret.selected && ret.directory != self.value()) {
                        self.value(ret.directory);
                        self.trigger("change", { value: ret.directory });
                    }
                });
            });
        },
        value: function(v) {
            if (arguments.length > 0) {
                this._value = v;
            }
            return this._value;
        },
        events: [ "change" ],
    });

    ui.plugin(DirectoryPicker);

})(jQuery, window.kendo);
