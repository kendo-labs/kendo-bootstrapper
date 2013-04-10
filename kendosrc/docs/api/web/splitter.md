---
title: kendo.ui.Splitter
meta_title: Configuration, methods and events of Kendo UI Splitter
meta_description: Step by step guide and code examples for successful configuration of Splitter UI widget, supported methods and events types.
slug: api-web-splitter
relatedDocs: gs-web-splitter-overview
tags: api,web
publish: true
---

# kendo.ui.Splitter

Represents the Kendo UI Splitter widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### orientation `String`*(default: "horizontal")*

Specifies the orientation of the **Splitter**.


#### *"horizontal"*

Define horizontal orientation of the splitter.

#### *"vertical"*

Define vertical orientation of the splitter.

### panes `Array`

An array of pane definitions.

#### Example

    $("#splitter").kendoSplitter({
        panes: [
            { size: "200px", min: "100px", max: "300px" },
            { size: "20%", resizable: false },
            { collapsed: true, collapsible: true }
        ]
    });

### panes.collapsed `Boolean`*(default: false)*

Specifies whether a pane is initially collapsed (**true**) or expanded (**true**).

### panes.collapsible `Boolean`*(default: false)*

Specifies whether a pane is collapsible (**true**) or not collapsible (**false**).

### panes.contentUrl `String`

Specifies the URL from which to load the content of a pane.

### panes.max `String`

Specifies the maximum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot exceed the defined maximum size.

### panes.min `String`

Specifies the minimum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot be less than the defined minimum size.

### panes.resizable `Boolean`*(default: true)*

Specifies whether a pane is resizable (**true**) or not resizable (**false**).

### panes.scrollable `Boolean`*(default: true)*

Specifies whether a pane is scrollable (**true**) or not scrollable (**false**).

### panes.size `String`

Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). Note: This
value must not exceed **panes.max** or be less then **panes.min**.

## Methods

### ajaxRequest

Loads the content of a pane from a local or remote URL.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // load content into the pane with ID, pane1
    splitter.ajaxRequest("#pane1", "/customer/profile", { id: 42 });

#### Parameters

##### pane `Selector | DOM Element`

The targetted pane whose content is to be loaded via a URL.

##### url `String`

A local or remote URL from which the content of the pane is to be loaded.

##### data `Object | String`

Any data that is necessary to be sent to the server.

### collapse

Collapses a specified pane. Invoking this method will force the **Splitter** to redraw and it
will trigger layoutChange and resize events. Note: Invoking the method will not trigger a collapse event.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // collapse the pane with ID, pane1
    splitter.collapse("#pane1");

#### Parameters

##### pane `Selector | DOM Element`

The pane to be collapsed.

### destroy
Prepares the **Splitter** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Splitter element from DOM.

#### Example

    var splitter = $("#splitter").data("kendoSplitter");

    // detach events
    splitter.destroy();

### expand

Expands a specified pane. Invoking this method will force the **Splitter** to redraw and it
will trigger layoutChange and resize events. Note: Invoking the method will not trigger an expand event.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // expand the pane with ID, pane1
    splitter.expand("#pane1");

#### Parameters

##### pane `Selector | DOM Element`

The pane to be expanded.

### max

Sets the maximum size of a pane. Setting this value will not cause the **Splitter** to
redraw, nor will it trigger any events.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // set the maximum size of the pane with ID, pane1
    splitter.max("#pane1", "300px");

#### Parameters

##### pane `Selector | DOM Element`

The pane being targetted for a new minimum size configuration value.

##### value `String`

The maximum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").

### min

Sets the minimum size of a pane. Setting this value will not cause the **Splitter** to
redraw, nor will it trigger any events.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // set the minimum size of the pane with ID, pane1
    splitter.min("#pane1", "100px");

#### Parameters

##### pane `Selector | DOM Element`

The pane being targetted for a new minimum size configuration value.

##### value `String`

The minimum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").

### size

Set the size of the pane. Setting this value will cause the **Splitter** to redraw and it will
trigger layoutChange and resize events.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // set the size of the pane with ID, pane1
    splitter.size("#pane1", "200px");

#### Parameters

##### pane `Selector | DOM Element`

The pane to be resized.

##### value `String`

The new size of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). Note: This value
must not exceed **panes.max** or be less then **panes.min**.

### toggle

Toggles the state of a specified pane (i.e. collapsed or expanded). Invoking this method will force the
**Splitter** to redraw and it will trigger layoutChange and resize events. Note: Invoking the
method will not trigger collapse or expand events.

#### Example

    // get a reference to the splitter
    var splitter = $("#splitter").data("kendoSplitter");
    // toggle the state of the pane with ID, pane1
    splitter.toggle("#pane1");
    // toggle the state of the pane with ID, pane1 to be expanded
    splitter.toggle("#pane1", true);
    // toggle the state of the pane with ID, pane1 to be collapsed
    splitter.toggle("#pane1", false);

