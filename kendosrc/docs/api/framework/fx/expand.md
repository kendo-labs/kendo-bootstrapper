---
title: FX Expand
slug: api-fx-expand
publish: true
---

# Expand

Expends the element from zero to its regular size.
Supported directions are `horizontal` and `vertical`.
Playing the effect in reverse will collapse the element to zero size and hide it.

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).expand("horizontal").play();
        // or
        kendo.fx($("#foo")).expandHorizontal().play();
    </script>

## Constructor Parameters

### Direction

The direction in which the element will be expanded
