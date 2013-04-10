---
title: kendo.mobile.ui.PopOver
meta_title: Configuration, methods and events of Kendo UI Mobile PopOver
meta_description: Guide to Kendo UI Mobile PopOver configuration options: set width and height of the popup in pixels and direction to which the popup will expand.
slug: api-mobile-popover
relatedDocs: gs-mobile-popover
tags: api,mobile
publish: true
---

# kendo.mobile.ui.PopOver

Represents the Kendo UI Mobile PopOver widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Configuration

### pane `Object`

The pane configuration options.

### pane.initial `String`

 The id of the initial mobile View to display.

### pane.layout `String`

 The id of the default Pane Layout.

### pane.loading `String`*(default: "Loading...")*

 The text displayed in the loading popup. Setting this value to false will disable the loading popup.

### pane.transition `String`

 The default View transition.

### popup `Object`

The popup configuration options.

### popup.direction String`*(default: "down")*

The direction to which the popup will expand, relative to the target that opened it.
Supported directions are up, right, down, and left.

### popup.height `Number | String`*(default: 320)*

 The height of the popup in pixels.

### popup.width `Number | String`*(default: 240)*

 The width of the popup in pixels.

## Methods

### close

Close the popover.

#### Close a popover when a button is clicked

    <div data-role="popover" id="foo">
     <a data-role="button" data-click="closePopOver">Close</a>
    </div>

    <script>
     function closePopOver() {
         $("#foo").data("kendoMobilePopOver").close();
     }
    </script>

### destroy
Prepares the **PopOver** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the PopOver element from DOM.

#### Example

    var popOver = $("#popOver").data("kendoMobilePopOver");

    // detach events
    popOver.destroy();

### open

Open the PopOver.

#### Parameters

##### target `jQuery`

The target of the Popover, to which the visual arrow will point to. This parameter is required for a tablet OS.

## Events

### close

Fires when popover is closed.

### open

Fires when popover is opened.

#### Event Data

##### e.target `jQuery`

The DOM element, which triggered the popover opening.

