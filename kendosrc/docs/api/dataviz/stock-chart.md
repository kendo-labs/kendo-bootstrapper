---
title: kendo.dataviz.ui.StockChart
meta_title: Configuration, methods and events of Kendo UI DataViz StockChart
slug: api-dataviz-stockchart
relatedDocs: gs-dataviz-stockchart-overview
tags: api,dataviz
publish: true
---

# kendo.dataviz.ui.StockChart

## Configuration

### dateField `String`*(default: "date")*

The field containing the point date.
It is used as a default `field` for all date axes, including the navigator pane.

The data item field value must be either:

####* Date instance

####* String parsable by `new Date([field value])`

####* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

### navigator `Object`

The data navigator configuration options.

### navigator.dataSource `Object`

Navigator DataSource configuration or instance.

When the navigator is bound via its own data source,
it will automatically set "from" and "to" filters on the main data source.

This, in conjunction with server filtering, allows you to visualize large data sets
without loading them at once.

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            transport: {
                 read: "/stock/detail"
            },
            serverFiltering: true
        },
        navigator: {
            dataSource: {
                transport: {
                    read: "/stock/volume"
                }
            }
        }
    });

### navigator.autoBind `Boolean`*(default: true)*

Indicates whether the navigator will call read on the data source initially.
Applicable only when using a dedicated navigator data source.

#### Example
    $("#stock-chart").kendoStockChart({
        navigator: {
            dataSource: naviDataSource,
            autoBind: false
        }
    });

    // ...
    naviDataSource.read();

### navigator.dateField `String`

The field containing the point date.
It is used as a default `field` for the navigator axis.

The data item field value must be either:

####* Date instance

####* String parsable by `new Date([field value])`

####* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

### navigator.series `Array`

Array of series definitions.

Accepts the same options as the root `series` collection.

Omitting the array and specifying a single series is also acceptable.

#### Example
    <p>
    $("#stock-chart").kendoStockChart({
         navigator: {
            series: {
                type: "line",
                field: "volume"
            }
         },
         ...
    });
    </p>

### navigator.visible `Boolean`*(default: true)*

The visibility of the navigator.

### navigator.series.type `String`

The type of the series. Available types:

* area
* column
* line
* candlestick, ohlc

### navigator.series.dashType `String`*(default: "solid")*

The series line dash type.

** Applicable only to line series **

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

### navigator.series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

### navigator.series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

### navigator.series.field `String`

The data field containing the series value.

### navigator.series.groupNameTemplate `String`

Name template for auto-generated series when binding to grouped data.

Template variables:

*   **series** - the series options
*   **group** - the data group
*   **group.field** - the name of the field used for grouping
*   **group.value** - the field value for this group.

### navigator.series.name `String`

The series name visible in the legend.

### navigator.series.highlight `Object`

Configures the appearance of highlighted points.

** Applicable to candlestick and ohlc series. **

### navigator.series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

### navigator.series.highlight.border.width `Number`

The width of the border.

### navigator.series.highlight.border.color `String`

The border color.

### navigator.series.highlight.border.opacity `Number`

The border opacity.

### navigator.series.highlight.color `String`

The highlight color.

** Available only for pie series **

### navigator.series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

### navigator.series.highlight.line.width `Number`

The width of the line.

### navigator.series.highlight.line.color `String`

The line color.

### navigator.series.highlight.line.opacity `Number`

The opacity of the line.

### navigator.series.highlight.opacity `Number`

The opacity of the highlighted points.

### navigator.series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

### navigator.series.aggregate `String`*(default: "max")*

Aggregate function for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

#### *"max"*

The highest value for the date period.

#### *"min"*

The lowest value for the date period.

#### *"sum"*

The sum of all values for the date period.

#### *"count"*

The number of values for the date period.

#### *"avg"*

The average of all values for the date period.

#### *function (values, series)*

User-defined aggregate function.

#### *object* (compound aggregate)

** Applicable to candlestick and ohlc series **

Specifies the aggregate for each data item field.

##### Example

    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }

### navigator.series.axis `String`*(default: primary)*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

### navigator.series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

### navigator.series.border.color `String`*(default: the color of the curren series)*

The color of the border.

### navigator.series.border.dashType `String`*(default: "solid")*

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

### navigator.series.border.width `Number`*(default: 1)*

The width of the border.

### navigator.series.closeField `String`

The data field containing the close value.

** Available for candlestick and ohlc series only **

### navigator.series.color `String`

The series base color.

### navigator.series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

### navigator.series.downColor `String`

The series color when open value is smoller then close value.

** Available for candlestick series only **

### navigator.series.downColorField `String`

The data field containing the body color.

** Available for candlestick series only **

### navigator.series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

### navigator.series.labels `Object`

Configures the series data labels.

### navigator.series.labels.background `String`

The background color of the labels.

### navigator.series.labels.border `Object`

The border of the labels.

### navigator.series.labels.border.color `String`*(default: "black")*

 The color of the border.

### navigator.series.labels.border.dashType `String`*(default: "solid")*

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

### navigator.series.labels.border.width `Number`*(default: 0)*

 The width of the border.

### navigator.series.labels.color `String`

The text color of the labels.

### navigator.series.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### navigator.series.labels.format `String`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### navigator.series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }

### navigator.series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### navigator.series.labels.position `String`*(default: "above")*

Defines the position of the labels.

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only.  Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### navigator.series.labels.template `String | Function`

The label template. Template variables:

*   **value** - the point value. Can be a number or object containing each bindable field.
*   **category** - the category name
    Available for area, column and line series.
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
    Will be null if binding to array.

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### navigator.series.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

### navigator.series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

### navigator.series.line.color `String`

The line color.

### navigator.series.line.opacity `Number`*(default: 1)*

The line opacity.

### navigator.series.line.width `String`*(default: 4)*

The line width.

### navigator.series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

### navigator.series.markers `Object`

Marker options.

** Applicable for area and line series. **

### navigator.series.markers.background `String`

The background color of the current series markers.

### navigator.series.markers.border `Object`

The border of the markers.

### navigator.series.markers.border.color `String`*(default: "black")*

 The color of the border.

### navigator.series.markers.border.width `Number`*(default: 0)*

 The width of the border.

### navigator.series.markers.size `Number`*(default: 6)*

 The marker size.

### navigator.series.markers.type `String`*(default: "circle")*

Configures the markers shape type.

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

### navigator.series.markers.visible `Boolean`*(default: false)*

The markers visibility.

### navigator.series.missingValues `String`*(default: "gap")*

