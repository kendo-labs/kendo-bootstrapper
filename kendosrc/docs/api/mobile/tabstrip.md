---
title: kendo.mobile.ui.TabStrip
meta_title: Configuration, methods and events of Kendo UI Mobile TabStrip
meta_description: How to configure Mobile Tabstrip widget with a few clicks, change its behavior and use supported events.
slug: api-mobile-tabstrip
relatedDocs: gs-mobile-tabstrip
tags: api,mobile
publish: true
---

# kendo.mobile.ui.TabStrip

Represents the Kendo UI Mobile TabStrip widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Configuration

### selectedIndex `Number`*(default: 0)*

 The index of the initially selected tab.

## Methods

### currentItem

Get the currently selected tab DOM element.

#### Returns

`jQuery` the currently selected tab DOM element.

### destroy
Prepares the **TabStrip** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TabStrip element from DOM.

#### Example

    var tabStrip = $("#tabStrip").data("kendoMobileTabStrip");

    // detach events
    tabStrip.destroy();

### switchTo

Set the mobile TabStrip active tab to the tab with the specified url. This method doesn't change the current View. To change the View, use Application's [navigate](/api/mobile/application#navigate) method instead.

#### Example

    <div data-role="tabstrip" id="tabstrip"> <a href="#foo">Foo</a> </div>

    <script>
        $(function() {
            $("#tabstrip").data("kendoMobileTabStrip").switchTo("#foo");
        });
    </script>

#### Parameters

##### url `String`

The url of the tab.

### clear

Clear the currently selected tab.

## Events

### select

Fires when tab is selected.

#### Event Data

##### e.item `jQuery`

The selected tab
