---
title: kendo.ui.ColorPicker
meta_title: Configuration, methods and events of Kendo UI ColorPicker
slug: api-web-colorpicker
relatedDocs: gs-web-colorpicker-overview
tags: api,web
publish: true
---

# kendo.ui.ColorPicker

A drop-down color picker widget.

This widget can be used as a replacement for browser's built-in color
picker widget - `<input type="color">` in HTML5.  It can be
instantiated from such an element and by default it will replace it in
the DOM.  Two color selectors are provided: a simple picker that shows
a limited number of colors from a palette and a HSV (hue / saturation
/ value) picker.

## Usage example

Create a simple color picker displaying the "web-safe" color palette,
liked to the `test` input field.  The `<input>` will be hidden but
maintained in the DOM, and its `value` attribute will reflect the
selected color.

    <input id="test" name="test" type="color" />

    <script>
      $("#test").kendoColorPicker({ palette: "websafe" });
    </script>

## Configuration

### buttons `Boolean`*(default: true)*

Applicable only for the HSV selector (that is, when `pallete` is
null).  This specifies whether the "Apply" / "Cancel" buttons are to
be displayed in the drop-down HSV picker.

### columns `Number`

The number of columns to show in the simple color dropdown.  For the
"basic" and "websafe" palettes this is automatically initialized; if
you pass a custom palette then you can set this to some value that
makes sense for your colors.

### tileSize `Number | Object` *(default: 14)*

The size of a color cell.

### tileSize.width `Number` *(default: 14)*

The width of the color cell.

### tileSize.height `Number` *(default: 14)*

The height of the color cell.

### messages `Object`

Allows customization of "Apply" / "Cancel" labels.

### palette `String|Array`*(default: null)*

When a non-null `palette` argument is supplied, the drop-down will be
a simple color picker.  The following are supported:

- "basic" -- displays 20 basic colors

- "websafe" -- display the "web-safe" color palette

- otherwise, pass a string with colors in HEX representation separated with
  commas, or an array of colors, and it will display that palette instead.
  If you pass an array it can contain strings supported by [parseColor][] or
  [Color][] objects.

If `palette` is missing or `null`, the widget will display the HSV
selector.

### opacity `Boolean`*(default: false)*

Only for the HSV selector.  If `true`, the widget will display the
opacity slider.  Note that currently in HTML5 the `<input
type="color">` does not support opacity.

### preview `Boolean`*(default: true)*

Only for the HSV selector.  Displays the color preview element, along
with an input field where the end user can paste a color in a
CSS-supported notation.

### toolIcon `String`*(default: null)*

A CSS class name to display an icon in the color picker button.  If
specified, the HTML for the element will look like this:

    <span class="k-tool-icon ${toolIcon}">
      <span class="k-selected-color"></span>
    </span>

### value `String | Color` *(default: null)*

The initially selected color.  This can be a string supported by
[parseColor][] or a [Color][] object.  Note that when initializing the
widget from an `<input>` element, the initial color will be decided by the
field instead.

## Methods

### close

Closes the popup.

### open

Opens the popup element with the color selector.

### toggle

Toggles the popup.

### value `String | Color` *(default: null)*

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

Set the widget's `enabled` state.  Called with no arguments, this
method will ensure that the widget gets enabled.  Pass a `false`
argument to disable it.

#### Parameters

##### color `String`

The color should be either a [Color][] object or a string that
[parseColor][] can understand (the CSS hex, rgb or rgba notations).

## Events

### change

Fires when a color was selected, either by clicking on it (in the
simple picker), by clicking ENTER or by pressing "Apply" in the HSV
picker.

### select

Fires as a new color is displayed in the drop-down picker.  This is
not necessarily the "final" value; for example this event triggers
when the sliders in the HSV selector are dragged, but then pressing
ESC would cancel the selection and the color will revert to the
original value.

### open

Fires when the picker popup is opening.

### close

Fires when the picker popup is closing.

[parseColor]: ../framework/kendo#parseColor
[Color]: ../framework/kendo#Color