Configures the behavior for handling missing values.

** Applicable for area and line series. **

#### *"interpolate"*

The value is interpolated from neighboring points.

#### *"zero"*

The value is assumed to be zero.

#### *"gap"*

The plot stops before the missing point and continues after it.

### navigator.series.opacity `Number`

The series opacity.

### navigator.series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

### navigator.series.overlay `Object`

The effects overlay.

### navigator.series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

### navigator.series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

### navigator.series.stack `Boolean|Boolean`*(default: false)*

A value indicating if the series should be stacked.  String value indicates that the series should be stacked in a group with the specified name.
Available for column series.

### navigator.series.tooltip `Object`

The data point tooltip configuration options.

### navigator.series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### navigator.series.tooltip.border `Object`

The border configuration options.

### navigator.series.tooltip.border.color `String`*(default: "black")*

The color of the border.

### navigator.series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### navigator.series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### navigator.series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### navigator.series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

    //sets format of the tooltip
    format: "{0:C}--{1:C}"

### navigator.series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### navigator.series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 tooltip: {
                     visible: true,
                     template: "#= category # - #= value #"
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### navigator.series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### navigator.series.width `Number`

The line width.

** Applicable for line series. **

### navigator.select `Object`

Specifies the initially selected range.

The full range of values is shown if no range is specified.

#### Example
    <p>
    $("#stock-chart").kendoStockChart({
         navigator: {
            series: {
                type: "line",
                field: "volume"
            },
            select: {
                from: "2012/01/01",
                to: "2012/03/01"
            }
         },
         ...
    })
    </p>

### navigator.select.from `Date`|`String`

The lower boundary of the selected range.

### navigator.select.to `Date`|`String`

The upper boundary of the selected range.

### navigator.hint `Object`

Default options for the navigator hint.

### navigator.hint.visible `Boolean`*(default: true)*

The visibility of the hint.

### navigator.hint.template `String | Function`

The hint template.
Template variables:

*   **from** - The lower boundary of the selected range
*   **to** - Theupper boundary of the selected range

#### Example

    // chart intialization
    $("#stock-chart").kendoStockChart({
         navigator: {
            hint: {
                // hint template
                template: "From: #= from # To: #= to #"
            }
         },
         ...
    });

### navigator.hint.format `String`

The format of the hint.

#### Example

    //sets format of the hint
    format: "From: {0:d} To: {1:d}"

### axisDefaults `Object`

Default options for all chart axes.

### categoryAxis `Array`

The category axis configuration options.

### categoryAxis.axisCrossingValue `Object | Date | Array`

Category index at which the first value axis crosses this axis. (Only for object)

Category indicies at which the value axes cross the category axis. (Only for array)

**Note:** Specify an index greater than or equal to the number
of categories to denote the far end of the axis.

#### Example
    <p>
    $("#chart").kendoChart({
         categoryAxis: {
             categories: ["A", "B"],
             axisCrossingValue: [0, 100]
         },
         valueAxis: [{ }, { name: "secondary" }]
         ...
    })
    </p>

### categoryAxis.categories `Array`

Array of category names.

#### Example

    $("#chart").kendoChart({
        categoryAxis: {
            categories: [ 2005, 2006, 2007, 2008, 2009 ]
        },
        ...
    });

### categoryAxis.color `String`

Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
Individual color settings for line and labels take priority.

### categoryAxis.field `String`

The data field containing the category name.

#### Example

    // assuming the following data...
    var data = [ { sales: 200, year: 2005 }, { sales: 300, year: 2006 }, { sales: 400, year: 2007 }];
    // specify the "year" as the field for the category axis
    $("#chart").kendoChart({
        dataSource: {
            data: data
        },
        categoryAxis: {
            field: "year"
        },
        ...
    });

### categoryAxis.justified `Boolean`*(default: false)*

Positions categories and series points on major ticks. This removes the empty space before and after the series.

This option is ignored if either column, ohlc or candlestick series are plotted on the axis.

### categoryAxis.labels `Object`

Configures the axis labels.

### categoryAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.border `Object`

The border of the labels.

### categoryAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.border.dashType `String`*(default: "solid")*

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

### categoryAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### categoryAxis.labels.format `String`

The format of the labels.

### categoryAxis.labels.margin `Number | Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### categoryAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### categoryAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### categoryAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### categoryAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### categoryAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### categoryAxis.labels.template `String | Function`

The label template.
Template variables:

*   **value** - the value

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             labels: {
                 // labels template
                 template: "Year: #= value #"
             }
         }
    });

### categoryAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### categoryAxis.line `Object`

Configures the axis line. This will also effect major and minor ticks, but not gridlines.

### categoryAxis.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

**Note:** This will also effect the major and minor ticks, but not the grid lines.

### categoryAxis.line.dashType `String`*(default: "solid")*

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

### categoryAxis.line.visible `Boolean`*(default: true)*

The visibility of the lines.

### categoryAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### categoryAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### categoryAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.majorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

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

### categoryAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### categoryAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### categoryAxis.majorTicks `Object`

The major ticks of the axis.

### categoryAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

### categoryAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### categoryAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
the body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid lines visibility being set to **true**.

### categoryAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and
rgb.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

### categoryAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

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

### categoryAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### categoryAxis.minorGridLines.width `Number`*(default: 1> The width of the lines. <p)*

The width of the lines.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

### categoryAxis.minorTicks `Object`

The minor ticks of the axis.

### categoryAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

### categoryAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

### categoryAxis.name `String`*(default: primary)*

The unique axis name.

### categoryAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### categoryAxis.plotBands.color `String`

The color of the plot band.

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

### categoryAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
categories are listed from right to left and from top to bottom.

### categoryAxis.select `Object`

The selected axis range. If configured, axis selection will be enabled.

** Available only for vertical axes **

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance or date string (yyyy/MM/dd HH:mm:ss)

### categoryAxis.select.from `Object`

The lower boundary of the selected range.

### categoryAxis.select.to `Object`

The upper boundary of the selected range.

*Note*: The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category index (date).

### categoryAxis.select.min `Object`

The minimum value that is selectable by the user.

### categoryAxis.select.max `Object`

The maximum value that is selectable by the user.

*Note*: The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category index (date).

### categoryAxis.select.mousewheel `Object`

Mousewheel zoom settings for the selection.

### categoryAxis.select.mousewheel.reverse `Boolean`*(default: true)*

Reverses the mousewheel zoom direction.
Normal direction is down for "zoom out", up for "zoom in".

### categoryAxis.select.mousewheel.zoom `String`*(default: "both")*

