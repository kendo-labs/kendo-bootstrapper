---
title: kendo.ui.MultiSelect
meta_title: Configuration, methods and events of Kendo UI MultiSelect
slug: api-web-multiselect
relatedDocs: gs-web-multiselect-overview
tags: api,web
publish: true
---

# kendo.ui.MultiSelect

Represents the Kendo UI MultiSelect widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

 Animations to be used for opening/closing the popup. Setting to false will turn off the animation.

#### Example

    $("#multiselect").kendoMultiSelect({
        animation: false
    });

### animation.close `Object`

 Animation to be used for closing of the popup.

#### Example

    //multiselect initialization
     <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource,
             animation: {
                close: {
                    effects: "fadeOut",
                    duration: 300
                }
             }
         });
     </script>

### animation.close.effects `String`

Effect to be used for closing of the popup.

### animation.close.duration `Number`

Difines the animation duration.

### animation.open `Object`

 Animation to be used for opening of the popup.

#### Example

    //multiselect initialization

    <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource,
             animation: {
                open: {
                    effects: "fadeIn",
                    duration: 300
                }
             }
         });
     </script>

### animation.open.effects `String`

Effect to be used for opening of the popup.

### animation.open.duration `Number`

Difines the animation duration.

### autoBind `Boolean`*(default: true)*

 Controls whether to bind the widget to the DataSource on initialization.

#### Example

    $("#multiselect").kendoMultiSelect({
        autoBind: false
    });

### dataSource `Object | kendo.data.DataSource`

A local JavaScript object or instance of DataSource or the data that the multiselect will be bound to.

#### Example

    var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
    $("#multiselect").kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items
    });

#### Example

    $("#multiselect").kendoMultiSelect({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "Get/Items" // url to remote data source (simple list of strings)
                }
            }
        });
    });

### dataTextField `String`*(default: "")*

 Sets the field of the data item that provides the text content of the list items.

#### Example

    $("#multiselect").kendoMultiSelect({
        dataTextField: "Name",
        dataValueField: "ID"
    });

### dataValueField `String`*(default: "")*

 Sets the field of the data item that provides the value content of the list items.

#### Example

    $("#multiselect").kendoMultiSelect({
        dataTextField: "Name",
        dataValueField: "ID"
    });

### delay `Number`*(default: 200)*

 Specifies the delay in ms after which the multiselect will start filtering dataSource.

#### Example

    $("#multiselect").kendoMultiSelect({
        delay: 500
    });

### enable `Boolean`*(default: true)*

 Controls whether the multiselect should be initially enabled.

#### Example

    $("#multiselect").kendoMultiSelect({
        enable: false
    });

#### Example

    // get a reference to the multiselect widget
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.enable(false);

### filter `String`*(default: "none")*

 Defines the type of filtration.

#### Example

    $("#multiselect").kendoMultiSelect({
        filter: "startswith"
    });

### height `Number`*(default: 200)*

 Define the height of the drop-down list in pixels.

#### Example

    $("#multiselect").kendoMultiSelect({
        height: 500
    });

### highlightFirst `Boolean`*(default: true)*

 Controls whether the first item will be automatically highlighted.

#### Example

    $("#multiselect").kendoMultiSelect({
        highLightFirst: true
    });

### ignoreCase `String`*(default: true)*

 Defines whether the filtration should be case sensitive.

#### Example

    $("#multiselect").kendoMultiSelect({
        filter: 'contains',
        ignoreCase: false //now filtration will be case sensitive
    });

### minLength `Number`*(default: 1)*

 Specifies the minimum characters that should be typed before the multiselect activates

#### Example

    $("#multiselect").kendoMultiSelect({
        minLength: 3
    });

### maxSelectedItems `Number`*(default: null)*

 Defines the limit of the selected items. If set to null widget will not limit number of the selected items.

#### Example

    $("#multiselect").kendoMultiSelect({
        maxSelectedItems: 3 //only three or less items chould be selected
    });

### placeholder `String`*(default: "")*

 A string that appears in the textbox when the multiselect has no value.


#### Example

    //multiselect initialization
     <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource,
             placeholder: "Select..."
         });
     </script>

#### Example

    <select id="multiselect" data-placeholder="Select..."></select>

     //multiselect initialization
     <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource
         });
     </script>

### itemTemplate `String`

Template to be used for rendering the items in the list.

#### Example

    //template
    <script id="itemTemplate" type="text/x-kendo-tmpl">
          # if (data.BoxArt.SmallUrl) { #
              <img src="#:data.BoxArt.SmallUrl#" alt="#:data.Name#" />Title: #:data.Name#, Year: #:data.Name#
          # } else { #
              <img alt="#:data.Name#" />Title: #:data.Name#, Year: #:data.Name#
          # } #
     </script>

     //multiselect initialization
     <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource,
             dataTextField: "Name",
             dataValueField: "Id",
             template: $("#itemTemplate").html()
         });
     </script>

### tagTemplate `String`

Template to be used for rendering the tags of the selected items.

