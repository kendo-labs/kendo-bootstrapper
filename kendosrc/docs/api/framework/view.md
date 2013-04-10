---
title: kendo.View
slug: api-framework-view
tags: api,framework
publish: true
---

# kendo.View

## Configuration

### model `ObservableObject`*(default: null)*

The MVVM model to bind the element to.

#### Example

    <div id="app"></div>
    <script>
     var foo = { foo: "foo" }
     var view = new kendo.View('<span data-bind='text:foo"></span>', { model: foo });
     view.render($("#app"));
    </script>

### tagName `String` *(default: "div")*

The tag used for the root element of the view.

#### Example

    <div id="app"></div>

    <script>
     var view = new kendo.View("Hi!", { tagName: "span" });
     view.render($("#app"));
    </script>

### wrap `Boolean` *(default: true)*

If set to `false`, the view will not wrap its contents in a root element. In that case, the view element will point to the root element in the template.

#### Example

    <div id="app"></div>

    <script>
     var view = new kendo.View('<div id="foo"></div>', { wrap: false });
     view.render($("#app"));
     console.log(view.element.attr('id')) // foo
    </script>

## Methods

### destroy

Removes the **View** element from the DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

#### Example

    <div id="app"></div>

    <script>
    var view = new kendo.View("Hi!", { tagName: "span" });
    view.render($("#app"));
    view.destroy();
    </script>

### render

Renders the view contents. Accepts a jQuery selector (or jQuery object) to which the contents will be appended.
Alternatively, the render method can be called without parameters in order to retrieve the View element for manual insertion/further manipulation.

#### Example

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        index.render("#app");
    </script>

#### Example

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        $("#app").append(index.render());
    </script>

#### Parameters

##### container `jQuery`

(Optional) the element in which the view element will be appended.

#### Returns

`jQuery` the view element.

## Events

### hide

Fires when the View is replaced in a layout placeholder.

#### Example

    <div id="app"></div>

    <script>
        var foo = new kendo.View("<span>Foo</span>", { hide: function() { console.log("Foo is hidden now"); });
        var bar = new kendo.View("<span>Bar</span>");

        var layout = new kendo.Layout("<header>Header</header><section id="content"></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", foo);
        layout.showIn("#content", bar);
    </script>

### init

Fires the first time the view renders.

#### Example

    <div id="app"></div>

    <script>
        var view = new kendo.View("Hi!", { init: function() { console.log("View is initiated") } });
        view.render($("#app"));
    </script>

### show

Fires when after the mobile View is rendered (either by calling `render`, or by being rendered from the **Layout** `showIn` method).

#### Example

    <div id="app"></div>

    <script>
        var view = new kendo.View("Hi!", { show: function() { console.log("View is rendered") } });
        view.render($("#app"));
    </script>

## Fields

### element `jQuery`

The element of the **View**. Gets instantiated after the `render` method is called.

