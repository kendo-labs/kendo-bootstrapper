---
title: kendo.Layout
slug: api-framework-layout
tags: api,framework
publish: true
---

# kendo.Layout

The Layout class inherits from the [View](/api/framework/view) and provides the additional functionality of rendering other views/layouts in the element.

## Methods

### showIn

Renders the **View** element in the element specified by the selector

#### Example

    <div id="app"></div>

    <script>
        var view = new kendo.View("<span>Foo</span>");

        var layout = new kendo.Layout("<header>Header</header><section id="content"></section><footer></footer>");

        layout.render($("#app"));

        layout.showIn("#content", view);
    </script>

#### Parameters

##### container `String`

The selector of the container in which the view element will be appended.

##### view `kendo.View`

The view instance that will be rendered.