#### Example

    //template
    <script id="tagTemplate" type="text/x-kendo-tmpl">
      <img src="#:data.BoxArt.SmallUrl#" alt="#:data.Name#" />Title: #:data.Name#, Year: #:data.Name#
    </script>

     //multiselect initialization
     <script>
         $("#multiselect").kendoMultiSelect({
             dataSource: dataSource,
             dataTextField: "Name",
             dataValueField: "Id",
             template: $("#tagTemplate").html()
         });
     </script>

### value `Array`*(default: [])*

 Define the value of the widget

#### Example

    $("#multiselect").kendoMultiSelect({
         dataSource: ["Item1", "Item2", "Item3", "Item4"],
         value: ["Item2", "item3"]
    });

## Methods

### close

Closes the drop-down list.

#### Example

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.close();

### dataItems

Returns list of raw data records corresponding to the selected items.

#### Example

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get data items for the selected options.
    var dataItem = multiselect.dataItems();

#### Returns

`Array` The raw data records. Returns empty array ([]) if no selected options

### destroy
Prepares the **multiselect** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the multiselect element from DOM.

#### Example

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // detach events
    multiselect.destroy();

### enable

Enables/disables the multiselect widget

#### Example

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // disables the multiselect
    multiselect.enable(false);

#### Parameters

##### enable `Boolean`

Desired state

### readonly

Controls whether the widget is editable or readonly.

#### Example

    // get a reference to the multiselect widget
    var multiselect = $("multiselect").data("kendoMultiSelect");

    // makes multiselect readonly
    multiselect.readonly();

    // makes multiselect editable
    multiselect.readonly(false);

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the multiselect should be readonly or editable.

### focus

Focuses the widget.

#### Example

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // focus the widget
    multiselect.focus();

### open

Opens the drop-down list.

> **Important:** This method will not open popup element if there are no items.

#### Example

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.open();

### refresh

Re-render the items of the drop-down list.

#### Example

    // get a referenence to the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // re-render the items of the drop-down list.
    multiselect.refresh();

### search

Filters dataSource using the provided parameter and rebinds drop-down list.

#### Example

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // Searches for item which has "In" in the name.
    multiselect.search("In");

#### Parameters

##### word `String`

The filter value.

### setDataSource

Sets the dataSource of an existing multiselect and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    var dataSource = new kendo.data.DataSource({
        //dataSource configuration
    });

    $("#multiselect").data("kendoMultiSelect").setDataSource(dataSource);

### toggle

Toggles the drop-down list between opened and closed state.

#### Example

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // toggles the open state of the drop-down list.
    multiselect.toggle();

#### Parameters

##### toggle `Boolean`

Defines the whether to open/close the drop-down list.

### value

Gets/Sets the value of the multiselect. Accepts <i>string</i> value or <i>Array of strings</i>.

#### Example

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get the value of the multiselect.
    var value = multiselect.value();

    // set the value of the multiselect.
    multiselect.value(["1", "2"]); //select items which have value respectively "1" and "2"

#### Parameters

##### value `Array|String`

The value to set.

#### Returns

`Array` The value of the multiselect.

## Events

### change

Fires when the value has been changed.

#### Example

    $("#multiselect").kendoMultiSelect({
        change: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // bind to the change event
    multiselect.bind("change", function(e) {
        // handle event
    });

### close

Fires when the drop-down list is closed

#### Example

    $("#multiselect").kendoMultiSelect({
        close: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // bind to the close event
    multiselect.bind("close", function(e) {
        // handle event
    });

### dataBound

Fires when the multiselect has received data from the data source.

#### Example

    $("#multiselect").kendoMultiSelect({
        dataBound: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // bind to the close event
    multiselect.bind("dataBound", function(e) {
        // handle event
    });

### open

Fires when the drop-down list is opened

#### Example

    $("#multiselect").kendoMultiSelect({
        open: function(e) {
                // handle event
            }
    });

#### To set after initialization

    // get a reference to instance of the Kendo UI multiselect
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // bind to the open event
    multiselect.bind("open", function(e) {
        // handle event
    });

### select

Triggered when a Li element is selected.

#### Attach select event handler during initialization; detach via unbind()

    // event handler for select
    var onSelect = function(e) {
        // access the selected item via e.item (jQuery object)
    };

    // attach select event handler during initialization
    var multiselect = $("#multiselect").kendoMultiSelect({
        select: onSelect
    });

    // detach select event handler via unbind()
    multiselect.data("kendoMultiSelect").unbind("select", onSelect);

#### Attach select event handler via bind(); detach via unbind()

    // event handler for select
    var onSelect = function(e) {
        // access the selected item via e.item (jQuery object)
    };

    // attach select event handler via bind()
    $("#multiselect").data("kendoMultiSelect").bind("select", onSelect);

    // detach select event handler via unbind()
    $("#multiselect").data("kendoMultiSelect").unbind("select", onSelect);

#### Event Data

##### e.item `jQuery`

The selected item chosen by a user.
