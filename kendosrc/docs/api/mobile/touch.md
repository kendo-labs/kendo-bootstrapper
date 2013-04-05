---
title: kendo.ui.Touch
slug: mobile-kendo.ui.touch
tags: api,mobile
publish: true
---

# kendo.ui.Touch

The kendo Touch widget exposes a cross-platform compatible API for handling user-initiated touch events, multi-touch gestures and event sequences (drag, swipe, etc.). Inherits from [Widget](/api/framework/widget).

## Configuration

### surface `jQuery` *(default:  null)*

If specified, the user drags will be tracked within the surface boundaries.
This option is useful if the widget is instantiated on small DOM elements like buttons, or thin list items.

#### Example
    <ul id="list">
        <li>Foo</li>
        <li>Foo</li>
        <li>Foo</li>
        <li>Foo</li>
    </ul>

    <script>
        $("#list li").kendoTouch({
            surface: $("#list"),
            drag: function(e) {
                console.log("you dragged a list item");
            }
        });
    </script>

### global `Boolean` *(default:  false)*

If set to `true`, the document element will be used a s surface for the user drags.

### multiTouch `Boolean` *(default:  false)*

If set to true, the widget will capture and trigger the `gesturestart`, `gesturechange`, and `gestureend` events when the user touches the element with two fingers.

#### Example
    <div data-role="touch" data-gesturestart="onGesturestart">
        Touch me with two fingers
    </div>

    <script>
        function onGesturestart(e) {
            console.log("User touched the element with two fingers");
        }
    </script>

### enableSwipe `Boolean` *(default:  false)*

If set to true, the Touch widget will recognize horizontal swipes and trigger the `swipe` event.

**Notice**: if the `enableSwipe` option is set to true, the `dragstart`, `drag` and `dragend` events will not be triggered.

#### Example
    <div data-role="touch" data-enable-swipe="true" data-swipe="onSwipe">
        Swipe me
    </div>

    <script>
        function onSwipe(e) {
            console.log("User swiped the element with two fingers");
        }
    </script>

### minXDelta `Number` *(default:  30)*

The minimum horizontal distance in pixels the user should swipe before the `swipe` event is triggered.

### maxYDelta `Number` *(default:  20)*

The maximum vertical deviation in pixels of the swipe event. Swipes with higher deviation are discarded.

### maxDuration `Number` *(default:  1000)*

The maximum amount of time in milliseconds the swipe event can last. Slower swipes are discarded.

### minHold `Number` *(default:  800)*

The timeout in milliseconds before the `hold` event is fired.

**Notice**: the hold event will be triggered after the time passes, not after the user lifts his/hers finger.

### doubleTapTimeout `Number` *(default: 400)*

The maximum period (in milliseconds) between two consecutive taps which will trigger the doubletap event.

## Methods

### destroy
Prepares the **Touch** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Touch element from DOM.

#### Example

    var touch = $("#touch").data("kendoTouch");

    // detach events
    touch.destroy();

## Events

### touchstart

Fires when the user presses the element.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### dragstart

Fires when the user starts dragging the element.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### drag

Fires each time the user drags (within the element boundaries).

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### dragend

Fires when the user lifts his/hers finger, or drags outside of the element boundaries.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### tap

Fires when the user taps on the element. A touch sequence is considered a tap if the user does not perform dragging.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### doubletap

Fires when the user quickly taps twice on the element.

**Notice**: The two taps should be at a maximum distance of 3 pixels.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### hold

Fires when the user presses and holds  his/hers finger on the element for a minimum amount of time.

The minimum amount can be configured through the `minHold` configuration option.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### swipe

Fires when the user performs a horizontal swipe on the element.

For this event to be triggered, the `enableSwipe` configuration option should be set to `true`.

The `minXDelta`, `maxYDelta` and `maxDuration` configuration options determine when the drag event sequence is considered a swipe.

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

#### e.direction `String`

The swipe event direction. Can be either `left` or `right`.

### gesturestart

Fires when the user presses the element with two fingers (or presses with a second finger while a first finger is still touching the element).

#### Event Data

##### e.touches `Array`

An array containing the active touches

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.

### gesturechange

Fires when the user moves a finger while multiple fingers are touching the element.

#### Event Data

##### e.touches `Array`

An array containing the active touches

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.

### gestureend

Fires when the user lifts the second finger from the element.
**Notice**: After the last finger is moved, the `dragend` event is fired.

#### Event Data

##### e.touches `Array`

An array containing the active touches

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.

## TouchEvent

The touch event object (available in the event handler event object) contains information about an active touch.  The touch event object instance has two properites of type `TouchAxis` - `x` and `y`.

### Example

    <div data-role="touch" data-tap="getEventInfo">Tap me</div>

    <script>
        function getEventInfo(e) {
            var touch = e.touch;
            var xAxis = touch.x;
            var yAxis = touch.y;

            console.log(x.location);
            console.log(y.location);
        }
    </script>

### Properties

### target `jQuery`

The element from which the touch originated.

## TouchAxis

### Properties

### location `Number`

The offset of the touch relative to the _entire document_ (pageX/Y);

### startLocation `Number`

The offset of the touch relative to the document when the touch started;

### client `Number`

The offset of the touch relative to the _viewport_ (clientX/Y);

### delta `Number`

The change from the previous event location

### velocity `Number`

The pixels per millisecond speed of the current move. For instance, the mobile ScrollView widget considers a swipe with velocity below 0.8 a slow one, while velocity above 1.6 is a fast one.

