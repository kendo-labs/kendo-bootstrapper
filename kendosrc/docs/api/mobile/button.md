---
title: kendo.mobile.ui.Button
meta_title: Configuration, methods and events of Kendo UI Mobile Button
meta_description: Find which events to use in Mobile Button Widget.
slug: api-mobile-button
relatedDocs: gs-mobile-button
tags: api,mobile
publish: true
---

# kendo.mobile.ui.Button

Represents the Kendo UI Mobile Button widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Configuration

### icon `String`

 The icon of the button. It can be either one of the built-in icons, or a custom one.

#### Example

    var button = $("#button").kendoMobileButton({ icon: "stop" });

## Methods

### destroy
Prepares the **Button** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Button element from DOM.

#### Example

    var button = $("#button").data("kendoMobileButton");

    // detach events
    button.destroy();

## Events

### click

Fires when the user taps the button.

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element
