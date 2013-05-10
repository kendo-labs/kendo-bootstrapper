---
title: kendo.ui.FlatColorPicker
meta_title: Configuration, methods and events of Kendo UI FlatColorPicker
slug: api-web-flatcolorpicker
relatedDocs: gs-web-flatcolorpicker-overview
tags: api,web
publish: true
---

# kendo.ui.FlatColorPicker

This is the HSV color selector, which is used by default in the
`ColorPicker`'s popup when there is no `palette`.

## Configuration

### opacity `Boolean` *(default: false)*

Specifies whether we should display the opacity slider to allow
selection of transparency.

### buttons `Boolean` *(default: true)*

Specifies whether we should display the Apply / Cancel buttons.

### value `String | Color` *(default: null)*

Specifies the initially selected color.

### preview `Boolean` *(default: true)*

Specifies whether we should display the preview bar which displays the
current color and the input field.

### messages `Object`

Allows customization of "Apply" / "Cancel" labels.

## Methods

### focus

Focuses the widget.

### value `String | Color`*(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in hex, rgb or rgba format, or a [Color][] object.
This does not trigger the "change" event.

#### Parameters

##### color `String`

#### Returns

`String` the string representation of the current color.

### color

Like `value()`, but it returns a `Color` object.

### enable

Enables or disables the widget.  It will enable it with no arguments
or with a `true` argument, or disable with a `false` argument.

## Events

### change

Triggers when a new color has been selected.

#### Event Data

##### e.value `String`

The value of the colorpicker.

[parseColor]: ../framework/kendo#parseColor
[Color]: ../framework/kendo#Color
