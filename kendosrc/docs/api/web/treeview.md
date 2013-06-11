---
title: kendo.ui.TreeView
meta_title: Configuration, methods and events of Kendo UI TreeView
meta_description: Documentation guide that helps the developer configure TreeView UI widget in a few quick steps, apply methdos and trigger events.
slug: api-web-treeview
relatedDocs: gs-web-treeview-overview
tags: api,web
publish: true
---

# kendo.ui.TreeView

Represents the Kendo UI TreeView. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

A collection of visual animations used when items are expanded or collapsed through user interaction.
Setting this option to **false** will disable all animations.

#### Example

    $("#treeView").kendoTreeView({
        animation: {
            expand: {
                duration: 200,
                hide: true,
                show: false
            },
            collapse: {
                duration: 200,
                effects: "expandVertical",
                show: true
            }
        }
    });

### animation.collapse `Object`

The animation that will be used when collapsing items.

### animation.collapse.duration `Number`*(default: 200)*

The number of milliseconds used for the animation when a node is expanded.

#### Example

    $("#treeView").kendoTreeView({
        animation: {
            collapse: {
                duration: 1000
            }
        }
    });

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are utilized when a **TreeView** node
is collapsed. Options include **"fadeOut"**.

#### Example

    $("#treeView").kendoTreeView({
        animation: {
            collapse: {
                duration: 5000,
                effects: "fadeOut"
            }
        }
    });

### animation.expand `Object`

The animation that will be used when expanding items.

### animation.expand.duration `Number`*(default: 200)*

 The number of milliseconds used for the animation when a
node is expanded.

#### Example

    $("#treeView").kendoTreeView({
        animation: {
            expand: {
                duration: 1000
            }
        }
    });

### animation.expand.effects `String`*(default: "expandVertical")*

A whitespace-delimited string of animation effects that are utilized when a **TreeView** node
is expanded. Options include **"expandVertical"** and **"fadeIn"**.

#### Example

    $("#treeView").kendoTreeView({
        animation: {
            expand: {
                duration: 5000,
                effects: "expandVertical fadeIn"
            }
        }
    });

