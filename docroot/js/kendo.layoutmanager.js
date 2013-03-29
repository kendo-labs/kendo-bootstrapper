(function($, kendo){

    var ui = kendo.ui;
    var Widget = ui.Widget;

    function getWidget(element) {
        return element instanceof Widget ? element
            : element instanceof $ ? (kendo.widgetInstance(element, ui) ||
                                      kendo.widgetInstance(element, kendo.mobile.ui) ||
                                      kendo.widgetInstance(element, kendo.dataviz.ui) ||
                                      new Bogus(element))
            : null;
    }

    function getElement(widget) {
        return widget instanceof $ ? widget
            : widget instanceof Widget ? widget.element
            : typeof widget == "string" ? $(widget)
            : widget;
    }

    function resizeWidget(widget, width, height) {
        if (typeof widget.setOuterSize == "function") {
            return widget.setOuterSize(width, height);
        }
        getElement(widget).css({
            width: width + "px",
            height: height + "px"
        });
    }

    function reposWidget(widget, left, top) {
        if (typeof widget.setPosition == "function") {
            return widget.setPosition(top, left);
        }
        getElement(widget).css({
            left: parseFloat(left) + "px",
            top: parseFloat(top) + "px"
        });
    }

    function getContentSize(widget, axis) {
        var el = getElement(widget);
        if (axis == "x") {
            el.css("width", "");
            return el.outerWidth();
        }
        if (axis == "y") {
            el.css("height", "");
            return el.outerHeight();
        }
    }

    var RX_FILL = /^([0-9.]+)([%f])?((,.*?)*)$/i;

    function getFill(f) {
        if (typeof f == "object") return f;
        if (f == null)
            return { type: "fixed" };
        if (typeof f == "number")
            return { type: "fixed", fill: f };
        var m = RX_FILL.exec(f);
        if (!m) throw new Error("Can't parse layout fill argument: " + f);
        f = {
            type: m[2] == "%" ? "percent" : "fraction",
            fill: parseFloat(m[1])
        };
        m[3].split(/\s*,+\s*/).slice(1).forEach(function(p){
            p = p.split(/\s*[=:]+\s*/);
            f[p[0]] = p.length > 1 ? parseFloat(p[1]) : true;
        });
        return f;
    }

    var LayoutManager = Widget.extend({
        options: {
            name        : "LayoutManager",
            orientation : "horizontal",
            widgets     : null
        },
        init: function(element, options) {
            var self = this;
            Widget.fn.init.call(self, element, options);
            element = self.element;
            options = self.options;
            if (!options.widgets) {
                options.widgets = element.children().get().map(function(el){
                    return [
                        $(el),
                        getFill($(el).attr("kendo-layout"))
                    ];
                });
            }
            else options.widgets.forEach(function(w){
                if (!(w[0] instanceof Widget || w[0] instanceof $)) {
                    // assume ad-hoc layout widget.
                    w[0] = $("<div></div>").kendoLayoutManager(w[0]).data("kendoLayoutManager");
                }
                w[1] = getFill(w[1]);
                self.element.append(w[0].element);
            });
            for (var i = options.widgets.length; --i >= 0;) (function(a, i){
                var f = a[1];
                if (f.resizable) {
                    var bar = $("<div class='kendo-resizebar'></div>");
                    options.widgets.splice(i + 1, 0, [
                        bar,
                        { type: "fixed" }
                    ]);
                    getElement(a[0]).after(bar);
                    new kendo.UserEvents(bar, {
                        global: true,
                        start: function(e) {
                            this.offset = kendo.getOffset(bar);
                            this.size = options.orientation == "horizontal" ? a[2].w : a[2].h;
                        },
                        move: function(e) {
                            var delta;
                            if (options.orientation == "horizontal") {
                                delta = e.x.location - this.offset.left;
                            } else {
                                delta = e.y.location - this.offset.top;
                            }
                            a[1] = {
                                type : "fixed",
                                fill : this.size + delta,
                                min  : f.min,
                                max  : f.max
                            };
                            self.update();
                        }
                    });
                }
            })(options.widgets[i], i);
            self.element.addClass("kendo-layoutmanager " + options.orientation);
        },
        update: function() {
            var layout = this._computeLayout(this.element.outerWidth(),
                                             this.element.outerHeight());
            layout.forEach(function(a){
                var w = a[0], g = a[2];
                w = a[0] = getWidget(w);
                reposWidget(w, g.x, g.y);
                resizeWidget(w, g.w, g.h);
            });
        },
        setOuterSize: function(width, height) {
            this.element.css({
                width: width + "px",
                height: height + "px"
            });
            this.update();
        },

        _computeLayout: function(width, height) {
            var self = this;
            var options = self.options;
            var rem_width = width, rem_height = height;
            var widgets = options.widgets;
            var spacing = options.spacing || 0;
            function limit(f, sz) {
                if (f.min != null && sz < f.min) sz = f.min;
                if (f.max != null && sz > f.max) sz = f.max;
                return sz;
            }
            widgets.forEach(function(a){
                var f = a[1];
                var widget = a[0];
                var sz;

                sz = f.fill;
                if (f.type == "fraction") sz = 0;
                switch (options.orientation) {
                  case "horizontal":
                    if (f.type != "fraction") {
                        if (sz == null) sz = getContentSize(widget, "x");
                        else if (f.type == "percent") sz = width * f.fill / 100;
                        sz = limit(f, sz);
                        rem_width -= sz + spacing;
                    }
                    a[2] = { x: 0, y: 0, w: sz, h: height };
                    break;
                  case "vertical":
                    if (f.type != "fraction") {
                        if (sz == null) sz = getContentSize(widget, "y");
                        else if (f.type == "percent") sz = height * f.fill / 100;
                        sz = limit(f, sz);
                        rem_height -= sz + spacing;
                    }
                    a[2] = { x: 0, y: 0, w: width, h: sz };
                    break;
                }
            });
            var prev_x = 0, prev_y = 0;
            widgets.forEach(function(a){
                var f = a[1];
                switch (options.orientation) {
                  case "horizontal":
                    if (f.type == "fraction") {
                        a[2].w = limit(f, rem_width * f.fill);
                        rem_width -= a[2].w;
                    }
                    a[2].x = prev_x;
                    prev_x += a[2].w + spacing;
                    break;
                  case "vertical":
                    if (f.type == "fraction") {
                        a[2].h = limit(f, rem_height * f.fill);
                        rem_height -= a[2].h;
                    }
                    a[2].y = prev_y;
                    prev_y += a[2].h + spacing;
                    break;
                }
            });
            return widgets;
        }
    });

    ui.plugin(LayoutManager);

    var Bogus = LayoutManager.Bogus = Widget.extend({
        options: { name: "Bogus" }
    });

    //// XXX: to be moved in kendo.window.js?

    ui.Window.fn.getInnerSize = function() {
        var content = this.wrapper.find(".k-window-content");
        return {
            x: content.width(),
            y: content.height()
        };
    };

})(jQuery, window.kendo);
