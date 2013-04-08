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

### badge

**Introduced in Q1 2013 SP** Sets a badge on the **Button** with the specified value. If invoked without parameters, returns the current badge value. Set the value to false to remove the badge.

#### Parameters

##### value `String|Boolean`

The target value to be set or false to be removed.

#### Returns

`String|kendo.mobile.ui.Button` Returns the badge value if invoked without parameters, otherwise returns the Button object.

#### Example

    var button = $("#button").data("kendoMobileButton");

    // Set the badge value to 5
    button.badge(5);

    // Get the current badge value
    button.badge();

    // Remove the badge
    button.badge(false);

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
