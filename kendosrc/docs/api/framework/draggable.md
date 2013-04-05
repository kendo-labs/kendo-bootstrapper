---
title: kendo.ui.Draggable
slug: api-framework-draggable
tags: api,framework
meta_title: Draggable UI Widget | Kendo UI API Documentation
meta_description: Configuration steps and types of events which are triggered in Kendo UI Draggable.
publish: true
---

# kendo.ui.Draggable

## Configuration

### axis `String`*(default: null)*

 Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".

### container `jQuery`

If set, the hint movement is constrained to the container boundaries.

### cursorOffset `Object`*(default: null)*

 If set, specifies the offset of the hint relative to the mouse cursor/finger.
By default, the hint is initially positioned on top of the draggable source offset. The option accepts an object with two keys: `top` and `left`.

#### Example

    $("#draggable").kendoDraggable({cursorOffset: {top: 10, left: 10}});

### distance `Number`*(default: 5)*

 The required distance that the mouse should travel in order to initiate a drag.

### filter `Selector`

Selects child elements that are draggable if a widget is attached to a container.

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.

### hint `Function | jQuery`

Provides a way for customization of the drag indicator. If a function is supplied, it receives one argument - the draggable element's jQuery object.

#### Example

    //hint as a function
     $("#draggable").kendoDraggable({
         hint: function(element) {
             return $("#draggable").clone();
             // same as
             //  return element.clone();
         }
     });

    //hint as jQuery object
     $("#draggable").kendoDraggable({
         hint: $("#draggableHint");
     });

## Events

### drag

Fires while dragging.

### dragcancel

Fires when item drag is canceled by pressing the Escape key.

### dragend

Fires when item drag ends.

### dragstart

Fires when item drag starts.
