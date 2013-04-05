---
title: kendo.mobile.ui.DetailButton
meta_title: Configuration, methods and events of Kendo UI Mobile DetailButton
meta_description: Documentation on how to initialize Kendo UI mobile DetailButton.
slug: api-mobile-detailbutton
relatedDocs: gs-mobile-detailbutton
tags: api,mobile
publish: true
---

# kendo.mobile.ui.DetailButton

Represents the Kendo UI Mobile DetailButton widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## DetailButton

The DetailButton widget navigates to a mobile View when pressed.

#### Initialize Kendo mobile DetailButton based on role data attribute

    <a data-role="detailbutton">Foo</a>

#### Initialize Kendo mobile DetailButton using jQuery plugin syntax

    var button = $("#button").kendoMobileDetailButton();

## Methods

### destroy
Prepares the **DetailButton** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DetailButton element from DOM.

#### Example

    var detailButton = $("#detailButton").data("kendoMobileDetailButton");

    // detach events
    detailButton.destroy();

## Events

### click

Fires when the user taps the button.

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element
