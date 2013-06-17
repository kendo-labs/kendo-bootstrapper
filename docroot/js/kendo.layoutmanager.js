(function($, kendo){

    var ui = kendo.ui;
    var Widget = ui.Widget;

    function getWidget(element, nocreate) {
        return element instanceof Widget ? element
            : (element instanceof $ ? (kendo.widgetInstance(element, ui) ||
                                       kendo.widgetInstance(element, kendo.mobile.ui) ||
                                       kendo.widgetInstance(element, kendo.dataviz.ui) ||
                                       (nocreate ? null : new Bogus(element)))
               : null);
    }

    function getElement(widget) {
        return widget instanceof $ ? widget
            : widget instanceof Widget ? widget.element
            : typeof widget == "string" ? $(widget)
            : widget;
    }

    function resizeElement(el, width, height) {
        getElement(el).css({
            width: width + "px",
            height: height + "px"
        });
    }

    function resizeWidget(widget, width, height) {
        if (typeof widget.setOuterSize == "function") {
            return widget.setOuterSize(width, height);
        }
        resizeElement(widget, width, height);
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

    var RX_FILL = /^([0-9.]+)([%f]|px)?((,.*?)*)$/i;

    function getFill(f) {
        if (typeof f == "object") return f;
        if (f == null)
            return { type: "fixed", min: 0 };
        if (typeof f == "number")
            return { type: "fixed", fill: f, min: 0 };
        var m = RX_FILL.exec(f);
        if (!m) throw new Error("Can't parse layout fill argument: " + f);
        f = {
            type: m[2] == "%" ? "percent" : m[2] != "px" ? "fraction" : "fixed",
            fill: parseFloat(m[1]) || null
        };
        m[3].split(/\s*,+\s*/).slice(1).forEach(function(p){
            p = p.split(/\s*[=:]+\s*/);
            f[p[0]] = p.length > 1 ? parseFloat(p[1]) : true;
        });
        if (f.min == null) f.min = 0;
        return f;
    }

    var LayoutManager = Widget.extend({
        options: {
            name        : "LayoutManager",
            orientation : "horizontal",
            spacing     : 0,
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
            for (var i = options.widgets.length, first = true; --i >= 0; first = false) (function(a, i, reverse){
                var f = a[1];
                if (f.resizable) {
                    var bar = $("<div class='kendo-resizebar'></div>");
                    options.widgets.splice(i + 1 - reverse, 0, [
                        bar,
                        { type: "fixed" }
                    ]);
                    if (reverse) getElement(a[0]).before(bar);
                    else getElement(a[0]).after(bar);
                    new kendo.UserEvents(bar, {
                        global: true,
                        start: function(e) {
                            this.offset = kendo.getOffset(bar);
                            this.size = options.orientation == "horizontal" ? a[2].w : a[2].h;
                        },
                        press: function() {
                            bar.addClass("k-dragging");
                        },
                        release: function() {
                            bar.removeClass("k-dragging");
                        },
                        end: function() {
                            bar.removeClass("k-dragging");
                        },
                        move: function(e) {
                            var delta;
                            if (options.orientation == "horizontal") {
                                delta = e.x.location - this.offset.left;
                            } else {
                                delta = e.y.location - this.offset.top;
                            }
                            if (reverse) delta = -delta;
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
            })(options.widgets[i], i, first);
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
            resizeElement(this.element, width, height);
            this.update();
        },

        _getPaddings: function() {
            var el = this.element;
            function padding(side) {
                var x = parseFloat(el.css(side));
                return isNaN(x) ? 0 : x;
            }
            return {
                top    : padding("padding-top"),
                right  : padding("padding-right"),
                bottom : padding("padding-bottom"),
                left   : padding("padding-left"),
            };
        },

        _computeLayout: function(width, height) {
            var self = this;
            var padding = self._getPaddings();
            width -= padding.left + padding.right;
            height -= padding.top + padding.bottom;
            var options = self.options;
            var rem_width = width;
            var rem_height = height;
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
                        if (f.after) rem_width -= f.after;
                    }
                    a[2] = { x: padding.left, y: padding.top, w: sz, h: height };
                    break;
                  case "vertical":
                    if (f.type != "fraction") {
                        if (sz == null) sz = getContentSize(widget, "y");
                        else if (f.type == "percent") sz = height * f.fill / 100;
                        sz = limit(f, sz);
                        rem_height -= sz + spacing;
                        if (f.after) rem_height -= f.after;
                    }
                    a[2] = { x: padding.left, y: padding.top, w: width, h: sz };
                    break;
                }
            });
            var prev_x = padding.left, prev_y = padding.top;
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
                    if (f.after) prev_x += f.after;
                    break;
                  case "vertical":
                    if (f.type == "fraction") {
                        a[2].h = limit(f, rem_height * f.fill);
                        rem_height -= a[2].h;
                    }
                    a[2].y = prev_y;
                    prev_y += a[2].h + spacing;
                    if (f.after) prev_y += f.after;
                    break;
                }
            });
            return widgets;
        }
    });

    ui.plugin(LayoutManager);

    var Bogus = LayoutManager.Bogus = Widget.extend({
        options: { name: "Bogus" },
        setOuterSize: function(width, height) {
            var a = this.element.children().get();
            if (a.length == 1) {
                var w = getWidget($(a[0]), true);
                if (w && w.setOuterSize) {
                    w.setOuterSize(width, height);
                }
            }
            resizeElement(this.element, width, height);
        }
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
