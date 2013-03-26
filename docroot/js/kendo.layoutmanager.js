(function($, kendo){

    var ui = kendo.ui;
    var Widget = ui.Widget;

    function resizeWidget(widget, width, height) {
        if (typeof widget.setOuterSize == "function") {
            return widget.setOuterSize(width, height);
        }
        var el = widget.element;
        el.css("width", width + "px");
        el.css("height", height + "px");
    }

    function reposWidget(widget, left, top) {
        if (typeof widget.setPosition == "function") {
            return widget.setPosition(top, left);
        }
        var el = widget.element;
        el.css("left", parseFloat(left) + "px");
        el.css("top", parseFloat(top) + "px");
    }

    function getWidget(x) {
        return x[0];
    }

    function getFill(x) {
        var fill = x[1];
        if (fill == "null")
            return { type: "fixed" };
        if (typeof fill == "number")
            return { type: "fixed", fill: fill };
        if (/\%$/.test(fill))
            return { type: "percent", fill: parseInt(fill, 10) };
        return { type: "fraction", fill: parseFloat(fill) };
    }

    var LayoutManager = Widget.extend({
        options: {
            name        : "LayoutManager",
            orientation : "horizontal",
            widgets     : null
        },
        events: [ "resize" ],
        init: function(element, options) {
            var self = this;
            Widget.fn.init.call(self, element, options);
            options.widgets.forEach(function(w){
                self.element.append(w[0].element);
            });
            self.element.addClass("kendo-layoutmanager");
        },
        update: function() {
            var layout = this._computeLayout(this.element.outerWidth(),
                                             this.element.outerHeight());
            layout.forEach(function(a){
                var w = a[0], g = a[2];
                reposWidget(w, g.x, g.y);
                resizeWidget(w, g.w, g.h);
            });
        },
        setOuterSize: function(width, height) {
            if (arguments.length == 1) {
                height = width.y;
                width = width.x;
            }
            var el = this.element;
            el.css("width", width + "px");
            el.css("height", height + "px");
            this.update();
        },

        _computeLayout: function(width, height) {
            var self = this;
            var options = self.options;
            var prev_x = 0, prev_y = 0;
            var rem_width = width, rem_height = height;
            var frac_widgets = [];
            var widgets = options.widgets;
            widgets.forEach(function(a){
                var f = getFill(a);
                var widget = getWidget(a);
                var sz;

                if (f.type == "fraction")
                    frac_widgets.push(a);

                sz = f.fill;
                switch (options.orientation) {
                  case "horizontal":
                    if (sz == null) sz = getWidgetSize(widget).x;
                    else if (f.type == "percent") sz = width * f.fill / 100;
                    sz = a[2] = { x: prev_x, y: prev_y, w: sz, h: height };
                    prev_x += sz.w;
                    rem_width -= sz.w;
                    break;
                  case "vertical":
                    if (sz == null) sz = getWidgetSize(widget).y;
                    else if (f.type == "percent") sz = height * f.fill / 100;
                    sz = a[2] = { x: prev_x, y: prev_y, w: width, h: sz };
                    prev_y += sz.h;
                    rem_height -= sz.h;
                    break;
                }
            });
            frac_widgets.forEach(function(a){
                var f = getFill(a);
                switch (options.orientation) {
                  case "horizontal":
                    a[2].w = rem_width * f.fill;
                    break;
                  case "vertical":
                    a[2].h = rem_height * f.fill;
                    break;
                }
            });
            return widgets;
        }
    });

    ui.plugin(LayoutManager);

})(jQuery, window.kendo);

//// XXX: to be moved in kendo.window.js?

kendo.ui.Window.fn.getInnerSize = function() {
    var content = this.wrapper.find(".k-window-content");
    return {
        x: content.width(),
        y: content.height()
    };
};
