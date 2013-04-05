---
title: kendo.mobile.ui.NavBar
meta_title: Configuration, methods and events of Kendo UI Mobile NavBar
meta_description: How to use methods in Mobile NavBar widget.
slug: api-mobile-navbar
relatedDocs: gs-mobile-navbar
tags: api,mobile
publish: true
---

# kendo.mobile.ui.NavBar

Represents the Kendo UI Mobile NavBar widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Methods

### destroy
Prepares the **NavBar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the NavBar element from DOM.

#### Example

    var navBar = $("#navBar").data("kendoMobileNavBar");

    // detach events
    navBar.destroy();

### title

Update the title element text. The title element is specified by setting the `role` data attribute to `view-title`.

#### Example

    <div data-role="navbar" id="foo">
        <span data-role="view-title"></span>
    </div>

    <script>
      $("#foo").data("kendoMobileNavBar").title("Foo");
    </script>

#### Parameters

##### value `String`

The text of title
