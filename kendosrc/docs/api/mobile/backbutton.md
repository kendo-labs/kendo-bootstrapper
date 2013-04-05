---
title: kendo.mobile.ui.BackButton
meta_title: Configuration, methods and events of Kendo UI Mobile BackButton
meta_description: Examples how to initialize Kendo UI mobile BackButton based on role data attribute and using jQuery plugin syntax.
slug: api-mobile-backbutton
relatedDocs: gs-mobile-backbutton
tags: api,mobile
publish: true
---

# kendo.mobile.ui.BackButton

Represents the Kendo UI Mobile BackButton widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## BackButton

The mobile BackButton widget navigates to the previously visited mobile View when pressed. A view can be explicitly set using the `href` attribute.

#### Initialize Kendo mobile BackButton based on role data attribute

    <a data-role="backbutton">Foo</a>

#### Initialize Kendo mobile BackButton using jQuery plugin syntax

    var button = $("#button").kendoMobileBackButton();

## Methods

### destroy
Prepares the **BackButton** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the BackButton element from DOM.

#### Example

    var backButton = $("#backButton").data("kendoMobileBackButton");

    // detach events
    backButton.destroy();

## Events

### click

Fires when the user taps the button.

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element
