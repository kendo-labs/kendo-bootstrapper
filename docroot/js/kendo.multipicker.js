(function($, kendo){

    function slice(x, y, z) { return Array.prototype.slice.call(x, y, z) }

    var yajet = new YAJET();
    var itemTemplate = yajet.compile(
        "<div class='item'><input type='checkbox' value='$this.value|html' /> $this.label|html</div>"
    );

    var Widget = kendo.ui.Widget;
    var MultiPicker = Widget.extend({
        options: {
            name           : "MultiPicker",
            choices        : null,
            value          : null,
            valueField     : "value",
            textField      : "label",
            sort           : "label",
            selectedFirst  : true
        },
        events: [ "change" ],
        init: function(element, options) {
            var self = this;
            Widget.fn.init.call(self, element, options);
            self.element
                .addClass("kendo-multipicker")
                .attr("tabIndex", 0)
                .on("change", "input[type=\"checkbox\"]", function(){
                    if (!this.checked) {
                        $(this).parent().removeClass("selected");
                    }
                    self.trigger("change", {
                        value: self.value(),
                        changed: this.value,
                        checked: this.checked,
                        selection: self.element.find("div.selected")
                    });
                }).on("mousedown", "div.item", function(ev){
                    if (/input/i.test(ev.target.tagName)) {
                        return ev.preventDefault();
                    }
                    self.element.find("div.selected").removeClass("selected");
                    $(this).addClass("selected");
                    if (!$(this).find("input").prop("checked")) {
                        $(this).find("input").prop("checked", true);
                    }
                    self.trigger("change", {
                        value: self.value(),
                        selection: self.element.find("div.selected")
                    });
                }).on("keydown", function(ev){
                    switch (ev.keyCode) {
                      case 38:  // UP
                        if (self.moveUp()) ev.preventDefault();
                        break;
                      case 40:  // DOWN
                        if (self.moveDown()) ev.preventDefault();
                        break;
                    }
                });
            self.reset(options.choices, options.value);
        },
        moveUp: function() {
            var sel = this.element.find("div.selected");
            if (sel.length > 0) {
                sel.insertBefore(sel.prev());
                sel.scrollintoview({ duration: 0 });
                this.trigger("change", {
                    value: this.value(),
                    checked: this.checked,
                    selection: this.element.find("div.selected")
                });
                return true;
            }
        },
        moveDown: function() {
            var sel = this.element.find("div.selected");
            if (sel.length > 0) {
                sel.insertAfter(sel.next());
                sel.scrollintoview({ duration: 0 });
                this.trigger("change", {
                    value: this.value(),
                    checked: this.checked,
                    selection: this.element.find("div.selected")
                });
                return true;
            }
        },
        reset: function(choices, value) {
            if (!choices) choices = [];
            if (!value) value = [];
            var o = this.options;
            choices = o.choices = this._sort(choices, value);
            this.element.html(choices.map(function(item){
                return itemTemplate({
                    item  : item,
                    label : item[o.textField],
                    value : item[o.valueField]
                });
            }).join(""));
            this.setValue(value);
        },
        value: function(newValue) {
            if (arguments.length > 0) {
                this.setValue(newValue);
            }
            return this.getValue();
        },
        getValue: function() {
            return slice(this.element.find("input[type=\"checkbox\"]:checked").map(function(){
                return this.value;
            }));
        },
        setValue: function(newValue) {
            this.element.find("input[type=\"checkbox\"]").each(function(){
                this.checked = newValue.indexOf(this.value) >= 0;
            });
        },

        //***

        _sort: function(items, value) {
            function selected(item) {
                return value.indexOf(item.id);
            }
            items = slice(items);
            var options = this.options, order = options.sort;
            switch (typeof order) {
              case "string":
                items.sort(function(a, b){
                    if (options.selectedFirst) {
                        var sa = selected(a), sb = selected(b);
                        if (sa >= 0 && sb < 0) return -1;
                        if (sb >= 0 && sa < 0) return 1;
                        if (sa >= 0 && sb >= 0) return sa-sb;
                    }
                    a = a[order];
                    b = b[order];
                    return a < b ? -1 : a > b ? 1 : 0;
                });
                break;
              case "function":
                items.sort(order);
                break;
            }
            return items;
        }
    });

    kendo.ui.plugin(MultiPicker);

})(jQuery, window.kendo);
