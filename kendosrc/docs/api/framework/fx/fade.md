---
title: FX Fade
slug: api-fx-fade
publish: true
---

# Fade

Fades the element in or out.
Supported directions are `in` and `out`.

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fade("out").play();
        // or
        kendo.fx($("#foo")).fadeOut.play();
    </script>

## Constructor Parameters

### Direction

The direction of the effect.

## Methods

### startValue

Sets the zoom value for the element when it is faded in. By default the element fades in to opacity value of 1.

#### Parameters

##### value `Number`

the fade in value.

#### Returns

`Effect` The effect instance

### endValue

    Sets the fade value for the element when it is faded out. By default the element fades in to opacity value of 0.

#### Parameters

##### value `Number`

the fade out value.

#### Returns

`Effect` The effect instance


