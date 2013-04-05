---
title: FX SlideIn
slug: api-fx-slidein
publish: true
---

# SlideIn

Slides the element to its original position in the specified direction, using the element width or height as an offset.
Supported directions are `left`, `right`, `up` and `down`.
Playing the effect in reverse will slide the element out of its position.

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).slideIn("left").play();
        // or
        kendo.fx($("#foo")).slideInLeft.play();
    </script>

## Constructor Parameters

### Direction

The direction to which the sliding will occur.
