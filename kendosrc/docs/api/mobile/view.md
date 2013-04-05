---
title: kendo.mobile.ui.View
meta_title: Configuration, methods and events of Kendo UI Mobile View
meta_description: How to configure Kendo UI mobile view widget and use events to create highly interactive mobile applications.
slug: api-mobile-view
relatedDocs: gs-mobile-view
tags: api,mobile
publish: true
---

# kendo.mobile.ui.View

## Configuration

### model `String | ObservableObject`*(default: null)*

The MVVM model to bind to. If a string is passed, The view will try to resolve a reference to the view model variable in the global scope.

#### Example

    <script>
     var foo = { bar: "baz" }
    </script>

    <div data-role="view" data-model="foo">
       <span data-bind="text:bar"></span>
    </div>

### reload `Boolean` *(default: null)*

Applicable to remote views only. If set to true, the remote view contents will be reloaded from the server (using Ajax) each time the view is navigated to.

### Example

    <!-- foo.html -->
    <div data-role="view">
        <a data-role="button" href="bar.html">Go to bar</a>
    </div>

    <!-- bar.html -->
    <div data-role="view" data-reload="true">
        I will be requested from the server every time I am displayed
      <a href="#" id="link">Link</a>
    </div>

### stretch `Boolean`*(default: false)*

If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling.
Useful if the view contains an image or a map.

### title `String`

The text to display in the navbar title (if present) and the browser title.

### useNativeScrolling `Boolean`*(default: false)*

(available since Q1 2013)
If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8).
Native scrolling is only enabled on platforms that support it: iOS > 4, Android > 2, WP8. BlackBerry devices do support it, but the native scroller is flaky.

### zoom `Boolean`*(default: false)*

If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.

## Methods

### destroy
Prepares the **View** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the View element from DOM.

#### Example

    var view = $("#myView").data("kendoMobileView");

    // detach events
    view.destroy();

### contentElement
Retrieves the current content holder of the View - this is the content element if the View is stretched or the scroll container otherwise.

> **Important:** Use this method to get a reference container in order to remove or append contents to the View

#### Example

    var view = $("#myView").data("kendoMobileView");

    view.contentElement();

## Events

### afterShow

Fires after the mobile View becomes visible. If the view is displayed with transition, the event is triggered after the transition is complete.

#### Example

    <div data-role="view" id="foo">
        <a href="#bar" data-role="button">Go to bar</a>
    </div>

    <div data-role="view" id="bar" data-after-show="afterShow">
        Bar
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function afterShow(e) {
            console.log(e.view);
        }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### beforeShow

Fires before the mobile View becomes visible. The event can be prevented by calling the `preventDefault` method of the event parameter, in case a redirection should happen.

#### Example

    <div data-role="view" id="foo">
        <a href="#protected" data-role="button">Go to protected</a>
    </div>

    <div data-role="view" id="protected" data-before-show="redirectBack">
        I am a protected view
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function redirectBack(e) {
            e.preventDefault();
            app.navigate("#foo");
        }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### hide

Fires when the mobile View becomes hidden.

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### init

Fires after the mobile View and its child widgets are initialized.

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### show

Fires when the mobile View becomes visible.

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance
