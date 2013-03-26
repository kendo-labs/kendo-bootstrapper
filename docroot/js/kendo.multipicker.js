(function($, kendo){

    function slice(x, y, z) { return Array.prototype.slice.call(x, y, z) }

    var yajet = new YAJET();
    var itemTemplate = yajet.compile(
        "<label><input type='checkbox' value='$this.value|html' /> $this.label|html</label>"
    );

    var Widget = kendo.ui.Widget;
    var MultiPicker = Widget.extend({
        options: {
            name       : "MultiPicker",
            choices    : null,
            value      : null,
            valueField : "value",
            textField  : "label",
            sort       : "label"
        },
        events: [ "change" ],
        init: function(element, options) {
            var self = this;
            Widget.fn.init.call(self, element, options);
            self.element.addClass("kendo-multipicker");
            self.element.on("change", "input[type=\"checkbox\"]", function(){
                self.trigger("change", {
                    value: self.value(),
                    changed: this.value,
                    checked: this.checked
                });
            });
            self.reset(options.choices, options.value);
        },
        reset: function(choices, value) {
            if (!choices) choices = [];
            var o = this.options;
            choices = o.choices = this._sort(choices);
            this.element.html(choices.map(function(item){
                return itemTemplate({
                    item  : item,
                    label : item[o.textField],
                    value : item[o.valueField]
                });
            }).join(""));
            this.setValue(value || []);
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

        _sort: function(items) {
            items = slice(items);
            var order = this.options.sort;
            switch (typeof order) {
              case "string":
                items.sort(function(a, b){
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
