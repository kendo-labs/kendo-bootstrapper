---
title: kendo.mobile.ui.Drawer
meta_title: Configuration, methods and events of Kendo UI Mobile Drawer
meta_description: Set direction of the Kendo UI Mobile Drawer container, use methods to show and hide it.
slug: api-mobile-drawer
relatedDocs: gs-mobile-drawer
tags: api,mobile
publish: true
---

# kendo.mobile.ui.Drawer

Represents the Kendo UI Mobile Drawer widget. Inherits from [kendo.mobile.ui.View](/api/framework/view).

## Configuration

### position `String` *(default: 'left')*

The position of the drawer. Can be `left` (default) or `right`.

### title `String`

The text to display in the navbar title (if present).

### views `Array`

A list of the view ids on which the drawer will appear. If omitted, the drawer can be revealed on any view in the application.

#### Example

    <div data-role="view" id="drawer-settings">
        <h1>Settings</h1>
    </div>

    <div data-role="drawer" id="my-drawer" data-views="['drawer-home', 'drawer-settings'>
        <ul data-role="listview" data-style="inset">
            <li><a href="#drawer-home" data-transition="none">Home</a></li>
            <li><a href="#drawer-settings" data-transition="none">Settings</a></li>
        </ul>
    </div>

## Methods

### destroy

Prepares the **Drawer** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Drawer element from DOM.

#### Example

    var drawer = $("#my-drawer").data("kendoMobileDrawer");

    // detach events
    drawer.destroy();

### hide

Hide the Drawer

#### Example

    $("#my-drawer").data("kendoMobileDrawer").hide();

### show

Show the Drawer

#### Example

    $("#my-drawer").data("kendoMobileDrawer").show();

## Events

### beforeShow

Fires before the mobile Drawer is revealed. The event can be prevented by calling the `preventDefault` method of the event parameter.

#### Example

    <div data-role="drawer" data-before-show="prevent">
        I will not be displayed
    </div>

    <script>
        function prevent(e) {
            e.preventDefault();
        }
    </script>

### hide

Fired when the mobile Drawer is closed by the user.

#### Example

    <div data-role="drawer" id="foo" data-hide="onHide">
        Foo
    </div>

    <script>
        function onHide(e) {
            // handle event
        }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

### init

Fired when the mobile Drawer and its child widgets are initialized.

#### Example

    <div data-role="drawer" id="foo" data-init="onInit">
        Foo
    </div>

    <script>
        function onInit(e) {
            // handle event
        }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.

### show

Fires when the Drawer is shown.

#### Example

    <div data-role="drawer" data-show="onShow">
        Foo
    </div>

    <script>
        function onShow(e) {
            // handle event
        }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.Drawer`

The widget instance which fired the event.