The zoom direction. Possible values:

#### *"both"*
Zooming expands and contracts the selection both sides.

#### *"left"*
Zooming expands and contracts the selection left side only.

#### *"right"*
Zooming expands and contracts the selection right side only.

### categoryAxis.title `Object`

The title of the category axis.

### categoryAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### categoryAxis.title.border `Object`

The border of the title.

### categoryAxis.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### categoryAxis.title.border.dashType `String`*(default: "solid")*

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

### categoryAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### categoryAxis.title.margin `Number|Object`*(default: 5)*

The margin of the title.

#### Example

    $("#chart").kendoChart({
        categoryAxis: {
            title: {
                // sets the top, right, bottom and left margin to 3px.
                margin: 3
            }
        },
        ...
    });
    //
    $("#chart").kendoChart({
        categoryAxis: {
            title: {
                // sets the top and left margin to 1px
                // margin right and bottom are with 0px (by default)
                margin: { top: 1, left: 1 }
            }
        },
        ...
    });

### categoryAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis)

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis)

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis)

#### *"right"*

The axis title is positioned on the right (applicable to horizontal axis)

#### *"center"*

The axis title is positioned in the center

### categoryAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### categoryAxis.title.text `String`

The text of the title.

### categoryAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### categoryAxis.type `String`*(default: "category")*

The axis type.

#### *"category"*

Discrete category axis.

#### *"date"*

Specialized axis for displaying chronological data.

### categoryAxis.autoBaseUnitSteps `Object`

Specifies the discrete **baseUnitStep** values when
either **baseUnit** is set to "fit" or **baseUnitStep** is set to "auto".

The default configuration is as follows:

* `minutes: [1, 2, 5, 15, 30]`
* `hours: [1, 2, 3, 6, 12]`
* `days: [1, 2, 3]`
* `weeks: [1, 2]`
* `months: [1, 2, 3, 6]`
* `years: [1, 2, 3, 5, 10, 25, 50]`

Each setting can be overriden individually.

#### Example

    $("#chart").kendoChart({
        categoryAxis: {
            categories: [
                new Date("2012/02/01 00:00:00"),
                new Date("2012/02/02 00:00:00"),
                new Date("2012/02/20 00:00:00")
            ],
            baseUnitStep: "auto",
            autoBaseUnitSteps: {
                days: [3]
            }
        },
        ...
    });

### categoryAxis.baseUnit `String`

The base time interval for the axis.
The default baseUnit is determined automatically from the minimum difference
between subsequent categories. Available options:

* minutes
* hours
* days
* weeks
* months
* years
* **fit**

Setting **baseUnit** to "fit" will set such base unit and **baseUnitStep**
that the total number of categories does not exceed **maxDateGroups**.

Series data is aggregated for the specified base unit by using the
**series.aggregate** function.

### categoryAxis.baseUnitStep `Object`*(default: 1)*

Sets the step (interval) between categories in base units.
Specifiying "auto" will set the step to such value that the total number of categories does not exceed **maxDateGroups**.

This option is ignored if **baseUnit** is set to "fit".

### categoryAxis.labels.culture `String`*(default: global culture)*

Culture to use for formatting the dates. See [Globalization](http://www.kendoui.com/documentation/framework/globalization/overview.aspx) for more information.

### categoryAxis.labels.dateFormats `Object`

Date format strings

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels **format** option will override these defaults.

### categoryAxis.max `Object`

The last date displayed on the axis.
By default, the minimum date is the same as the last category.
This is often used in combination with the **min** and **roundToBaseUnit** configuration options to
set up a fixed date range.

### categoryAxis.min `Object`

The first date displayed on the axis.
By default, the minimum date is the same as the first category.
This is often used in combination with the **max** and **roundToBaseUnit** configuration options to
set up a fixed date range.

### categoryAxis.roundToBaseUnit `Boolean`*(default: true)*

By default, the first and last dates will be rounded off to the nearest base unit.
Specifying **false** for this option will disable this behavior.

This option is most useful in combination with explicit **min** and **max** dates.

It will be ignored if either column, ohlc or candlestick series are plotted on the axis.

### categoryAxis.weekStartDay `Number`*(default: kendo.days.Sunday)*

Specifies the week start day when **baseUnit** is set to "weeks".
Use the *kendo.days* constants to specify the day by name.

* kendo.days.Sunday (0)
* kendo.days.Monday (1)
* kendo.days.Tuesday (2)
* kendo.days.Wednesday (3)
* kendo.days.Thursday (4)
* kendo.days.Friday (5)
* kendo.days.Saturday (6)


### categoryAxis.maxDateGroups `Number`*(default: 10)*

Specifies the maximum number of groups (categories) to produce when
either **baseUnit** is set to "fit" or **baseUnitStep** is set to "auto".

This option is ignored in all other cases.

### categoryAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### categoryAxis.crosshair `Object`

The crosshair configuration options.

### categoryAxis.crosshair.color `String`

The color of the crosshair.

### categoryAxis.crosshair.width `Number`

The width of the crosshair.

### categoryAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### categoryAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### categoryAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### categoryAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### categoryAxis.crosshair.tooltip.border `Object`

The border configuration options.

### categoryAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### categoryAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### categoryAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### categoryAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### categoryAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### categoryAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             type: "area",
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "|#= value #|"
                 }
             }
         }
    });

### categoryAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### chartArea `Object`

The chart area configuration options.
This is the entire visible area of the chart.

### chartArea.background `String`*(default: "white")*

The background color of the chart area.

### chartArea.opacity `Number`*(default: 1)*

The background opacity of the chart area.

### chartArea.border `Object`

The border of the chart area.

### chartArea.border.color `String`*(default: "black")*

The color of the border.

### chartArea.border.dashType `String`*(default: "solid")*

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

### chartArea.border.width `Number`*(default: 0)*

The width of the border.

### chartArea.height `Number`*(default: 400)*

The height of the chart area.

### chartArea.margin `Number|Object`*(default: 5)*

The margin of the chart area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### chartArea.width `Number`*(default: 600)*

 The width of the chart area.

### dataSource `Object`

DataSource configuration or instance.

