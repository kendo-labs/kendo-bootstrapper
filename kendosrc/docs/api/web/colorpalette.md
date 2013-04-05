---
title: kendo.ui.ColorPalette
meta_title: Configuration, methods and events of Kendo UI ColorPalette
slug: api-web-colorpalette
relatedDocs: gs-web-colorpalette-overview
tags: api,web
publish: true
---

# kendo.ui.ColorPalette

This is the widget used by the color picker to display the simple,
web-safe, or a custom color palette.  You can use it independently if
you need such a widget directly in the page somewhere, rather than in
a drop-down.

## Example

    <div id="container"></div>

    <script>
      $("#container").kendoColorPalette();
    </script>

## Configuration

### palette `String | Array` *(default: "basic")*

Specifies the color palette to display.  It can be a string with
comma-separated colors in hex representation, an array of [Color][]
objects or of strings that [parseColor][] understands.  As a shortcut,
you can pass "basic" to get the simple palette (this is the default)
or "websafe" to get the Web-safe palette.

### columns `Number` *(default: 10)*

The number of columns to display.  When you pass "websafe" this will
automatically default to 18.

### tileSize `Number | Object` *(default: 14)*

The size of a color cell.

### tileSize.width `Number` *(default: 14)*

The width of the color cell.

### tileSize.height `Number` *(default: 14)*

The height of the color cell.

### value `String | Color` *(default: null)*

Specifies the initially selected color.

## Methods

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

Triggers when a new color has been changed.

[parseColor]: ../framework/kendo#parseColor
[Color]: ../framework/kendo#Color
