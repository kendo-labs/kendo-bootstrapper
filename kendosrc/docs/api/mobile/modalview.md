---
title: kendo.mobile.ui.ModalView
meta_title: Configuration, methods and events of Kendo UI Mobile ModalView
meta_description: Set height and width of the Kendo UI Mobile ModalView container in pixels, use methods to open and close it.
slug: api-mobile-modalview
relatedDocs: gs-mobile-modalview
tags: api,mobile
publish: true
---

# kendo.mobile.ui.ModalView

Represents the Kendo UI Mobile ModalView widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Configuration

### height `Number`

The height of the ModalView container in pixels. If not set, the element style is used.

### modal `Boolean`*(default: true)*

 When set to false, the ModalView will close when the user taps outside of its element.

### width `Number`

The width of the ModalView container in pixels. If not set, the element style is used.

## Methods

### close

Close the ModalView

### destroy
Prepares the **ModalView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ModalView element from DOM.

#### Example

    var modalView = $("#modalView").data("kendoMobileModalView");

    // detach events
    modalView.destroy();

### open

Open the ModalView

#### Parameters

##### target `jQuery`

(optional) The target of the ModalView

## Events

### close

Fired when the mobile ModalView is closed by the user.

#### Example

    <div data-role="view">
        <a data-role="button" href="#foo" data-rel="modalview">Foo</a>
    </div>

    <div data-role="modalview" id="foo" data-close="onClose">
        Foo
    </div>

    <script>
        function onClose(e) {
            //handle event
        }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.ModalView`

The widget instance which fired the event.

### init

Fired when the mobile ModalView and its child widgets are initialized.

#### Example

    <div data-role="view">
        <a data-role="button" href="#foo" data-rel="modalview">Foo</a>
    </div>

    <div data-role="modalview" id="foo" data-init="onInit">
        Foo
    </div>

    <script>
        function onInit(e) {
            //handle event
        }
    </script>

#### Event Data

##### e.sender `kendo.mobile.ui.ModalView`

The widget instance which fired the event.

### open

Fires when the ModalView is shown.

#### Example

    <div data-role="view">
        <a data-role="button" href="#foo" data-rel="modalview">Foo</a>
    </div>

    <div data-role="modalview" id="foo" data-open="logTarget">
        Foo
    </div>

    <script>
        function logTarget(e) {
            console.log(e.target); // <a href="#foo" ...
        }
    </script>

#### Event Data

##### e.target `jQuery`

The invocation target of the ModalView.
