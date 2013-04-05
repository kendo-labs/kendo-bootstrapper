---
title: kendo.mobile.ui.Swipe
meta_title: Configuration, methods and events of Kendo UI Mobile Swipe
meta_description: Configure swipe event criteria by passing an additional parameter for minimum horizontal distance, maximum vertical deviation, timing, and swipe surface.
slug: api-mobile-swipe
relatedDocs: gs-mobile-swipe
tags: api,mobile
publish: true
---

# kendo.mobile.ui.Swipe

### Configuration

The swipe event criteria (minimum horizontal distance, maximum vertical deviation, timing, and swipe surface) can be configured by passing an additional parameter to the `kendoMobileSwipe` method. For more details, see the configuration section.

#### Listen only for longer and faster swipe events

    <div>
        <p>Foo</p>
        <p>Bar</p>
    </div>

    <script>
        $("p").kendoMobileSwipe(function(e) {
            console.log("You swiped" + e.target.text() );
        }, { minXDelta: 200, maxDuration: 100 });
    </script>

## Configuration

### maxDuration `Number`*(default: 1000)*

 The maximum amount of time in milliseconds the swipe event can last. Slower swipes are discarded.

### maxYDelta `Number`*(default: 10)*

 The maximum vertical deviation in pixels of the swipe event. Swipe with higher deviation are discarded.

### minXDelta `Number`*(default: 30)*

 The minimum horizontal distance in pixels the user should swipe before the event is triggered.

### surface `jQuery`

By default, swipe events are tracked only within the element boundries. If a surface is specified, the swipe events are extended to the provided surface. This is useful if  the swipe targets are small (or narrow).