#### Example

    $("#chart").kendoChart({
        dataSource: {
            transport: {
                 read: "spain-electricity.json"
            }
        },
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

    // Alternative configuration
    var dataSource = new kendo.data.DataSource({
        transport: {
             read: "spain-electricity.json"
        }
    });

    $("#chart").kendoChart({
        dataSource: dataSource,
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

### autoBind `Boolean`*(default: true)*

Indicates whether the chart will call read on the data source initially.

#### Example
    $("#stock-chart").kendoStockChart({
        dataSource: chartDataSource,
        chartBind: false
    });

    // ...
    naviDataSource.read();

### legend `Object`

The chart legend configuration options.

#### Example

    $("#chart").kendoChart({
        legend: {
            // set the background color to a dark blue
            background: "#336699",
            labels: {
                // set the font to a size of 14px
                font: "14px Arial,Helvetica,sans-serif",
                // set the color to red
                color: "red"
            },
            // move the legend to the left
            position: "left",
            // move the legend a bit closer to the chart by setting the x offset to 20
            offsetX: 20,
            // move the legend up to the top by setting the y offset to -100
            offsetY: -100,
        }
    });

### legend.background `String`*(default: "white")*

 The background color of the legend. Any valid CSS color string will work here, including hex and rgb.

### legend.border `Object`

The border of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            border: {
                // set the border width to 2 pixels
                width: 2,
                // set the color to grey
                color: "grey",
                // set the dash type to solid. this is the default so we could leave this line out.
                dashType: "solid"
            }
        },
        ...
    });

### legend.border.color `String`*(default: "black")*

 The color of the border.

### legend.border.dashType `String`*(default: "solid")*

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

#### Example



### legend.border.width `Number`*(default: 0)*

 The width of the border.

### legend.labels `Object`

Configures the legend labels.

### legend.labels.color `String`*(default: "black")*

The color of the labels.
Any valid CSS color string will work here, including hex and rgb.

### legend.labels.font `String`*(default: 12px Arial,Helvetica,sans-serif)*

The font style of the labels.

### legend.labels.template `String`

The template of the labels.
Template variables:
*   **text** - the text the legend item.
*   **series** - the data series.


### legend.margin `Number | Object`*(default: 10)*

 The margin of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left margin to 3px.
            margin: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        legend: {
            // sets the top and left margin to 1px
            // margin right and bottom are with 10px (by default)
            margin: { top: 1, left: 1 }
        },
        ...
    });

### legend.offsetX `Number`*(default: 0)*

 The X offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of it's initial position.  A negative value will move the legend
to the left of the current position.

#### Example

    $("#chart").kendoChart({
        legend: {
            // move the legend to the left side of the chart
            offsetX: 20
        },
        ...
    });

### legend.offsetY `Number`*(default: 0)*

 The Y offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from it's initial position.  A negative value will move the legend
upwards from the current position.

#### Example

    $("#chart").kendoChart({
        legend: {
            // move the legend up 100 pixels
            offsetY: -100
        },
        ...
    });

### legend.padding `Number | Object`*(default: 5)*

 The padding of the legend.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left padding to 3px.
            padding: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        legend: {
           // sets the top and left padding to 1px
           // padding right and bottom are with 5px (by default)
           padding: { top: 1, left: 1 }
        },
        ...
    });

### legend.position `String`*(default: right)*

 The positions of the legend.


#### *"top"*

The legend is positioned on the top.

#### *"bottom"*

The legend is positioned on the bottom.

#### *"left"*

The legend is positioned on the left.

#### *"right"*

The legend is positioned on the right.

#### *"custom"*

The legend is positioned using OffsetX and OffsetY.

### legend.visible `Boolean`*(default: false)*

 The visibility of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            // show the legend
            visible: true
        },
        ...
    });

### panes `Array`

The chart panes configuration.

Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.

Each axis can be associated with a pane by setting its `pane` option to the name of the desired pane.
Axis that don't have specified pane are placed in the top (default) pane.

Series are moved to the desired pane by associating them with an axis.

### panes.name `String`

The unique pane name.

### panes.margin `Number|Object`

The margin of the pane.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    margin: { top: 1, left: 1 }

### panes.padding `Number|Object`

The padding of the pane.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    padding: { top: 1, left: 1 }

### panes.background `String`

The background color of the pane.

### panes.border `Object`

The border of the pane.

### panes.border.color `String`*(default: "black")*

The color of the border.

### panes.border.dashType `String`*(default: "solid")*

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

### panes.border.width `Number`*(default: 0)*

The width of the border.

### panes.height `Number`

The pane height in pixels.

### panes.title `String|Object`

The pane title text or configuration.

### panes.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### panes.title.border `Object`

The border of the title.

### panes.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### panes.title.border.dashType `String`*(default: "solid")*

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

### panes.title.border.width `Number`*(default: 0)*

The width of the border.

### panes.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### panes.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### panes.title.margin `Number|Object`*(default: 5)*

The margin of the title.

### panes.title.position `String`*(default: "center")*

The position of the title.

#### *"left"*

The pane title is positioned on the left

#### *"right"*

The pane title is positioned on the right

#### *"center"*

The pane title is positioned in the center

### panes.title.text `String`

The text of the title.

### panes.title.visible `Boolean`*(default: true)*

The visibility of the title.

### plotArea `Object`

The plot area configuration options. This is the area containing the plotted series.

### plotArea.background `String`*(default: "white")*

 The background color of the plot area.

### plotArea.opacity `Number`*(default: 1)*

 The background opacity of the plot area.

### plotArea.border `Object`

The border of the plot area.

### plotArea.border.color `String`*(default: "black")*

 The color of the border.

### plotArea.border.dashType `String`*(default: "solid")*

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

### plotArea.border.width `Number`*(default: 0)*

 The width of the border.

### plotArea.margin `Number|Object`*(default: 5)*

 The margin of the plot area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### series `Array`

Array of series definitions.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

Each series type has a different set of options.

> **Info:** Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

### series.type `String`

The type of the series. Available types:

* area
* column
* line
* candlestick, ohlc
* bullet

### series.dashType `String`*(default: "solid")*

The series line dash type.

** Applicable only to line series **

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

### series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

### series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

### series.field `String`

The data field containing the series value.

### series.currentField `String`

The data field containing the current value.

** Available for bullet and verticalBullet series. **

### series.targetField `String`

The data field containing the target value.

** Available for bullet and verticalBullet series. **

### series.groupNameTemplate `String`

Name template for auto-generated series when binding to grouped data.

Template variables:

*   **series** - the series options
*   **group** - the data group
*   **group.field** - the name of the field used for grouping
*   **group.value** - the field value for this group.

### series.name `String`

The series name visible in the legend.

### series.highlight `Object`

Configures the appearance of highlighted points.

### series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

### series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

** Applicable to bubble, pie, candlestick and ohlc series. **

### series.highlight.border.width `Number`

