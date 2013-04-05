---
title: fx
meta_title: API reference for Kendo UI FX
meta_description: Find examples of different animation effects for selected elements. The API Reference for Kendo UI FX includes an introduction to methods and animation effects.
slug: api-framework-fx
tags: api,framework
publish: true
---

# FX

## Methods

### kendoAnimate

Applies the specified animation effect/s to all selected elements and triggers the callback on every element when it completes its animation.
Uses transitions and transformations where available and falls back to jQuery animate where not. kendoAnimate can be used to run one of the provided
animation effects or you can define one yourself, using the same format.

#### Example
    $("#box").kendoAnimate("fade:in");

The effect/s can be passed either with a string with names and directions separated by a space or as an object containing them.
If passing the effects as a string, the arguments are parsed as follows:

    elements.kendoAnimate(effects[, duration][, reverse][, callback]);

Returns the elements for chaining.

#### Example
    $("#box").kendoAnimate("fade:in slide:left", 200, true, function (element) {
        // Execute on completion
    });

Duration, reverse and the completion callback are optional and can be omitted.

If effects are passed as an object, then the arguments should be specified inside that object instead.

#### Example
    $("#box").kendoAnimate({
        effects: "fade:in",
        duration: 200,
        complete: function (element) {
            // Execute on completion
        })
    }

#### Parameters
##### effects `String|Object`
The effect/s that should be executed on the selected elements. Can be one or several combined effects, specified as a string with format
"effect:direction effect:direction". Transformation effects that animate the same property can't be combined, like slide:left and
slide:right for instance.

##### duration `Number` *(default: 200)*
The effect duration (speed) in milliseconds.

##### reverse `Boolean` *(default: false)*
Whether the effect should play backwards, useful when doing the same animation but with the opposite direction, like opening and closing.

##### complete `Function`
Completion callback that should be called after animation completion. It gets fired for every animated element and is passed the said element
as its only argument.

##### show `Boolean` *(default: false)*
Whether the element should be shown before animating.

##### hide `Boolean` *(default: false)*
Whether the element should be hidden after the animation completes.

### kendoStop

Stops the animation effect running on the specified elements and optionally jumps to the end and clears the animation effect queue.
In browsers that don't support transitions falls back to jQuery stop().

    elements.kendoStop(clearQueue, gotoEnd);

This functionality is useful to avoid chaining many effects, causing them to run longer than expected.

#### Example
    $("#box").kendoStop(true, true).kendoAnimate("fade:in");

#### Parameters
##### clearQueue `Boolean` *(default: false)*
Whether to clear the animation effects queue and start anew.

##### gotoEnd `Boolean` *(default: false)*
Whether to jump to the animation end position when stopping or just leave the element at its current position.

### kendoAddClass

Adds a CSS class to the element, while doing a transition to the new state. If the browser doesn't support transitions,
the method falls back to jQuery addClass();

> **Important:** kendoAddClass doesn't add the animation to the animation effect queue and can't be stopped with kendoStop.

    elements.kendoAddClass(classes, options);

##### classes `String`
A list of the classes that should be added to the element/s, separated by a space.

##### options `Object`
An object containing several additional options, like duration and exclusive.

##### options.duration `Number` *(default: 400)*
Duration of the class change animation, in ms.

##### options.exclusive `String` *(default: "all")*
The property on which to apply the animation.

##### options.ease `String` *(default: "ease-out")*
The animation easing.

### kendoRemoveClass

Removes a CSS class from the element, while doing a transition to the new state. If the browser doesn't support transitions,
the method falls back to jQuery removeClass();

> **Important:** kendoRemoveClass doesn't add the animation to the animation effect queue and can't be stopped with kendoStop.

    elements.kendoRemoveClass(classes, options);

##### classes `String`
A list of the classes that should be removed from the element/s, separated by a space.

##### options `Object`
An object containing several additional options, like duration and exclusive.

##### options.duration `Number` *(default: 400)*
Duration of the class change animation, in ms.

##### options.exclusive `String` *(default: "all")*
The property on which to apply the animation.

##### options.ease `String` *(default: "ease-out")*
The animation easing.

### kendoToggleClass

Toggle a CSS class on the element, based on a flag, while doing a transition to the new state. If the browser doesn't support transitions,
the method falls back to jQuery toggleClass();

> **Important:** kendoToggleClass doesn't add the animation to the animation effect queue and can't be stopped with kendoStop.

    elements.kendoToggleClass(classes, options, toggle);

##### classes `String`
A list of the classes that should be toggled on the element/s, separated by a space.

##### options `Object`
An object containing several additional options, like duration and exclusive.

##### options.duration `Number` *(default: 400)*
Duration of the class change animation, in ms.

##### options.exclusive `String` *(default: "all")*
The property on which to apply the animation.

##### options.ease `String` *(default: "ease-out")*
The animation easing.

##### toggle `Boolean`
A boolean flag to control the toggle - true to add or false to remove the CSS class. If omitted the method will assume the opposite state
should be toggled.

## Effects

### fade
Does a fade effect on the targets with directions _in_ and _out_.

#### Example
    element.kendoAnimate("fade:in");

### zoom
Does a zoom effect on the targets with directions _in_ and _out_. Uses scale transformation and falls back to zoom property in old IE browsers.

#### Example
    element.kendoAnimate("zoom:in");

### slide
Slides the targets with their size in the specified direction, starting from their current position.
Directions supported are _left_, _right_, _up_ and _down_.

#### Example
    element.kendoAnimate("slide:left");

### slideIn
Moves the targets in the opposite direction with their size nad then slides them with their size in the specified direction. Expected to be used in a container.
Directions supported are _left_, _right_, _up_ and _down_.

#### Example
    element.kendoAnimate("slideIn:left");

### expand
Expands the targets to their size in the specified direction. Directions supported are _vertical_ and _horizontal_.

#### Example
    element.kendoAnimate("expand:vertical");
