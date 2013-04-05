---
title: FX Zoom
slug: api-fx-zoom
publish: true
---

# Zoom

Zoom the element in or out.
Supported directions are `in` and `out`.

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).zoom("out").play();
        // or
        kendo.fx($("#foo")).zoomOut.play();
    </script>

## Constructor Parameters

### Direction

The direction of the effect.

## Methods

### startValue

Sets the zoom value for the element when it is zoomed in. By default the element zooms in to a scale of 1.

#### Parameters

##### value `Number`

the zoom in value.

#### Returns

`Effect` The effect instance

### endValue

Sets the zoom value for the element when it is zoomed out. By default the element zooms in to a scale of 0.01.

#### Parameters

##### value `Number`

the zoom out value.

#### Returns

`Effect` The effect instance


