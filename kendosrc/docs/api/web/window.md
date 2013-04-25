---
title: kendo.ui.Window
meta_title: Configuration, methods and events of Kendo UI Window
meta_description: How to initialize Window UI widget and configure its behaviors, center a window, set its content and toggle the state of the UI widget.
slug: api-web-window
relatedDocs: gs-web-window-overview
tags: api,web
publish: true
---

# kendo.ui.Window

Represents the Kendo UI Window. Inherits from [Widget](/api/framework/widget).

## Configuration

### actions `Array`*(default: ["Close"])*

The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize",
and "Maximize".

### animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

### animation.close `Object`

The animation that will be used when a Window closes.

### animation.close.effects `String`

Effect to be used for closing of the popup.

### animation.close.duration `Number`

Difines the animation duration.

### animation.open `Object`

The animation that will be used when a Window opens.

### animation.open.effects `String`

Effect to be used for opening of the popup.

### animation.open.duration `Number`

Difines the animation duration.

### appendTo `Object|String`*(default: document.body)*

The element that the Window will be appended to.
Note that this *does not* constrain the window dragging within the given element.

#### Set the window container to be the form with id="mainForm"

    $("#dialog").kendoWindow({
        appendTo: "#mainForm"
    });

### content `Object|String`

Specifies a URL or request options that the window should load its content from.

Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

### content.template `String`

Template for the content of a **Window**.

### draggable `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability for users to move/drag a
**Window**.

### iframe `Boolean`

Explicitly states whether content iframe should be created.

### maxHeight `Number`*(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the window.

### maxWidth `Number`*(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the window.

### minHeight `Number`*(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the window.

### minWidth `Number`*(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the window.

### modal `Boolean`*(default: false)*

Specifies whether the window should show a modal overlay over the page.

### pinned `Boolean`*(default: false)*

Specifies whether the window should be pinned, i.e. it will not move together with the page content during scrolling.

### position `Object`

A collection of one or two members, which define the initial Window's top and/or left position on the page.

### position.top `Number`

Specifies the initial top position of the window.

### position.left `Number`

Specifies the initial left position of the window.

### resizable `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability for users to resize a
**Window**.

### title `String|Boolean`*default: ""*

The text in the window title bar. If `false`, the window will be displayed without a title bar. Note that this will prevent the window from being dragged, and the window titlebar buttons will not be shown.

### visible `Boolean`*(default: true)*

Specifies whether the window will be initially visible.

### width `Number`

Specifies width of the window.

### height `Number`

Specifies height of the window.

## Methods

### center

Centers a **Window** within the viewport.

#### Example

    var kendoWindow = $("#window").data("kendoWindow");
    kendoWindow.center();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### close

Closes a Window.

#### Close a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").close();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### content

Gets or set the content of a **Window**.

#### Get the existing content of the Window

    var kendoWindow = $("#window").data("kendoWindow");
    var windowContent = kendoWindow.content();

#### Set the content of a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").content("Kendo UI for all the things!");

#### Parameters

##### content `String`

_optional, default: _

The content of the Window.

#### Returns

`kendo.ui.Window` If content is provided, this method will return the (Kendo UI) Window object to support chaining. Otherwise,
it will return the current content of the (Kendo UI) Window.

### destroy

Destroys the window and its modal overlay, if necessary. Removes the Window HTML elements from the DOM.

### maximize

Maximizes a Window to the entire viewing area of the user agent. Triggers the resize event.

#### Maximize a Window

    $("#window").data("kendoWindow").maximize();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### minimize

Maximizes a Window to its title bar.

#### Minimize a Window

    $("#window").data("kendoWindow").minimize();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### open

Opens a Window.

#### Open a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").open();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### pin

Pins the Window at its current position with a position:fixed style, i.e. the widget stops moving together with the other page content when the page is scrolled.
The user will still be able to move the Window with the mouse or keyboard.

### refresh

Refreshes the content of a Window from a remote URL.

#### Example

    var windowObject = $("#window").data("kendoWindow");
    windowObject.refresh("/feedbackForm");

    windowObject.refresh({
        url: "/feedbackForm",
        data: { userId: 42 }
    });

    windowObject.refresh({
        url: "/userInfo",
        data: { userId: 42 },
        template: "Hello, #= firstName # #= lastName #"
    });

#### Parameters

##### options `Object|String`

Options for requesting data from the server.
If omitted, the window uses the `content` property
that was supplied when the window was created.
Any options specified here are passed to jQuery.ajax().

##### options.url `String`

The server URL that will be requested.

##### options.data `Object`

A JSON object containing the data that will be passed to the server.

##### options.type `String`

The HTTP request method ("GET", "POST").

##### options.template `String`

A template to be used for displaying the requested data.

##### options.iframe `Boolean`

Indicates whether the content should be fetched within an iframe, or with AJAX and rendered in the same page.

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### restore

Restores a maximized or minimized Window to its previous state. Triggers the resize event.

#### Restore the state of a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").restore();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### setOptions

Allows the window to be configured with new options.

#### Set new dimensions to the window

    var kendoWindow = $("#window").data("kendoWindow");

    kendoWindow.setOptions({
        width: 180,
        height: 225
    });

### title

Gets or set the title of a **Window**.

#### Get the existing title of the Window

    var kendoWindow = $("#window").data("kendoWindow");
    var windowTitle = kendoWindow.title();

#### Set the title of a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").title("Do a barrel roll!");

#### Parameters

##### text `String`

_optional, default: _

The title of the Window.

#### Returns

`kendo.ui.Window` If a title is provided, this method will return the (Kendo UI) Window object to support chaining. Otherwise,
it will return the current title of the (Kendo UI) Window.

### toFront

Brings forward a Window to the top of the z-index.

#### Bring forward a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").toFront();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### toggleMaximization

Toggles a Window between a maximized and restored state. Triggers the resize event.

#### Toggle the state of a Window; utilize chaining (if necessary)

    var kendoWindow = $("#window").data("kendoWindow").toggleMaximization();

#### Returns

`kendo.ui.Window` Returns the (Kendo UI) Window object to support chaining.

### unpin

Disables the Window's pinned state, so that the widget will move together with the other page content when the page is scrolled.

## Events

### activate

Triggered when a Window has finished its opening animation.

### close

Triggered when a Window is closed (by a user or through the close() method).

### deactivate

Triggered when a Window has finished its closing animation.

### dragend

Triggered when a Window has been moved by a user.

### dragstart

Triggered when the user starts to move the window.

### error

Triggered when an AJAX request for content fails.

#### Arguments

##### xhr `jqXHR`

The XHR request object, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

##### status `String`

The status of the request, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

### open

Triggered when a Window is opened (i.e. the open() method is called).

### refresh

Triggered when the content of a Window has finished loading via AJAX,
when the window iframe has finished loading, or when the refresh button
has been clicked on a window with static content.

### resize

Triggered when a Window has been resized by a user.

