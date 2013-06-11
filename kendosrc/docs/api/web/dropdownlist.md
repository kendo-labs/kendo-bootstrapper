---
title: kendo.ui.DropDownList
meta_title: Configuration, methods and events of Kendo UI DropDownList
meta_description: Learn how to control your DropDown UI widget's behavior to suit your needs: open, close, enable, disable the widget. Events data and code examples available.
slug: api-web-dropdownlist
relatedDocs: gs-web-dropdownlist-overview
tags: api,web
publish: true
---

# kendo.ui.DropDownList

Represents the Kendo UI DropDownList widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

 Animations to be used for opening/closing the popup. Setting to false will turn of the animation.

### animation.close `Object`

 Animation to be used for closing of the popup.

#### Example

    //dropdownlist initialization
     <script>
         $("#dropdownlist").kendoDropDownList({
             dataSource: dataSource,
             animation: {
                close: {
                    effects: "fadeOut",
                    duration: 300,
                    hide: true
                    show: false
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

    //dropdownlist initialization
     <script>
         $("#dropdownlist").kendoDropDownList({
             dataSource: dataSource,
             animation: {
                open: {
                    effects: "fadeIn",
                    duration: 300,
                    show: true
                }
             }
         });
     </script>

### animation.open.effects `String`

Effect to be used for opening of the popup.

### animation.open.duration `Number`

Difines the animation duration.

### autoBind `Boolean`*(default: true)*

 Controls whether to bind the widget on initialization.

#### Example

    $("#dropdownlist").kendoDropDownList({
        autoBind: false
    });

### cascadeFrom `String`

Use it to set the Id of the parent DropDownList.

#### Example
    $("#dropdownlist1").kendoDropDownList();

    $("#dropdownlist2").kendoDropDownList({
        cascadeFrom: "dropdownlist1"
    });

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource or the data that the DropDownList will be bound to.

#### Example

    // bind to local data
    var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
    $("#dropdownlist").kendoDropDownList({
        dataSource: items,
        dataTextField: "Title",
        dataValueField: "Id"
    });

#### Example

    $("#dropdownlist").kendoDropDownList({
        dataSource: {
            transport: {
                read: "titles.json"
            }
        },
        dataTextField: "Title",
        dataValueField: "Id"
    });

### dataTextField `String`*(default: "")*

 Sets the field of the data item that provides the text content of the list items.

#### Example

    var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
    $("#dropdownlist").kendoDropDownList({
        dataSource: items,
        dataTextField: "Title",
        dataValueField: "Id"
    });

### dataValueField `String`*(default: "")*

 Sets the field of the data item that provides the value content of the list items.

#### Example

    var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
    $("#dropdownlist").kendoDropDownList({
        dataSource: items,
        dataTextField: "Title",
        dataValueField: "Id"
    });

### delay `Number`*(default: 500)*

 Specifies the delay in ms before the search text typed by the end user is cleared.

#### Example

    $("#dropdownlist").kendoDropDownList({
        delay: 1000 // wait 1 second before clearing the user input
    });

### enable `Boolean`*(default: true)*

 Controls whether the DropDownList should be initially enabled.

#### Example

    $("#dropdownlist").kendoDropDownList({
        enable: false // dropdown list will not be enabled
    });

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // disable the dropdown
    dropdownlist.enable(false);

### height `Number`*(default: 200)*

 Define the height of the drop-down list in pixels.

#### Example

    $("#dropdownlist").kendoDropDownList({
        height: 400
    });

### ignoreCase `String`*(default: true)*

 Controls whether the search should be case sensitive.

#### Example

    $("#dropdownlist").kendoDropDownList({
        ignoreCase: false //now search will be case sensitive
    });

### index `Number`*(default: 0)*

 Defines the initial selected item.

#### Example

    $("#dropdownlist").kendoDropDownList({
        index: 1 // selects the second item in the dropdown list
    });

### optionLabel `String | Object`*(default: "")*

 Define the text of the default empty item. If the value is an object, then the widget will use it directly.
 Note that object should have atleast the dataValueField and dataTextField properties. Otherwise, widget will show `undefined`.

> **Important:** Widget's value will be equal to the optionLabel if dataValueField/dataTextField are same or not defined

#### Example

    $("#dropdownlist").kendoDropDownList({
        optionLabel: "Select An Option"
    });

#### Example

    $("#dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: {
           text: "Select An Option",
           value: ""
        }
    });

### template `String`

Template to be used for rendering the items in the list.

#### Example

    //template
    <script id="template" type="text/x-kendo-tmpl">
          # if (data.BoxArt.SmallUrl) { #
              <img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
          # } else { #
              <img alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
          # } #
     </script>

     //dropdownlist initialization
     <script>
         $("#dropdownlist").kendoDropDownList({
             dataSource: dataSource,
             dataTextField: "Name",
             dataValueField: "Id",
             template: kendo.template($("#template").html())
         });
     </script>

### text `String`*(default: "")*

 Define the text of the widget, when the autoBind is set to false.

#### Example

    $("#dropdownlist").kendoDropDownList({
         autoBind: false,
         text: "Chai"
    });

### value `String`*(default: "")*

 Define the value of the widget

#### Example

    $("#dropdownlist").kendoDropDownList({
         dataSource: ["Item1", "Item2"],
         value: "Item1"
    });

## Methods

### close

Closes the drop-down list.

#### Example

    // get a reference to the dropdown widget
    var dropdownList = $("#dropdownList").data("kendoDropDownList");
    // close the dropdown
    dropdownlist.close();

### dataItem

Returns the raw data record at the specified index. If the index is not specified, the selected index will be used.

#### Example

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // get the dataItem corresponding to the selectedIndex.
    var dataItem = dropdownlist.dataItem();

    // get the dataItem corresponding to the passed index.
    var dataItem = dropdownlist.dataItem(1);

#### Parameters

##### index `Number` *(optional)*

The zero-based index of the data record

#### Returns

`Object` The raw data record. Returns <i>undefined</i> if no data.

### destroy
Prepares the **DropDownList** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DropDownList element from DOM.

#### Example

    var dropDownList = $("#dropDownList").data("kendoDropDownList");

    // detach events
    dropDownList.destroy();

### enable

Enables/disables the dropdownlist widget

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // disable the dropdown list
    dropdownlist.enable(false);

#### Parameters

##### enable `Boolean`

Desired state

### readonly

Controls whether the widget is editable or readonly.

#### Example

    // get a reference to the timepicker widget
    var timepicker = $("timepicker").data("kendoTimePicker");

    // makes timepicker readonly
    timepicker.readonly();

    // makes timepicker editable
    timepicker.readonly(false);

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the timepicker should be readonly or editable.

### focus

Focuses the widget.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // focus the widget
    dropdownlist.focus();

### open

Opens the drop-down list.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // open the drop down
    dropdownlist.open();

### refresh

Re-render the items in drop-down list.

#### Example

    // get a referenence to the Kendo UI DropDownList
    var dropdownlist = $("dropdownlist").data("kendoDropDownList");
    // re-render the items in drop-down list.
    dropdownlist.refresh();

### search

Selects item, which starts with the provided parameter.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // Selects item which starts with "In".
    dropdownlist.search("In");

#### Parameters

##### word `String`

The search value.

### select

Selects a dropdown item and sets the value and the text of the dropdownlist, or retrieves the selected item index.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // selects by jQuery object
    dropdownlist.select(dropdownlist.ul.children().eq(0));

    // selects by index
    dropdownlist.select(1);

    // selects item if its text is equal to "test" using predicate function
    dropdownlist.select(function(dataItem) {
        return dataItem.text === "test";
    });

	// get selected index
    var selectedIndex = dropdownlist.select();

#### Parameters

##### li `jQuery | Number | Function`

LI element or index of the item or predicate function, which defines the item that should be selected.

#### Returns

`Number` The index of the selected item, if called with no parameters.

`undefined` If called with a parameter as a setter.

### setDataSource

Sets the dataSource of an existing DropDownList and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    var dataSource = new kendo.data.DataSource({
        //dataSource configuration
    });

    $("#dropdown").data("kendoDropDownList").setDataSource(dataSource);

### text

Gets/Sets the text of the dropdownlist.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // get the text of the dropdownlist.
    var text = dropdownlist.text();

#### Parameters

##### text `String`

The text to set.

#### Returns

`String` The text of the dropdownlist.

### toggle

Toggles the drop-down list between opened and closed state.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // toggles the open state of the drop-down list.
    dropdownlist.toggle();

#### Parameters

##### toggle `Boolean`

Defines the whether to open/close the drop-down list.

### value

Gets/Sets the value of the dropdownlist. The value will not be set if there is no item with such value. If value is undefined, text of the data item is used.

> **Important:** If no items, value method will pre-fetch the data before continue with the value setting.

#### Example

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // get the value of the dropdownlist.
    var value = dropdownlist.value();

    // set the value of the dropdownlist.
    dropdownlist.value("1"); //looks for item which has value "1"

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the dropdownlist.

## Events

### change

Fires when the value has been changed.

#### Example

    $("#dropdownlist").kendoDropDownList({
        change: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // bind to the change event
    dropdownlist.bind("change", function(e) {
        // handle event
    });

### close

Fires when the drop-down list is closed

#### Example

    $("#dropdownlist").kendoDropDownList({
        close: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // bind to the close event
    dropdownlist.bind("close", function(e) {
        // handle event
    });

### dataBound

Fires when the drop-down list has received data from the data source.

#### Example

    $("#dropdownlist").kendoDropDownList({
        dataBound: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // bind to the close event
    dropdownlist.bind("dataBound", function(e) {
        // handle event
    });

### open

Fires when the drop-down list is opened

#### Example

    $("#dropdownlist").kendoDropDownList({
        open: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dropdown list
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // bind to the open event
    dropdownlist.bind("open", function(e) {
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
    var dropdownlist = $("#dropdownlist").kendoDropDownList({
        select: onSelect
    });

    // detach select event handler via unbind()
    dropdownlist.data("kendoDropDownList").unbind("select", onSelect);

#### Attach select event handler via bind(); detach via unbind()

    // event handler for select
    var onSelect = function(e) {
        // access the selected item via e.item (jQuery object)
    };

    // attach select event handler via bind()
    $("#dropdownlist").data("kendoDropDownList").bind("select", onSelect);

    // detach select event handler via unbind()
    $("#dropdownlist").data("kendoDropDownList").unbind("select", onSelect);

#### Event Data

##### e.item `jQuery`

The selected item chosen by a user.

### cascade

Triggered when value of the widget is changed via API or user interaction.

#### Attach cascade event handler during initialization; detach via unbind()

    // event handler for cascade
    var onCascade = function() {
        //cascade event
    };

    // attach select event handler during initialization
    var dropdownlist = $("#dropdownlist").kendoDropDownList({
        cascade: onCascade
    });

    // detach cascade event handler via unbind()
    dropdownlist.data("kendoDropDownList").unbind("cascade", onCascade);

#### Attach cascade event handler via bind(); detach via unbind()

    // event handler for cascade
    var onCascade = function(e) {
        //cascade event
    };

    // attach cascade event handler via bind()
    $("#dropdownlist").data("kendoDropDownList").bind("cascade", onCascade);

    // detach cascade event handler via unbind()
    $("#dropdownlist").data("kendoDropDownList").unbind("cascade", onCascade);

## Field

### element
A jQuery object of the original input element.

### options
An object, which holds the options of the widget.

### wrapper
A jQuery object of the span element which wraps the input.

### span
A jQuery object of the span element which holds the selected text.

### list
A jQuery object of the drop-down list element.

### ul
A jQuery object of the ul element, which holds the available options.

### dataSource
The DataSource instance used by the widget.

### popup
The Popup instace used by the widget.
