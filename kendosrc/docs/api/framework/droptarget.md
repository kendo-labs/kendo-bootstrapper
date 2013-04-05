---
title: kendo.ui.DropTarget
slug: api-framework-droptarget
tags: api,framework
meta_title: Drop interaction with jQuery | Kendo UI DropTarget API Reference
meta_description: Learn how to group sets of draggable and drop targets, destroy all DropTarget instances from a group and handle events, fired once draggable interacts with the drop target.
publish: true
---

# kendo.ui.DropTarget

## Configuration

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.

## Methods

### destroyGroup

Destroys all DropTarget instances from the group with the given name.

    kendo.ui.DropTarget.destroyGroup("foo");

## Events

### dragenter

Fires when draggable moves over the drop target.

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the draggable that enters the drop target.

### dragleave

Fires when draggable moves out of the drop target.

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the draggable that leaves the drop target.

### drop

Fires when draggable is dropped over the drop target.

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the draggable that is dropped over the drop target.

