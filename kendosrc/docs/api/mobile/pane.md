---
title: kendo.mobile.ui.Pane
meta_title: Configuration, methods and events of Kendo UI Mobile Pane
meta_description: See how to easily configure the id of the initial mobile View to display, the default Pane layout, loading popup text, default View transition and more.
slug: api-mobile-pane
relatedDocs: gs-mobile-pane
tags: api,mobile
publish: true
---

# kendo.mobile.ui.Pane

## Configuration

### initial `String`

 The id of the initial mobile View to display.

### layout `String`

 The id of the default Pane Layout.

### loading `String`*(default: Loading...)*

 The text displayed in the loading popup. Setting this value to false will disable the loading popup.

### transition `String`

 The default View transition.

## Methods

### destroy
Prepares the **Pane** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Pane element from DOM.

#### Example

    var pane = $("#pane").data("kendoMobilePane");

    // detach events
    pane.destroy();

### hideLoading

Hide the loading animation.

### navigate

Navigate the local or remote view.

#### Navigate to a remote view

    <div data-role="pane" id="main-pane">
    </div>

    <script>
    var pane = $("#main-pane").data("kendoMobilePane");
    pane.navigate("settings.html");
    </script>

#### Navigate to a local view

    <div data-role="pane" id="main-pane">
      <div data-role="view" id="foo"> ... </div>
    </div>

    <script>
    var pane = $("#main-pane").data("kendoMobilePane");
    pane.navigate("#foo");
    </script>

#### Parameters

##### url `String`

The id or URL of the view.

##### transition `String`

The transition to apply when navigating. See View Transitions section for more
information.

### showLoading

Show the loading animation.

### view

Get a reference to the current view.

#### Returns

`kendo.mobile.ui.View` the view instance.

## Events

### navigate

Triggered when pane navigates to a view.

#### Event Data

##### e.url `jQuery`

The url of the view

### viewShow

Triggered after the pane displays a view.

#### Event Data

##### e.view `kendo.mobile.ui.View`

The displayed view