The width of the border.

### series.highlight.border.color `String`

The border color.

### series.highlight.border.opacity `Number`

The border opacity.

### series.highlight.color `String`

The highlight color.

** Available only for pie series **

### series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

### series.highlight.line.width `Number`

The width of the line.

### series.highlight.line.color `String`

The line color.

### series.highlight.line.opacity `Number`

The opacity of the line.

### series.highlight.opacity `Number`

The opacity of the highlighted points.

** Applicable to bubble, pie, candlestick and ohlc series. **

### series.aggregate `String`*(default: "max")*

Aggregate function for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

#### *"max"*

The highest value for the date period.

#### *"min"*

The lowest value for the date period.

#### *"sum"*

The sum of all values for the date period.

#### *"count"*

The number of values for the date period.

#### *"avg"*

The average of all values for the date period.

#### *function (values, series)*

User-defined aggregate function.

#### *object* (compound aggregate)

** Applicable to candlestick and ohlc series **

Specifies the aggregate for each data item field.

##### Example

    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }

### series.axis `String`*(default: primary)*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

### series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

### series.border.color `String|Function`*(default: the color of the curren series)*

The color of the border.

### series.border.dashType `String|Function`*(default: "solid")*

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

### series.border.opacity `Number|Function`

The border opacity.

### series.border.width `Number|Function`*(default: 1)*

The width of the border.

### series.closeField `String`

The data field containing the close value.

** Available for candlestick and ohlc series only **

### series.color `String|Function`

The series base color.

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 105
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: "#ff0000"
        }]
    });

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 95
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: function(point) {
                if (point.value < 100) {
                    // Colorize matching points
                    return "#f00";
                }

                // Use default theme color
            }
        }]
    });

### series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

### series.downColor `String|Function`

The series color when open value is smoller then close value.

** Available for candlestick series only **

### series.downColorField `String`

The data field containing the body color.

** Available for candlestick series only **

### series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

### series.labels `Object`

Configures the series data labels.

#### *"circle"*

The labels are positioned in circle around the chart.

#### *"column"*

The labels are positioned in columns to the left and right of the chart.

### series.labels.background `String|Function`

The background color of the labels.

### series.labels.border `Object`

The border of the labels.

### series.labels.border.color `String|Function`*(default: "black")*

 The color of the border.

### series.labels.border.dashType `String|Function`*(default: "solid")*

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

### series.labels.border.width `Number|Function`*(default: 0)*

 The width of the border.

### series.labels.color `String|Function`

The text color of the labels.

### series.labels.font `String|Function`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### series.labels.format `String|Function`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }

### series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### series.labels.position `String|Function`*(default: "above")*

Defines the position of the labels.

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only. Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### series.labels.template `String | Function`

The label template. Template variables:

*   **value** - the point value. Can be a number or object containing each bindable field.
*   **category** - the category name
    Available for area, column and line series.
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
    Will be null if binding to array.

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### series.labels.visible `Boolean|Function`*(default: false)*

 The visibility of the labels.

### series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

### series.line.color `String`

The line color.

### series.line.opacity `Number`*(default: 1)*

The line opacity.

### series.line.width `String`*(default: 4)*

The line width.

### series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

### series.markers `Object`

Marker options.

** Applicable for area and line series. **

### series.markers.background `String|Function`

The background color of the current series markers.

### series.markers.border `Object|Function`

The border of the markers.

### series.markers.border.color `String|Function`*(default: "black")*

 The color of the border.

### series.markers.border.width `Number|Function`*(default: 0)*

 The width of the border.

### series.markers.size `Number|Function`*(default: 6)*

 The marker size.

### series.markers.type `String|Function`*(default: "circle")*

Configures the markers shape type.

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

### series.markers.visible `Boolean|Function`*(default: false)*

The markers visibility.

### series.markers.rotation `Number|Function`

The rotation angle of the markers.

### series.missingValues `String`*(default: "gap")*

Configures the behavior for handling missing values.

** Applicable for area and line series. **

#### *"interpolate"*

The value is interpolated from neighboring points.

#### *"zero"*

The value is assumed to be zero.

#### *"gap"*

### series.negativeColor `String`

Color to use for bars with negative values.

** Applicable only to column series. **

The plot stops before the missing point and continues after it.

### series.opacity `Number`

The series opacity.

### series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

### series.overlay `Object`

The effects overlay.

### series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

### series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

### series.stack `Boolean|String`*(default: false)*

A value indicating if the series should be stacked. String value indicates that the series should be stacked in a group with the specified name.
Available for column series.

### series.tooltip `Object`

The data point tooltip configuration options.

### series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### series.tooltip.border `Object`

The border configuration options.

### series.tooltip.border.color `String`*(default: "black")*

The color of the border.

### series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

    //sets format of the tooltip
    format: "{0:C}--{1:C}"

### series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 tooltip: {
                     visible: true,
                     template: "#= category # - #= value #"
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### series.width `Number`

The line width.

** Applicable for area and line series. **

### series.target `Object`

The target of the bullet chart.

### series.target.line `Object`

The target line.

### series.target.line.width `Object|Function`

The width of the line.

### series.target.color `String|Function`

The target color.

### series.target.border `Object|Function`

The border of the target.

### series.target.border.color `String|Function`*(default: "black")*

The color of the border.

### series.target.border.dashType `String|Function`*(default: "solid")*

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

### series.target.border.width `Number|Function`*(default: 0)*

The width of the border.

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

### seriesDefaults `Object`

Default values for each series.

### seriesDefaults.area `Object`

The area configuration options.
The default options for all area series. For more details see the series options.

### seriesDefaults.candlestick `Object`

The candlestick configuration options.
The default options for all candlestick series. For more details see the series options.

### seriesDefaults.ohlc `Object`

The ohlc configuration options.
The default options for all ohlc series. For more details see the series options.

### seriesDefaults.border `Object`

The border of the series.

### seriesDefaults.border.color `String`*(default: "black")*

The color of the border.

### seriesDefaults.border.dashType `String`*(default: "solid")*

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

### seriesDefaults.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.column `Object`

The column configuration options.
The default options for all column series. For more details see the series options.

### seriesDefaults.gap `Number`*(default: 1.5)*

 The distance between category clusters.

### seriesDefaults.labels `Object`

Configures the series data labels.

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the margin on all sides to 1
                margin: 1,
                // format the labels as currency
                format: "C"
            }
        },
        ...
    });

### seriesDefaults.labels.background `String`

The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.

### seriesDefaults.labels.border `Object`

