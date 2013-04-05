---
title: kendo.ui
meta_description: Documentation on helper methods for writing new widgets and show progress with a loading message.
slug: web-kendo.ui
tags: api,web
publish: true
---

# kendo.ui

## Methods

### plugin

Helper method for writing new widgets.
Exposes a jQuery plug-in that will handle the widget creation and attach its client-side object in the appropriate data-* attribute.

#### Example

    function TextBox(element, options) {
    }

    kendo.ui.plugin(TextBox);

    // initialize a new TextBox for each input, with the given options object.
    $("input").kendoTextBox({ });
    // get the TextBox object and call the value API method
    $("input").data("kendoTextBox").value();

#### Parameters

##### widget `kendo.ui.Widget`

The widget function.

##### register `Object` **(default: `kendo.ui`)**

The object where the reference to the widget is recorded.

##### prefix `String` **(default: `""`)**

The plugin function prefix, e.g. "Mobile" will register "kendoMobileFoo".

### progress

Shows an overlay with a loading message, indicating that an action is in progress.

#### Parameters

##### container `jQuery`

The container that will hold the overlay

##### toggle `Boolean`

Whether the overlay should be shown or hidden
