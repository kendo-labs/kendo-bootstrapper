---
title: FX Flip
slug: api-fx-flip
publish: true
---

# Flip

Flips the element around the axis specified by the axis parameter.  Supported directions are `horizontal` and `vertical`.

> **Note** The effect needs certain markup and styling in order to function properly.
> The element should be positioned absolutely/relatively, and contain two child elements (face and back) with the same size as their parent, positioned absolutely on top of each other.

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
        }

        #foo {
            position: absolute;
            width: 200px;
            height: 200px;
            background: blue;
        }

        #bar {
            position: absolute;
            width: 200px;
            height: 200px;
            background: red;
        }

    </style>

    <div id="container">
        <div id="bar"> Page 2</div>
        <div id="foo"> Page 1</div>
    </div>

    <script>
        kendo.fx($("#container")).flip("horizontal", $("#foo"), $("#bar")).play();
        kendo.fx($("#container")).flipHorizontal($("#foo"), $("#bar")).play();
    </script>

## Constructor Parameters

### Axis `String`

The axis of the flip.

### Face `jQuery`

The initially visible element in the container.

### Back `jQuery`

The finally visible element in the container.