The border of the labels.

### seriesDefaults.labels.border.color `String`*(default: "black")*

 The color of the border.

### seriesDefaults.labels.border.dashType `String`*(default: "solid")*

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

### seriesDefaults.labels.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, inlcuding hex
and rgb.

### seriesDefaults.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.
labels

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the font size to 14px
                font: "14px Arial,Helvetica,sans-serif"
            }
        },
        ...
    });

### seriesDefaults.labels.format `String`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### seriesDefaults.labels.margin `Number|Object`*(default: 0)*

 The margin of the labels.

#### Example

    $("#chart).kendoChart({
         labels: {
             // sets the top, right, bottom and left margin to 3px.
             margin: 3
         },
         ...
    });
    //
    $("#chart").kendoChart({
         labels: {
             // sets the top and left margin to 1px
             // margin right and bottom are with 0px (by default)
             margin: { top: 1, left: 1 }
         },
         ...
    });

### seriesDefaults.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### seriesDefaults.labels.template `String | Function`

The label template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefault: {
             labels: {
                 // label template
                 template: "#= value  #%",
                 visible: true
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### seriesDefaults.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            labels: {
                // hide all the series labels by default
                visible: true
            },
            ...
        }
    });

### seriesDefaults.line `Object`

The line configuration options.
The default options for all line series. For more details see the series options.

### seriesDefaults.overlay `Object`

The effects overlay.

### seriesDefaults.pie `Object`

The pie configuration options.
The default options for all pie series. For more details see the series options.

### seriesDefaults.spacing `Number`*(default: 0.4)*

 Space between bars.

### seriesDefaults.stack `Boolean`*(default: false)*

A value indicating if the series should be stacked.

### seriesDefaults.tooltip `Object`

The data point tooltip configuration options.

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### seriesDefaults.tooltip.border `Object`

The border configuration options.

### seriesDefaults.tooltip.border.color `String`*(default: "black")*

 The color of the border.

### seriesDefaults.tooltip.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### seriesDefaults.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

### seriesDefaults.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### seriesDefaults.tooltip.template `String|Function`

The tooltip template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefaults: {
             tooltip: {
                 visible: true,
                 template: "#= category # - #= value #"
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### seriesDefaults.tooltip.visible `Boolean`*(default: false)*

 A value indicating if the tooltip should be displayed.

### theme `String`

Sets Chart theme. Available themes: default, blueOpal, black.

### title `Object`, `String`

The chart title configuration options or text.

### title.align `String`*(default: "center")*

 The alignment of the title.

#### *"left"*

The text is aligned to the left.

#### *"center"*

The text is aligned to the middle.

#### *"right"*

The text is aligned to the right.

### title.background `String`*(default: "white")*

 The background color of the title.

### title.border `Object`

The border of the title.

#### Example

    $("#chart").kendoChart({
        // set border options on the title
        title: {
            border: {
                // set the border color to a dark blue
                color: "#336699",
                // set the width of the border to 2 pixels
                width: 2,
                // set the border style to long dashes
                dashType: "longDash"
            }
        },
        ...
    });

### title.border.color `String`*(default: "black")*

 The color of the border.

### title.border.dashType `String`*(default: "solid")*

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

### title.border.width `Number`*(default: 0)*

 The width of the border.

### title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

 The font of the title.

### title.margin `Number | Object`*(default: 5)*

 The margin of the title.

#### Example

    $("#chart").kendoChart({
        // sets the top, right, bottom and left margin to 3px.
        title: {
            margin: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        // sets the top and left margin to 1px
        // margin right and bottom are with 5px (by default)
        title: {
            margin: { top: 1, left: 1 }
        },
        ...
    });

### title.padding `Number | Object`*(default: 5)*

 The padding of the title.

#### Example

    $("#chart").kendoChart({
        // sets the top, right, bottom and left padding to 3px.
        title: {
            padding: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        // sets the top and left padding to 1px
        // padding right and bottom are with 5px (by default)
        title: {
            padding: { top: 1, left: 1 }
        },
        ...
    });

### title.position `String`*(default: "top")*

 The position of the title.


#### *"top"*

The title is positioned on the top.

#### *"bottom"*

The title is positioned on the bottom.

### title.text `String`

The title of the chart. You can also set the text directly for a title with default options.

#### Example

    $("#chart ").kendoChart({
        title: {
            text: "Sales data"
        },
        ...
    });

    $("#chart ").kendoChart({
        title: "Sales data",
        ...
    });


### title.visible `Boolean`*(default: false)*

 The visibility of the title.

#### Example

    $("#chart ").kendoChart({
        title: {
            // hides the title
            visible: false
        },
        ...
    });

### tooltip `Object`

The data point tooltip configuration options.

### tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### tooltip.border `Object`

The border configuration options.

### tooltip.border.color `String`*(default: "black")*

 The color of the border.

### tooltip.border.width `Number`*(default: 0)*

 The width of the border.

### tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

### tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### tooltip.template `String|Function`

The tooltip template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         tooltip: {
             visible: true,
             template: "#= category # - #= value #"
         }
    });

### tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### tooltip.shared `Boolean`*(default: false)*

A value indicating if the tooltip should be shared.

### tooltip.sharedTemplate `String`

The shared tooltip template.
Template variables:

*   **points** - the category points
*   **category** - the category name

#### Example

    $("#chart").kendoChart({
         title: {
             text: "Internet Users"
         },
         series: [{
             name: "United States",
             data: [67.96, 68.93, 75, 74, 78]
         }, {
             name: "World",
             data: [15.7, 16.7, 20, 23.5, 26.6]
         }],
         categoryAxis: {
             categories: [2005, 2006, 2007, 2008, 2009]
         },
         tooltip: {
             visible: true,
             shared: true,
             sharedTemplate:
                "#= category # </br>" +
                "# for (var i = 0; i < points.length; i++) { #" +
                    "#= points[i].series.name #: #= points[i].value # </br>" +
                "# } #"
         }
    });

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.

### valueAxis `Array`

The value axis configuration options.

### valueAxis.axisCrossingValue `Object | Date | Array`

Value at which the category axis crosses this axis. (Only for object)

Value indicies at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

### valueAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.labels `Object`

Configures the axis labels.

### valueAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

### valueAxis.labels.border `Object`

The border of the labels.

### valueAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### valueAxis.labels.border.dashType `String`*(default: "solid")*

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

### valueAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### valueAxis.labels.format `String`

The format of the labels.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
           labels: {
               // set the format to currency
               format: "C"
           }
        },
        ...
    });

### valueAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### valueAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### valueAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### valueAxis.labels.template `String | Function`

The label template.
Template variables:

*   **value** - the value

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             labels: {
                 // labels template
                 template: "#= value #%"
             }
         }
    });

### valueAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### valueAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

### valueAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

### valueAxis.line.dashType `String`*(default: "solid")*

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

### valueAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

### valueAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### valueAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### valueAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

### valueAxis.majorGridLines.visible `Boolean`*(default: true)*

The visibility of the lines.

### valueAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### valueAxis.majorTicks `Object`

The major ticks of the axis.

### valueAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### valueAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### valueAxis.majorUnit `Number`

The interval between major divisions.

### valueAxis.max `Number`*(default: 1)*

The maximum value of the axis.
This is often used in combination with the **min** configuration option.

### valueAxis.min `Number`*(default: 0)*

The minimum value of the axis.
This is often used in combination with the **max** configuration option.

### valueAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the

### valueAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines.

Note that this has no effect if the visibility of the minor grid lines is not set to **true**.

### valueAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the minor grid lines.

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
body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid lines visibility being set to **true**.

### valueAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### valueAxis.minorGridLines.width `Number`*(default: 1)*

The width of the lines.

Note that this settings has no effect if the visibility of the minor grid lines is not set to **true**.

### valueAxis.minorTicks `Object`

The minor ticks of the axis.

### valueAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### valueAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

### valueAxis.minorUnit `Number`

The interval between minor divisions.
It defaults to 1/5th of the majorUnit.

### valueAxis.name `Object`*(default: primary)*

The unique axis name.

### valueAxis.narrowRange `Boolean`*(default: false)*

Prevents the automatic axis range from snapping to 0.

### valueAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### valueAxis.plotBands `Array`

The plot bands of the value axis.

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### valueAxis.plotBands.color `String`

The color of the plot band.

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

### valueAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

### valueAxis.title `Object`

The title of the value axis.

### valueAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### valueAxis.title.border `Object`

The border of the title.

### valueAxis.title.border.color `String`*(default: "black")*

The color of the border.

### valueAxis.title.border.dashType `String`*(default: "solid")*

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

### valueAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### valueAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

### valueAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### valueAxis.title.text `String`

The text of the title.

### valueAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### valueAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### valueAxis.crosshair `Object`

The crosshair configuration options.

### valueAxis.crosshair.color `String`

The color of the crosshair.

### valueAxis.crosshair.width `Number`

The width of the crosshair.

### valueAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### valueAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### valueAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### valueAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### valueAxis.crosshair.tooltip.border `Object`

The border configuration options.

### valueAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### valueAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### valueAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### valueAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### valueAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### valueAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
                 name: "Series 1",
                 data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });

### valueAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### xAxis `Array`

Scatter charts X-axis configuration options.
Includes **all valueAxis options** in addition to:

### xAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

### xAxis.type `String` *(default: "numeric")*

The axis type.

Note: The Chart will automatically switch to a date axis if the series X value
is of type Date. Specify type explicitly when such behavior is undesired.

### xAxis.axisCrossingValue `Object | Date | Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indicies at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

**Note:** Specify a value greater than or equal to the
axis maximum value to denote the far end of the axis.

#### Example

    $("#chart").kendoChart({
         ...,
         xAxis: {
             axisCrossingValue: [0, 1000]
         },
         yAxis: [{ }, { name: "secondary" }],
         ...
    });

### xAxis.baseUnit `String`

The base time interval for the axis labels.
The default baseUnit is determined automatically from the value range. Available options:

* minutes
* hours
* days
* weeks
* months
* years

### xAxis.labels `Object`

Configures the axis labels.

### xAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

### xAxis.labels.border `Object`

The border of the labels.

### xAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### xAxis.labels.border.dashType `String`*(default: "solid")*

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

### xAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### xAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### xAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### xAxis.labels.format `String`

The format of the labels.

#### Example

    $("#chart").kendoChart({
        xAxis: {
           labels: {
               // set the format to currency
               format: "C"
           }
        },
        ...
    });

### xAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### xAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### xAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### xAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### xAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### xAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### xAxis.labels.template `String | Function`

The label template.

### xAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### xAxis.labels.culture `String`*(default: global culture)*

Culture to use for formatting the dates. See [Globalization](http://www.kendoui.com/documentation/framework/globalization/overview.aspx) for more information.

### xAxis.labels.dateFormats `Object`

Date format strings

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels **format** option will override these defaults.

### xAxis.majorUnit `Number`

The interval between major divisions in base units.

### xAxis.max `Object`

The end date of the axis.
This is often used in combination with the **min** configuration option.

### xAxis.min `Object`

The maximum value of the axis.
This is often used in combination with the **max** configuration option.

### xAxis.minorUnit `Number`

The interval between minor divisions in base units.
It defaults to 1/5th of the majorUnit.

### xAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

### xAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

### xAxis.line.dashType `String`*(default: "solid")*

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

### xAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

### xAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### xAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### xAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

### xAxis.majorGridLines.visible `Boolean`*(default: true)*

The visibility of the lines.

### xAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### xAxis.majorTicks `Object`

The major ticks of the axis.

### xAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### xAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### xAxis.name `Object`*(default: primary)*

The unique axis name.

### xAxis.narrowRange `Boolean`*(default: false)*

Prevents the automatic axis range from snapping to 0.

### xAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### xAxis.plotBands `Array`

The plot bands of the xAxis.

### xAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### xAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### xAxis.plotBands.color `String`

The color of the plot band.

### xAxis.plotBands.opacity `Number`

The opacity of the plot band.

### xAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

### xAxis.title `Object`

The title of the value axis.

### xAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### xAxis.title.border `Object`

The border of the title.

### xAxis.title.border.color `String`*(default: "black")*

The color of the border.

### xAxis.title.border.dashType `String`*(default: "solid")*

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

### xAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### xAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### xAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### xAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### xAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### xAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

### xAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### xAxis.title.text `String`

The text of the title.

### xAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### xAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### xAxis.crosshair `Object`

The crosshair configuration options.

### xAxis.crosshair.color `String`

The color of the crosshair.

### xAxis.crosshair.width `Number`

The width of the crosshair.

### xAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### xAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### xAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### xAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### xAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### xAxis.crosshair.tooltip.border `Object`

The border configuration options.

### xAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### xAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### xAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### xAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### xAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### xAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### xAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
                 name: "Series 1",
                 data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         xAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });

### xAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### yAxis `Array`