### animation.expand.show `Boolean`*(default: true)*

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="treeview"></div>
    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
      data: [ { text: "Jane Doe" }, { text: "John Doe" }]
    });
    $("#treeview").kendoTreeView({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### checkboxes `Boolean|Object`

If `true` or an object, renders checkboxes within each treeview item.

#### Example

    $("#treeview").kendoTreeView({
        checkboxes: true
    });

### checkboxes.name `String`

Indicates the name of the checkbox inputs that will be posted to the server.

    $("#treeview").kendoTreeView({
        checkboxes: {
            // renders <input type='checkbox' name='checkedItems[]' />
            name: "checkedItems[]"
        }
    });

### checkboxes.checkChildren `Boolean`*(default: false)*

Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked.

#### Example

    $("#treeview").kendoTreeView({
        checkboxes: {
            checkChildren: true
        }
    });

### checkboxes.template `String|Function`

Template for the checkbox rendering. Used to set the  checkbox name attribute, or to add hidden inputs that will be posted along the checkboxes.

#### Example

    $("#treeview").kendoTreeView({
        checkboxes: {
            template: "<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />"
        }
    });

### dataImageUrlField `String`*(default: null)*

 Sets the field of the data item that provides
the image URL of the treeview nodes.

#### Example

    var items = [
        { id: 1, text: "Tea", image: "tea.png" },
        { id: 2, text: "Coffee", image: "coffee.png" }
    ];

    $("#treeview").kendoTreeView({
        dataSource: items,
        dataImageUrlField: "image"
    });

### dataSource `Array`

The data that the **TreeView** will be bound to.

### dataSpriteCssClassField `String`*(default: null)*

 Sets the field of the data item that provides
the sprite CSS class of the treeview nodes.

#### Example

    var items = [
        { id: 1, text: "Tea", sprite: "icon-tea" },
        { id: 2, text: "Coffee", sprite: "icon-coffee" }
    ];

    $("#treeview").kendoTreeView({
        dataSource: items,
        dataSpriteCssClassField: "sprite"
    });

### dataTextField `String|Array` *(default: null)*

Sets the field of the data item that provides the text content of the treeview nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.

#### Example

    var items = [ { id: 1, ProductName: "Tea" }, { id: 2, ProductName: "Coffee"} ];
    $("#treeview").kendoTreeView({
        dataSource: items,
        dataTextField: "ProductName"
    });

#### Using different fields on different levels

    var items = [
        { CategoryName: "Hot drinks", items: [
            { ProductName: "Tea", items: [
                { ProductName: "Green Tea" },
                { ProductName: "White Tea" }
            ] },
            { ProductName: "Coffee"}
        ] }
    ];

    $("#treeview").kendoTreeView({
        dataSource: items,
        dataTextField: [ "CategoryName", "ProductName" ]
    });

### dataUrlField `String`*(default: null)*

 Sets the field of the data item that provides
the link URL of the treeview nodes.

#### Example

    var items = [
        { id: 1, text: "Tea", LinksTo: "http://tea.example.com" },
        { id: 2, text: "Coffee", LinksTo: "http://coffee.example.com" }
    ];

    $("#treeview").kendoTreeView({
        dataSource: items,
        dataUrlField: "LinksTo"
    });

### dragAndDrop `Boolean`*(default: false)*

Disables (**false**) or enables (**true**) drag-and-drop on the nodes of a
**TreeView**.

### loadOnDemand `Boolean`*(default: true)*

 Indicates whether the child datasources should be fetched
lazily, when parent groups get expanded. Setting this to false causes all child dataSources to
be loaded at initialization time. Note: when initializing a TreeView from array (rather than from a
HierarchicalDataSource instance), the default value of this option is false.

### template `String|Function`

Template for rendering of the nodes of the treeview.

#### Example

    $("#treeview").kendoTreeView({
        template: "#= item.text # <a href='\\#'>Delete</a>"
    });

## Methods

### append

Appends a node to a group of a TreeView. This method may also be used to reorder the nodes of a
TreeView.

#### Append a new node with the text, "HTML5" to the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.append({ text: "HTML5" }, $("#firstItem"));

#### Moves the node with ID, secondNode as a last child of the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.append($("#secondNode"), $("#firstItem"));

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be appended.

##### parentNode `jQuery` *(optional)*

The node that will contain the newly appended node. If not specified, the new node will be appended to the
root group of the TreeView.


### collapse

Collapses nodes.

#### Example

    var treeview = $("#treeview").data("kendoTreeView");

    // collapse the node with id="firstItem"
    treeview.collapse(document.getElementById("firstItem"));

    // collapse all nodes
    treeview.collapse(".k-item");

#### Parameters

##### nodes `jQuery | Element | String`

The nodes that are to be collapsed.

### dataItem

Returns the model dataItem that corresponds to a TreeView node

#### Example

    var treeview = $("#treeview").data("kendoTreeView");

    var dataItem = treeview.dataItem(".k-item:first");

See also: [getting the node data in the select event handler](/getting-started/web/treeview/overview#getting-the-node-data-in-the-select-event-handler)

#### Parameters

##### node `jQuery | Element | Selector`

The element or selector that specifies a node.

#### Returns

`kendo.data.Node` The model of the item that was passed as a parameter.

### destroy
Prepares the **TreeView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TreeView element from DOM.

#### Example

    var treeView = $("#treeView").data("kendoTreeView");

    // detach events
    treeView.destroy();

### detach

Removes a node from a TreeView, but keeps its jQuery.data() objects.

#### Remove the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    var firstItem = $("#firstItem");
    firstItem.data("id", 1);
    treeview.detach(firstItem);
    firstItem.data("id") == 1;

#### Parameters

##### node `jQuery | Element | String`

The node that is to be detached.

#### Returns

`jQuery` The node that has been detached.

### enable

Enables or disables nodes.

#### Example

    var treeview = $("#treeview").data("kendoTreeView");

    // disable the node with id="firstItem"
    treeview.enable(document.getElementById("firstItem"), false);

    // enable all nodes
    treeview.enable(".k-item");

#### Parameters

##### nodes `jQuery | Element | String`

The nodes that are to be enabled/disabled.

##### enable `Boolean` *(optional, default: true)*

Whether the nodes should be enabled or disabled.

### expand

Expands nodes.

#### Example

    var treeview = $("#treeview").data("kendoTreeView");

    // expands the node with id="firstItem"
    treeview.expand(document.getElementById("firstItem"));

    // expands all nodes
    treeview.expand(".k-item");

#### Parameters

##### nodes `jQuery | Element | String`

The nodes that are to be collapsed.

### findByText

Searches a TreeView for a node that has specific text.

#### Search a TreeView for the item that has the text, "CSS3 is da bomb!"

    var treeView = $("#treeView").data("kendoTreeView");
    var foundNode = treeView.findByText("CSS3 is da bomb!");

#### Parameters

##### text `String`

The text that is being searched for.

#### Returns

`jQuery` All nodes that have the text.

### findByUid

Searches a TreeView for a node with the given unique identifier.
Applicable when the widget is bound to a [HierarchicalDataSource](/api/framework/hierarchicaldatasource).

#### Search a TreeView for the item that has the unique id "95c1925d-a779-47fc-8420-b4274f01c037"

    var treeView = $("#treeView").data("kendoTreeView");
    var node = treeView.findByUid("95c1925d-a779-47fc-8420-b4274f01c037");

If you want to find a node by its `id`, use the [dataSource.get()](/api/framework/datasource#get) method and supply its uid to the `findByUid` method.

#### Parameters

##### text `String`

The text that is being searched for.

#### Returns

`jQuery` All nodes that have the text.

### insertAfter

Inserts a node after a specified node in a TreeView. This method may also be used to reorder the nodes of a
TreeView.

#### Insert a node with the text, "JavaScript" after the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.insertAfter({ text: "JavaScript" }, $("#firstItem"));

#### Moves a node with ID, secondNode after a node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.insertAfter($("#secondNode"), $("#firstItem"));

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that will be preceed the newly-appended node.

### insertBefore

Inserts a node before another node. This method may also be used to reorder the nodes of a
TreeView.

#### Inserts a new node with the text, "CSS3" before the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.insertBefore({ text: "CSS3" }, $("#firstItem"));

#### Moves the node with ID, secondNode before the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.insertBefore($("#secondNode"), $("#firstItem"));

#### Parameters

##### nodeData `Object`

A JSON-formatted string or selector that specifies the node to be inserted.

##### referenceNode `jQuery`

The node that follows the inserted node.

### parent

Gets the parent node of the item

#### Example

    var treeView = $("#treeView").data("kendoTreeView");
    var parentNode = treeView.parent($("#firstItem"));

#### Parameters

##### node `jQuery | Element | String`

The child node whose parent will be returned.

#### Returns

`jQuery` The parent node of the given parameter node.

### remove

Removes a node from a TreeView.

#### Remove the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.remove($("#firstItem"));

#### Parameters

##### node `jQuery | Element | String`

The node that is to be removed.

### select

Gets or sets the selected node of a TreeView.

#### Select the node with HTML id="firstItem"

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.select($("#firstItem"));

#### Select the first node in the treeview

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.select(".k-item:first");

#### Get the currently selected node

    var treeView = $("#treeView").data("kendoTreeView");
    var selectedNode = treeView.select();

#### Unselect all nodes

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.select($());

#### Parameters

##### node `jQuery | Element | String` *(optional)*

If provided, the node of a TreeView that should be selected.

#### Returns

`jQuery` The selected node of a TreeView.

### setDataSource

Sets the dataSource of an existing TreeView and rebinds it.

#### Parameters

##### dataSource `kendo.data.HierarchicalDataSource`

#### Example

    var dataSource = new kendo.data.HierarchicalDataSource({
        data: [
            { text: "foo" }
        ]
    });

    $("#treeview").data("kendoTreeView").setDataSource(dataSource);

### text

Gets or sets the text of a node in a TreeView.

#### Get the text of the node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    var nodeText = treeView.text($("#firstItem"));

#### Parameters

##### node `String`

The node of which the text is being retrieved.

##### newText `String`

Optional. When passed, sets the node text to the specified string

    var treeView = $("#treeView").data("kendoTreeView");

    treeView.text(".k-item:first", "Salmon");

#### Returns

`String` The text of a node.

### toggle

Toggles the node of a TreeView between its expanded and collapsed states.

#### Toggle the state of a node with ID, firstItem

    var treeView = $("#treeView").data("kendoTreeView");
    treeView.toggle($("#firstItem"));

#### Parameters

##### node `String`

The node that should be toggled.

## Events

### collapse

Triggered before a subgroup gets collapsed.

#### Event Data

##### e.node `Element`

The collapsed node

### dataBound

Triggered after the dataSource change event has been processed (adding/removing items);

#### Event Data

##### e.node `jQuery`

The node whose children have been changed. If the changes have occured on the root level, this parameter is undefined.

### drag

Triggered while a node is being dragged.

#### Show the user that is not permitted to drop nodes outside of the #drop-area element

    treeview.data("kendoTreeView").bind("drag", function(e) {
        if ($(e.dropTarget).parents("#drop-area").length ) {
            e.setStatusClass("k-denied");
        }
    });

#### Event Data

##### e.sourceNode `Element`

The node that is being dragged.

##### e.dropTarget `Element`

The element that the node is placed over.

##### e.pageX `Number`

The x coordinate of the mouse.

##### e.pageY `Number`

The y coordinate of the mouse.

##### e.statusClass `String`

The status that the drag clue shows.

##### e.setStatusClass `Function`

Allows a custom drag clue status to be set.


Pre-defined status classes are:

*   **k-insert-top**
        - Indicates that the item will be inserted on top.
*   **k-insert-middle**
        - Indicates that the item will be inserted in the middle.
*   **k-insert-bottom**
        - Indicates that the item will be inserted at the bottom.
*   **k-add**
        - Indicates that the item will be added/appended.
*   **k-denied**
        - Indicates an invalid operation. Using this class will automatically
          make the drop operation invalid, so there will be no need to call
          `setValid(false)` in the `drop` event.

### dragend

Triggered after a node has been dropped.

#### Event Data

##### e.sourceNode `Element`

The node that is being dropped.

##### e.destinationNode `Element`

The node that the sourceNode is being dropped upon.

##### e.dropPosition `String`

Shows where the source has been dropped. One of the values **over**, **before**, or **after**.

### dragstart

Triggered before the dragging of a node starts.

#### Disable dragging of root nodes

    treeview.data("kendoTreeView").bind("dragstart", function(e) {
        if ($(e.sourceNode).parentsUntil(".k-treeview", ".k-item").length == 0) {
            e.preventDefault();
        }
    });

#### Event Data

##### e.sourceNode `Element`

The node that will be dragged.

### drop

Triggered when a node is being dropped.

#### Event Data

##### e.sourceNode `Element`

The node that is being dropped.

##### e.destinationNode `Element`

The node that the sourceNode is being dropped upon.

##### e.valid `Boolean`

Whether this drop operation is permitted.

##### e.setValid `Function`

Allows the drop to be prevented.

##### e.dropTarget `Element`

The element that the node is placed over.

##### e.dropPosition `String`

Shows where the source will be dropped. One of the values **over**, **before**, or **after**.

#### The difference between e.setValid(false) and e.preventDefault()

Both operations cancel the default drag operation, but the indication to the user is different.
`e.setValid(false)` indicates that the operation was unsuccessful by animating the drag clue to its original position.
`e.preventDefault()` simply removes the clue, as if it has been dropped.
As a general rule, use `preventDefault` to manually handle the drag&drop operation, and `setValid(false)` to indicate unsuccessful drag&drops.

### expand

Triggered before a subgroup gets expanded.

#### Event Data

##### e.node `Element`

The expanded node

### change

Triggered when the selection has changed (either by the user or through the `select` method).

### select

Triggered when a node is being selected by the user. Cancellable.

#### Event Data

##### e.node `Element`

The selected node

### navigate

Triggered when the user moves the focus on another node

#### Event Data

##### e.node `Element`

The focused node
