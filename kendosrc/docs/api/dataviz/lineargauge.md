---
title: kendo.dataviz.ui.LinearGauge
meta_title: Configuration, methods and events of Kendo UI DataViz LinearGauge
meta_description: Manipulate the configuration options of linear gauge, change the border of the gauge area and its color, learn how to use methods.
slug: api-dataviz-lineargauge
relatedDocs: gs-dataviz-lineargauge-overview
tags: api,dataviz
publish: true
---

# kendo.dataviz.ui.LinearGauge

## Configuration

### gaugeArea `Object`

The gauge area configuration options.
This is the entire visible area of the gauge.

### gaugeArea.background `Object`*(default: "white")*

 The background of the gauge area.
Any valid CSS color string will work here, including hex and rgb.

### gaugeArea.border `Object`

The border of the gauge area.

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### gaugeArea.border.width `Number`*(default: 0)*

 The width of the border.

### gaugeArea.height `Number`

The height of the gauge area.  By default, the vertical gauge is 200px and
the horizontal one is 60px.

### gaugeArea.margin `Number|Object`*(default: 5)*

 The margin of the gauge area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### gaugeArea.width `Number`

The width of the gauge area.  By default the vertical gauge is 60px and
horizontal gauge is 200px.

### pointer `Object`

The pointer configuration options.

### pointer.border `Object`

The border of the pointer.

### pointer.border.color `String`

The color of the border.
Any valid CSS color string will work here, including hex and rgb.

### pointer.border.dashType `String`*(default: "solid")*

The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### pointer.border.width `Number`*(default: 1)*

 The width of the border.

### pointer.color `String`

The color of the pointer.

### pointer.margin `Number|Object`*(default: 3)*

 The margin of the pointer.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### pointer.opacity `Number`*(default: 1)*

 The opacity of the pointer.
Any valid CSS color string will work here, including hex and rgb.

### pointer.shape `String`

The shape of the pointer.


#### *"barIndicator"*

Specifies a filling bar indicator.

#### *"arrow"*

Specifies a arrow shape.

### pointer.size `Number`

The size of the pointer.

### pointer.track `Object`

The element arround/under the pointer.
(available only for 'barIndicator' shape)

### pointer.track.border `Object`

The border of the track.

### pointer.track.border.color `String`

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### pointer.track.border.dashType `String`*(default: "solid")*

The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### pointer.track.border.width `Number`*(default: 1)*

 The width of the border.

### pointer.track.color `String`

The color of the track.

### pointer.track.opacity `Number`

The opacity of the track.

### pointer.track.size `Number`

The size of the track.

### pointer.track.visible `Boolean`*(default: false)*

 The visibility of the track.

### pointer.value `Number`

The value of the gauge.

### scale `Object`

Configures the scale.

### scale.line `Object`

Configures the axis line.

### scale.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

### scale.line.dashType `String`*(default: "solid")*

The dash type of the line.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### scale.line.visible `Boolean`*(default: true)*

The visibility of the lines.

### scale.line.width `Number`*(default: 1)*

The width of the line..

### scale.labels `Object`

Configures the scale labels.

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb

### scale.labels.border `Object`

The border of the labels.

### scale.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### scale.labels.border.width `Number`*(default: 0)*

 The width of the border.

### scale.labels.color `String`

The text color of the labels.
Any valid CSS color string will work here, including hex and rgb.

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### scale.labels.format `String`

The format of the labels.

#### Example

    $("#radial-gauge").kendoLinearGauge({
        scale: {
           labels: {
               // set the format to currency
               format: "C"
           }
        }
    });

### scale.labels.margin `Number|Object`*(default: 5)*

 The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### scale.labels.padding `Number | Object`*(default: 0)*

 The padding of the labels.

### scale.labels.template `String|Function`

The label template.
Template variables:


*   **value** - the value

#### Example

    // chart intialization
    $("#radial-gauge").kendoLinearGauge({
         scale: {
             labels: {
                 // labels template
                 template: "#= value #%"
             }
         }
    });

### scale.labels.visible `Boolean`*(default: true)*

 The visibility of the labels.

### scale.majorTicks `Object`

Configures the scale major ticks.

### scale.majorTicks.color `String`

The color of the major ticks.
Any valid CSS color string will work here, including hex and rgb.

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.

### scale.majorTicks.visible `Boolean`*(default: true)*

 The visibility of the major ticks.

### scale.majorTicks.width `Number`*(default: 0.5)*

 The width of the major ticks.

### scale.majorUnit `Number`

The interval between major divisions.

### scale.max `Number`*(default: 100)*

 The maximum value of the scale.

### scale.min `Number`*(default: 0)*

 The minimum value of the scale.

### scale.minorTicks `Object`

Configures the scale minor ticks.

### scale.minorTicks.color `String`

The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.

### scale.minorTicks.visible `Boolean`*(default: true)*

 The visibility of the minor ticks.

### scale.minorTicks.width `Number`*(default: 0.5)*

 The width of the minor ticks.

### scale.minorUnit `Number`

The interval between minor divisions.

### scale.mirror `Boolean`

Mirrors the scale labels and ticks.
If the labels are normally on the left side of the scale, mirroring the scale will render them to the right.

### scale.ranges `Array`

The ranges of the scale.

#### Example

    $("#radial-gauge").kendoRadialGauge({
        scale: {
            ranges: [{
                from: 10,
                to: 20,
                color: "green"
            }]
        }
     });

### scale.ranges.from `Number`

The start position of the range in scale units.

### scale.ranges.to `Number`

The end position of the range in scale units.

### scale.ranges.opacity `Number`

The opacity of the range.

### scale.ranges.color `String`

The color of the range.
Any valid CSS color string will work here, including hex and rgb.

### scale.rangePlaceholderColor `String`

The default color for the ranges.

### scale.reverse `Boolean`*(default: false)*

Reverses the axis direction - values increase from right to left and from top to bottom.

### scale.vertical `Boolean`

The position of the gauge.

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.

## Methods

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.

#### Example

    kendo.destroy($("#linear-gauge"));
    $("#linear-gauge").remove();

### redraw

Redraws the gauge.

#### Example

    var gauge = $("#linear-gauge").data("kendoLinearGauge");
    gauge.redraw();

### svg

Returns the SVG representation of the current gauge.
The returned string is a self-contained SVG document
that can be used as is or converted to other formats
using tools like [Inkscape](http://inkscape.org/) and
[ImageMagick](http://www.imagemagick.org/).
Both programs provide command-line interface
suitable for backend processing.

#### Example

    var gauge = $("#linear-gauge").data("kendoLinearGauge");
    var svgText = gauge.svg();

### value

Change the value of the gauge.

#### Example

    var gauge = $("#linear-gauge").data("kendoLinearGauge");
    gauge.redraw();