Scatter charts Y-axis configuration options.
Includes **all valueAxis options** in addition to:

### yAxis.type `String`*(default: "numeric")*

The axis type.

Note: The Chart will automatically switch to a date axis if the series X value
is of type Date. Specify type explicitly when such behavior is undesired.

### yAxis.axisCrossingValue `Object | Date | Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indicies at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

**Note:** Specify a value greater than or equal to the
axis maximum value to denote the far end of the axis.

#### Example

    $("#chart").kendoChart({
         ...,
         yAxis: {
             axisCrossingValue: [0, 1000]
         },
         xAxis: [{ }, { name: "secondary" }],
         ...
    });

### yAxis.baseUnit `String`

The base time interval for the axis labels.
The default baseUnit is determined automatically from the value range. Available options:

* minutes
* hours
* days
* weeks
* months
* years

### yAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

### yAxis.labels `Object`

Configures the axis labels.

### yAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

### yAxis.labels.border `Object`

The border of the labels.

### yAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### yAxis.labels.border.dashType `String`*(default: "solid")*

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

### yAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### yAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### yAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### yAxis.labels.format `String`

The format of the labels.

#### Example

    $("#chart").kendoChart({
        yAxis: {
           labels: {
               // set the format to currency
               format: "C"
           }
        },
        ...
    });

### yAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### yAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### yAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### yAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### yAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### yAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### yAxis.labels.template `String | Function`

The label template.

### yAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### yAxis.labels.culture `String`*(default: global culture)*

Culture to use for formatting the dates. See [Globalization](http://www.kendoui.com/documentation/framework/globalization/overview.aspx) for more information.

### yAxis.labels.dateFormats `Object`

Date format strings

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels **format** option will override these defaults.

### yAxis.majorUnit `Number`

The interval between major divisions in base units.

### yAxis.max `Object`

The end date of the axis.
This is often used in combination with the **min** configuration option.

### yAxis.min `Object`

The maximum value of the axis.
This is often used in combination with the **max** configuration option.

### yAxis.minorUnit `Number`

The interval between minor divisions in base units.
It defaults to 1/5th of the majorUnit.

### yAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

### yAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

### yAxis.line.dashType `String`*(default: "solid")*

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

### yAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

### yAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### yAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### yAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

### yAxis.majorGridLines.visible `Boolean`*(default: true)*

The visibility of the lines.

### yAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### yAxis.majorTicks `Object`

The major ticks of the axis.

### yAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### yAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### yAxis.name `Object`*(default: primary)*

The unique axis name.

### yAxis.narrowRange `Boolean`*(default: false)*

Prevents the automatic axis range from snapping to 0.

### yAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### yAxis.plotBands `Array`

The plot bands of the yAxis.

### yAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### yAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### yAxis.plotBands.color `String`

The color of the plot band.

### yAxis.plotBands.opacity `Number`

The opacity of the plot band.

### yAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

### yAxis.title `Object`

The title of the value axis.

### yAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### yAxis.title.border `Object`

The border of the title.

### yAxis.title.border.color `String`*(default: "black")*

The color of the border.

### yAxis.title.border.dashType `String`*(default: "solid")*

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

### yAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### yAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### yAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### yAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### yAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### yAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

### yAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### yAxis.title.text `String`

The text of the title.

### yAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### yAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### yAxis.crosshair `Object`

The crosshair configuration options.

### yAxis.crosshair.color `String`

The color of the crosshair.

### yAxis.crosshair.width `Number`

The width of the crosshair.

### yAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### yAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### yAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### yAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### yAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### yAxis.crosshair.tooltip.border `Object`

The border configuration options.

### yAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### yAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### yAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### yAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### yAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### yAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### yAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    // chart intialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
                 name: "Series 1",
                 data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         yAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });

### yAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

## Events

### axisLabelClick

Fires when an axis label is clicked.

#### Example

    function onAxisLabelClick(e) {
        alert("Clicked " + e.axis.type + " axis label with value: " + e.value);
    }

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.value `Object`

The label value or category name.

##### e.text `Object`

The label text.

##### e.index `Object`

The label sequential index or category index.

##### e.dataItem `Object`

The original data item used to generate the label.
** Applicable only for data bound category axis. **

##### e.element `Object`

The DOM element of the label.

### legendItemClick

Fires when an legend item is clicked.

#### Example

    function onLegendItemClick(e) {
        alert("Clicked " + e.text + " series with color: " + e.color);
    }

#### Event Data

##### e.text `Object`

The name of the series.

##### e.color `Object`

The color of the series.

##### e.series `Object`

The series options.

##### e.index `Object`

### dataBound

Fires when the chart has received data from the data source
and is about to render it.

#### Example

    function onDataBound(e) {
        // Series data is now available
    }

### dragStart

Fires when the user has used the mouse or a swipe gesture to drag the chart.

The drag operation can be aborted by calling `e.preventDefault()`.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### drag

Fires as long as the user is dragging the chart using the mouse or swipe gestures.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
            name: "price"
        },
        drag: onDrag
        ...
    }

    function onDrag(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### dragEnd

Fires when the user stops dragging the chart.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### plotAreaClick

Fires when plot area is clicked.

#### Example

    function onPlotAreaClick(e) {
        alert("Clicked X axis value: " + e.x);
    }

#### Event Data

##### e.value `Object`

The data point value.
Available only for categorical charts (bar, line, area and similar).

##### e.category `Object`

The data point category.
Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The X axis value or array of values for multi-axis charts.

### seriesClick

Fires when chart series are clicked.

#### Example

    function onSeriesClick(e) {
        alert("Clicked value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

### seriesHover

Fires when chart series are hovered.

#### Example

    function onSeriesHover(e) {
        alert("Hovered value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

### zoomStart

Fires when the user has used the mousewheel to zoom the chart.

The zoom operation can be aborted by calling `e.preventDefault()`.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

### zoom

Fires as long as the user is zooming the chart using the mousewheel.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
            name: "price"
        },
        zoom: onZoom
        ...
    }

    function onZoom(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.delta `Number`

A number that indicates the zoom amount and direction.

A negative delta indicates "zoom in", while a positive "zoom out".

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

This event can be used to prevent the default mousewheel action (scroll).

#### Example

    function onZoom(e) {
        // Prevent window scroll
        e.originalEvent.preventDefault();
    }

### zoomEnd

Fires when the user stops zooming the chart.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

### selectStart

Fires when the user starts modifying the axis selection.

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

### select

Fires when the user modifies the selection.

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

### selectEnd

Fires when the user completes modifying the selection.

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

