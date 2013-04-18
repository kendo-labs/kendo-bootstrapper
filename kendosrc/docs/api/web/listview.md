---
title: kendo.ui.ListView
meta_title: Configuration, methods and events of Kendo UI ListView
meta_description: Step-by-step instructions and samples for Kendo UI ListView widget configuration, methods and event handling.
slug: api-web-listview
relatedDocs: gs-web-listview-overview
tags: api,web
publish: true
---

# kendo.ui.ListView

Represents the Kendo UI ListView widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### autoBind `Boolean`*(default: true)*

 Indicates whether the list view will call read on the DataSource initially.

#### Example

    $("#listView").kendoListView({
         dataSource: {
             data: createRandomData(50)
         },
         template: "<li>${Name} ${BirthDate}</li>",
         autoBind: false // the list view will not be populated with data until read() is called on the sharedDataSource
     });

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource or Object with DataSource configuration.

#### Example

    var sharedDataSource = new kendo.data.DataSource({
         data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         pageSize: 1
    });

    $("#listView").kendoListView({
         dataSource: sharedDataSource,
         template: "<li>${title} ${year}</li>"
     });

#### Example

    $("#listView").kendoListView({
         dataSource: {
             data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
             template: "<li>${title} ${year}</li>"
         }
     });

### editTemplate `Function`

Specifies ListView item template in edit mode.

#### Example

    <script type="text/x-kendo-tmpl" id="template">
         <div>
           <dl>
             <dt>Name</dt> <dd>${Name}</dd>
             <dt>Age</dt> <dd>${Age}</dd>
           </dl>
         </div>
     </script>

     <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           <dl>
             <dt>Name</dt>
             <dd><input type="text" data-bind="value:Name" name="Name" required="required" /></dd>
             <dt>Age</dt>
             <dd><input type="text" data-bind="value:Age" data-role="numerictextbox" data-type="number" name="Age" required="required /></dd>
           </dl>
         </div>
     </script>

#### Example

    $("#listView").kendoListView({
         dataSource: {
             data: createRandomData(50)
         },
         template: kendo.template($("#template").html()),
         editTemplate: kendo.template($("#editTemplate").html())
     });

### navigatable `Boolean`*(default: false)*

 Indicates whether keyboard navigation is enabled/disabled.

#### Example

    $("#listView").kendoListView({
         dataSource: {
             data: createRandomData(50),
         },
         template: "<li>${Name} ${BirthDate}</li>",
         navigatable: true
     });

### selectable `Boolean|String` *(default: false)*

 Indicates whether selection is enabled/disabled. Possible values:


#### *true*

Single item selection.

#### *"single"*

Single item selection.

#### *"multiple"*

Multiple item selection.

### template `Function`

Specifies ListView item template.

#### Example

    <script type="text/x-kendo-tmpl" id="template">
         <div>
           <dl>
             <dt>Name</dt> <dd>${Name}</dd>
             <dt>Birth Date</dt> <dd>${BirdthDate}</dd>
           </dl>
         </div>
     </script>

#### Example

    $("#listView").kendoListView({
         dataSource: {
             data: createRandomData(50)
         },
         template: kendo.template($("#template").html())
     });

### altTemplate `Function`

Template to be used for rendering the alternate items in the listview.

## Methods

### add

Inserts empty item as first item on the current view and prepare it for editing.

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // add item
    listView.add();

### cancel

Cancels changes in currently edited item.

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // cancel changes in currently edited item
    listView.cancel();

### clearSelection

Clears ListView selected items and triggers change event.

### destroy
Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

#### Example

    var listView = $("#listView").data("kendoListView");

    // detach events
    listView.destroy();

### edit

Edit specified ListView item. Triggers edit event.

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // edit first list view item
    listView.edit(listView.element.children().first());

#### Parameters

##### item `Object`

jQuery object containing the item to be edited.

### refresh

Reloads the data and repaints the list view.

#### Example

    var listView = $("#listView").data("kendoListView");

    // refreshes the list view
    listView.refresh();

### remove

Removes specified ListView item. Triggers remove event and if not prevented calls DataSource sync method.

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // remove first list view item
    listView.remove(listView.element.children().first());

#### Parameters

##### item `Object`

jQuery object containing the item to be removed.

### save

Saves edited ListView item. If validation succeeds will call DataSource sync method.

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // edit first list view item
    listView.edit(listView.element.children().first());
    // save edited item
    listView.save();

### select

Get/set the selected listview item(s).

#### Example

    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // selects first list view item
    listView.select(listView.element.children().first());

#### Returns

`jQuery` the selected items if called without arguments.

#### Parameters

##### items `Selector | Array`

Items to select.

### setDataSource

Sets the dataSource of an existing ListView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    var dataSource = new kendo.data.DataSource({
        //dataSource configuration
    });

    $("#listview").data("kendoListView").setDataSource(dataSource);

## Events

### cancel

Raised when the user clicks the "cancel" button.

#### Example

     $("#listView").kendoListView({
         cancel: function() {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the list view
     var listView = $("#listView").data("kendoListView");
     // bind to the cancel event
     listView.bind("cancel", function(e) {
         // handle event
     });

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.Model`

The model to which the current grid row is bound to.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The row remains in edit mode.

### change

Fires when the list view selection has changed.

#### Example

     $("#listView").kendoListView({
         change: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the list view
     var listView = $("#listView").data("kendoListView");
     // bind to the change event
     listView.bind("change", function(e) {
         // handle event
     });

### dataBound

Fires when the list view has received data from the data source.
and is about to render it.

#### Example

     $("#listView").kendoListView({
         dataBound: function(e) {
             // handle event
         }
     });

### dataBinding

Fires when the grid is about to be rendered.

#### Example

     $("#listView").kendoListView({
         dataBinding: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the ListView
     var listview = $("#listView").data("kendoListView");
     // bind to the dataBinding event
     listview.bind("dataBinding", function(e) {
         // handle event
     });

### edit

Fires when the list view enters edit mode.

#### Example

     $("#listView").kendoListView({
         edit: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the list view
     var listView = $("#listView").data("kendoListView");
     // bind to the edit event
     listView.bind("edit", function(e) {
         // handle event
     });

#### Event Data

##### e.item `jQuery`

The jQuery element to be edited.

##### e.model `kendo.data.Model`

The model to be edited.

### remove

Fires before the list view item is removed.

#### Example

     $("#listView").kendoListView({
         remove: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the list view
     var listView = $("#listView").data("kendoListView");
     // bind to the remove event
     listView.bind("remove", function(e) {
         // handle event
     });

#### Event Data

##### e.item `jQuery`

The item element to be deleted.

##### e.model `kendo.data.Model`

The model which to be deleted.
