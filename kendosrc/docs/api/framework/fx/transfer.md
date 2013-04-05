---
title: FX Transfer
slug: api-fx-transfer
publish: true
---

# Transfer

> Currently this effect is supported only in Google Chrome, Firefox and IE10+.

Scales and repositiones the element on top of the provided target. The element and the target should have the same proportions.

> **Note**: The first time the effect performs, the element is detached from its current position and re-attached in the body element.


    <div id="foo" style="width: 200px; height: 200px">
        I will be animated to a given target
    </div>

    <div id="bar" style="width: 50px; height: 50px">
        Target
    </div>


    <script>
        kendo.fx($("#foo")).transfer($("#bar")).play();
    </script>

## Constructor Parameters

### Traget `jQuery`

The target element to transfer to.