#### Parameters

##### pane `Selector | DOM Element`

The pane to be collapsed.

##### expand `Boolean`

(Optional)
Represents the desired state of the specified pane; to be expanded (**true**) or collapsed
(**false**). If undefined, toggle() will collapse the pane if it is expanded or will expand the
pane if it is collapsed.

## Events

### collapse

Triggered when a pane of a Splitter is collapsed.

#### Attach expand event handler during initialization; detach via unbind()

    // event handler for expand
    var onCollapse = function(e) {
        // access the collapsed item via e.pane (Element)
    };

    // attach collapse event handler during initialization
    var splitter = $("#splitter").kendoSplitter({
        collapse: onCollapse
    });

    // detach collapse event handler via unbind()
    splitter.data("kendoSplitter").unbind("collapse", onCollapse);

#### Attach collapse event handler via bind(); detach via unbind()

    // event handler for collapse
    var onExpand = function(e) {
        // access the collapsed item via e.pane (Element)
    };

    // attach collapse event handler via bind()
    $("#splitter").data("kendoSplitter").bind("collapse", onCollapse);

    // detach collapse event handler via unbind()
    $("#splitter").data("kendoSplitter").unbind("collapse", onCollapse);

#### Event Data

##### e.pane `Element`

The collapsing pane of the Splitter.

### contentLoad

Triggered when the content for a pane has finished loading.

#### Attach contentLoad event handler during initialization; detach via unbind()

    // event handler for contentLoad
    var onContentLoad = function(e) {
        // access the loaded pane via e.pane (Element)
    };

    // attach contentLoad event handler during initialization
    var splitter = $("#splitter").kendoSplitter({
        contentLoad: onContentLoad
    });

    // detach contentLoad event handler via unbind()
    splitter.data("kendoSplitter").unbind("contentLoad", onContentLoad);

#### Attach contentLoad event handler via bind(); detach via unbind()

    // event handler for contentLoad
    var onContentLoad = function(e) {
        // access the loaded pane via e.pane (Element)
    };

    // attach contentLoad event handler via bind()
    $("#splitter").data("kendoSplitter").bind("contentLoad", onContentLoad);

    // detach contentLoad event handler via unbind()
    $("#splitter").data("kendoSplitter").unbind("contentLoad", onContentLoad);

#### Event Data

##### e.pane `Element`

The pane whose content has been loaded.

### expand

Triggered when a pane of a Splitter is expanded.

#### Attach expand event handler during initialization; detach via unbind()

    // event handler for expand
    var onExpand = function(e) {
        // access the expanded item via e.pane (Element)
    };

    // attach expand event handler during initialization
    var splitter = $("#splitter").kendoSplitter({
        expand: onExpand
    });

    // detach expand event handler via unbind()
    splitter.data("kendoSplitter").unbind("expand", onExpand);

#### Attach expand event handler via bind(); detach via unbind()

    // event handler for expand
    var onExpand = function(e) {
        // access the expanded item via e.pane (Element)
    };

    // attach expand event handler via bind()
    $("#splitter").data("kendoSplitter").bind("expand", onExpand);

    // detach expand event handler via unbind()
    $("#splitter").data("kendoSplitter").unbind("expand", onExpand);

#### Event Data

##### e.pane `Element`

The expanding pane of the Splitter.

### layoutChange

Fires when the splitter layout has changed

#### Attach layoutChange event handler during initialization; detach via unbind()

    // event handler for resize
    var onLayoutChange = function(e) {
        // ...
    };

    $("#splitter").kendoSplitter({
        layoutChange: onLayoutChange
    });

#### Attach layoutChange event handler via bind(); detach via unbind()

    // event handler for layoutChange
    var onLayoutChange = function(e) {
        // ...
    };

    // attach layoutChange event handler via bind()
    $("#splitter").bind("layoutChange", onLayoutChange);

    // detach layoutChange event handler via unbind()
    $("#splitter").unbind("layoutChange", onLayoutChange);

### resize

Triggered when a pane is resized.

#### Attach resize event handler during initialization; detach via unbind()

    // event handler for resize
    var onResize = function(e) {
        // ...
    };

    // attach resize event handler during initialization
    var splitter = $("#splitter").kendoSplitter({
        resize: onResize
    });

    // detach resize event handler via unbind()
    splitter.data("kendoSplitter").unbind("resize", onResize);

#### Attach resize event handler via bind(); detach via unbind()

    // event handler for resize
    var onResize = function(e) {
        // ...
    };

    // attach resize event handler via bind()
    $("#splitter").data("kendoSplitter").bind("resize", onResize);

    // detach resize event handler via unbind()
    $("#splitter").data("kendoSplitter").unbind("resize", onResize);
