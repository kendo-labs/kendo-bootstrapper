---
title: kendo.Router
slug: api-framework-router
tags: api,framework
publish: true
---

# kendo.Router

## Methods

### start

Activates the router binding to the URL fragment part changes.

### Example

    <script>
        var router = new kendo.Router();

        $(function() {
            router.start();
        });
    </script>

### route

Specifies a callback for the given route. The route definition can contain **bound parameters**, **optional segments**, and **route globbing**.
The parsed parts of the URL are passed as parameters to the route callback.

#### Example

    <script>
        var router = new kendo.Router();

        router.route("/items/:category/:id", function(category, id) {
            console.log(category, "item with", id, " was requested");
        });

        $(function() {
            router.start();

            // ...

            router.navigate("/items/books/59");
        });
    </script>

#### Parameters

##### route `String`

The route definition.

##### callback `Function`

The callback to be executed when the route is matched.

### navigate

Navigates to the given route.

#### Parameters

##### route `String`

The route to navigate to.

##### silent `Boolean` **(default: false)**

If set to true, the router callbacks will not be called.

### destroy

Unbinds the router instance listeners from the URL fragment part changes.

## Events

### change

Triggered when the frament part of the url changes.

#### Event Data

##### e.url `String`

The fragment part of the URL

> Calling the `pretentDefault` method of the event object will stop the change and restore the previous URL.

### routeMissing

Triggered when the url does not match any of the provided routes.

#### Example

    <script>
    var router = new kendo.Router({ routeMissing: function(e) { console.log(e.url) } });

    $(function() {
        router.start();
        router.navigate("/foo");
    });
    </script>


#### Event Data

##### e.url `String`

The fragment part of the URL
