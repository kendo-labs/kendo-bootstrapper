---
title: kendo.dataviz.ui.Chart
meta_title: Configuration, methods and events of Kendo UI DataViz Chart
meta_description: Learn how to configure Kendo UI Javascript chart widget in a few easy steps, use and change methods and events.
slug: api-dataviz-chart
relatedDocs: gs-dataviz-chart-overview
tags: api,dataviz
publish: true
---

# kendo.dataviz.ui.Chart

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="chart"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/stockdata",
          dataType: "jsonp"
        }
      }
    });
    $("#chart").kendoChart({
      autoBind: false,
      dataSource: dataSource,
      series: [
        { field: "Volume" }
      ]
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### axisDefaults `Object`

The default options for all chart axes. Accepts the options supported by [categoryAxis](#configuration-categoryAxis), [valueAxis](#configuration-valueAxis), [xAxis](#configuration-xAxis) and [yAxis](#configuration-yAxis).

#### Example - set the default axis options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      axisDefaults: {
        categories: [ "2012", "2013"]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis `Array|Object`

The category axis configuration options.

#### Example - configure the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        categories: ["2012", "2013"],
        color: "#ff0000"
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.autoBaseUnitSteps `Object`

The discrete [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) values when
either [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

#### Example - set category axis auto base unit steps

    <div id="chart"></div>
    <script>
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
        }
    });
    </script>

### categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

### categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

### categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

### categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

### categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

### categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

#### Example

### categoryAxis.axisCrossingValue `Object|Date|Array`

Category index at which the first value axis crosses this axis (when set as an object).

Category indices at which the value axes cross the category axis (when set as an array).

> set an index greater than or equal to the number of categories to denote the far end of the axis.

#### Example - set the category axis crossing values

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        axisCrossingValue: [0, 10]
      },
      valueAxis: [{}, {}],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.baseUnit `String`

The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.

The supported values are:

* "days"
* "fit"
* "hours"
* "minutes"
* "months"
* "weeks"
* "years"

Setting `baseUnit` to "fit" will set such base unit and [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep)
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

Series data is aggregated for the specified base unit using the [series.aggregate](#configuration-series.aggregate) function.

### categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit".

### categoryAxis.categories `Array`

The category names. The chart will create a category for every item of the array.

#### Example - set the categories

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.color `String`

The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by [categoryAxis.labels.color](#configuration-categoryAxis.labels.color) and
[categoryAxis.line.color](#configuration-categoryAxis.line.color).

#### Example - set the category axis color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [categoryAxis.crosshair.visible](#configuration-categoryAxis.crosshair.visible) option is set to `true`.

#### Example - set the category axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        {
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### categoryAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the category axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [categoryAxis.crosshair.tooltip.visible](#configuration-categoryAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the category axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        {
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the category axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the category axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the category axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair tooltip. By default the category axis crosshair tooltip is not visible.

#### Example - show the category axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair. By default the category axis crosshair is not visible.

#### Example - show the category axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the category axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.field `String`

The data item field which contains the category name. Requires the [dataSource](#configuration-dataSource) option to be set.

#### Example - set the category axis field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        field: "year"
      },
      series: [
        { field: "value" }
      ],
      dataSource: [
        { year: "2012", value: 1 },
        { year: "2013", value: 2 }
      ]
    });
    </script>

### categoryAxis.justified `Boolean` *(default: false)*

If set to `true` the chart will position categories and series points on major ticks. This removes the empty space before and after the series.

> This option is ignored if the [series.type](#configuration-series.type) option is set to "bar", "column", "ohlc" or "candlestick".

#### Example - justify categories and series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        justified: true,
        categories: ["2012", "2013"]
      }],
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels `Object`

The axis labels configuration.

#### Example - configure the category axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          background: "green",
          color: "white"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border `Object`

The border of the labels.

#### Example - set the category axis label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            color: "green",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/getting-started/framework/globalization/overview) for more information.

### categoryAxis.labels.dateFormats `Object`

The format used to display the labels when the categories are dates. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example - set category axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        labels: {
          dateFormats: {
            days:"M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "days".

#### Example - set the days format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "hours".

#### Example - set the hours format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "months".

#### Example - set the months format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the category axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
           font: "20px sans-serif",
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          format: "Year: {0}"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the category axis label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the category axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the category axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the category axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the category axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.mirror `Boolean` *(default: false)*

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

#### Example - mirror the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          mirror: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the category axis label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the category axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the category axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the category axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the category axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example - rotate the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          rotation: 90
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

#### Example - skip category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          skip: 1
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd category axis label
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          template: "Year: #: value #"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          template: kendo.template("Year: #: value #")
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.

#### Example - hide the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the category axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        line: {
          color: "#aa00bb",
          width: 3
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the category axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        line: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        line: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        line: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          dashType: "dashDot"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis lines. By default the category axis lines are visible.

#### Example - hide the category axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

#### Example - set the category axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the category axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          width: 3,
          color: "green"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis major grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis major grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          dashType: "dashDot"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

#### Example - hide the category axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorGridLines.width `Number` *(default: 1)*

The width of the category axis major grid lines in pixels.

#### Example - set the category axis major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks `Object`

The configuration of the category axis major ticks.

#### Example - configure the category axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the category axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          size: 6
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the category axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the category axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.max `Object`

The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### categoryAxis.maxDateGroups `Number` *(default: 10)*

The maximum number of groups (categories) to display when
[categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

### categoryAxis.min `Object`

The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### categoryAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          width: 3,
          color: "green"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          dashType: "dashDot"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

#### Example - set the category axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorTicks `Object`

The configuration of the category axis minor ticks.

#### Example - configure the category axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorTicks {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorTicks {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorTicks {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the category axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          size: 6
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis minor ticks. By default the category axis minor ticks are visible.

#### Example - hide the category axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the category axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.name `String` *(default: "primary")*

The unique axis name. Used to associate a series with a category axis using the [series.categoryAxis](#configuration-series.categoryAxis) option.

#### Example - set the category axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [
        { name: "month", categories: [ "Jan", "Feb" ] },
        { name: "year", categories: [ 2012 ] }
      ],
      series: [
        { categoryAxis: "month", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.pane `String`

The name of the pane that the category axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the category axis pane

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis",
          categoryAxis: "secondCategoryAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ],
      categoryAxis: [
        { pane: "topPane" },
        { name: "secondCategoryAxis", pane: "bottomPane" }
      ]
    });
    </script>

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

#### Example - set the category plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the category plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the category plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the category plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the category plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.reverse `Boolean` *(default: false)*

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

#### Example - reverse the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        categories: ["2012", "2013"],
        reverse: true
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.roundToBaseUnit `Boolean` *(default: true)*

If set to `true` the chart will round the first and last date to the nearest base unit.

The `roundToBaseUnit` option will be ignored if [series.type](#configuration-series.type) is set to "bar", "column", "ohlc" or "candlestick".

### categoryAxis.select `Object`

The selected axis range. If set, axis selection will be enabled.

The range units are:

* Category index (0-based)
* Date

#### Example - configure category axis selection

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          max: 3
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.from `Object`

The lower boundary of the selected range.

#### Example - set the category axis selection lower boundary

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.max `Object`

The maximum value which the user can select.

> The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories set
a value larger than the last category index (date).

#### Example - set the category axis selection maximum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          max: 3
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.min `Object`

The minimum value which the user can select.

#### Example - set the category axis selection minimum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          min: 1
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel `Object`

The mouse wheel configuration of the selection.

#### Example - configure the category axis selection mouse wheel behavior

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            reverse: false,
            zoom: "left"
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel.reverse `Boolean` *(default: true)*

If set to `true` will reverse the mouse wheel direction. The normal direction is down for "zoom out", up for "zoom in".

#### Example - disable reverse mouse wheel selection

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            reverse: false
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel.zoom `String` *(default: "both")*

The zoom direction.

The supported values are:

* "both" - zooming expands and contracts the selection both sides

* "left" - zooming expands and contracts the selection left side only

* "right" - zooming expands and contracts the selection right side only

#### Example - set the category axis selection zoom

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            zoom: "left"
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.to `Object`

The upper boundary of the selected range.

> The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories set
a value larger than the last category index (date).

#### Example - set the category axis selection lower boundary

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](#configuration-categoryAxis.title.text) option must be set in order to display the title.


#### Example - set the category axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border `Object`

The border of the title.

#### Example - set the category axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the category axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the category axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the category axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the category axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the category axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the category axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the category axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the category axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the category axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the category axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the category axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the category axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the category axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          rotation: 90
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.text `String`

The text of the title.

#### Example - set the category axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis title. By default the category axis title is visible.

#### Example - hide the category axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years"
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.type `String` *(default: "category")*

The category axis type.

The supported values are:

* "category" - discrete category axis.

* "date" - specialized axis for displaying chronological data.

#### Example - set the category axis type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2011/12/20"),
          new Date("2011/12/21")
        ],
        type: "date"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis. By default the category axis is visible.

#### Example - hide the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2011/12/20"),
          new Date("2011/12/21")
        ],
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.weekStartDay `Number` *(default: kendo.days.Sunday)*

The week start day when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

The supported values are:

* kendo.days.Sunday - equal to 0
* kendo.days.Monday - equal to 1
* kendo.days.Tuesday - equal to 2
* kendo.days.Wednesday - equal to 3
* kendo.days.Thursday - equal to 4
* kendo.days.Friday - equal to 5
* kendo.days.Saturday - equal to 6

### chartArea `Object`

The chart area configuration options. Represents the entire visible area of the chart.

### chartArea.background `String` *(default: "white")*

The background color of the chart area. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart area background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart area background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart area background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border `Object`

The border of the chart area.

#### Example - set the chart area border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart area border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart area border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart area border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.height `Number` *(default: 400)*

The height of the chart area.

#### Example - set the chart area height
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        height: 200
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin `Number|Object` *(default: 5)*

The margin of the chart area. A numeric value will set all margins.

#### Example - set the chart area margin
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.bottom `Number` *(default: 5)*

The bottom margin of the chart area.

#### Example - set the chart area bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.left `Number` *(default: 5)*

The left margin of the chart area.

#### Example - set the chart area left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.right `Number` *(default: 5)*

The right margin of the chart area.

#### Example - set the chart area right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.top `Number` *(default: 5)*

The top margin of the chart area.

#### Example - set the chart area top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.opacity `Number` *(default: 1)*

The background opacity of the chart area. By default the background is opaque.

#### Example - set the chart area opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "green",
        opacity: 0.1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.width `Number` *(default: 600)*

The width of the chart area.

#### Example - set the chart area width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        width: 500
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the chart which is used to display the series. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/framework/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/framework/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/framework/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { price: 10 },
          { price: 20 }
        ]
      },
      series: [
        { field: "price" }
      ]
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { price: 10 },
        { price: 20 }
      ],
      series: [
        { field: "price" }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance
    <div id="chart"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/stockdata",
          dataType: "jsonp"
        }
      }
    });
    $("#chart").kendoChart({
      dataSource: dataSource,
      series: [
        { field: "Volume" }
      ]
    });
    </script>

### legend `Object`

The chart legend configuration options.

#### Example - configure the chart legend
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        background: "green",
        position: "left",
        labels: {
          font: "20px sans-serif",
          color: "red"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.background `String` *(default: "white")*

The background color of the legend. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        background: "#aa00bb"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend background as a RGB value

    $("#chart").kendoChart({
      legend: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend background by name

    $("#chart").kendoChart({
      legend: {
        background: "green"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border `Object`

The border of the legend.

#### Example - set the chart legend border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart legend border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart legend border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems `Object`

The chart inactive legend items configuration.

#### Example - configure the chart legend inactive items

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            background: "green",
            color: "white"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels `Object`

The chart legend label configuration.

#### Example - configure the chart legend labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            background: "green",
            color: "white"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "#aa00bb"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "rgb(128, 0, 255)"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "green"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart legend label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            font: "20px sans-serif"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. (only for donut and pie charts)
*   dataItem - the original data item used to construct the point. (only for donut and pie charts)

#### Example - set the chart legend label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: "Name: #: text #"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: kendo.template("Name: #: text #")
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels `Object`

The chart legend label configuration.

#### Example - configure the chart legend labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          background: "green",
          color: "white"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart legend label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
           font: "20px sans-serif"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin `Number|Object` *(default: 10)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart legend label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart legend label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            bottom: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart legend label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            left: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart legend label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            right: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart legend label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            top: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. (only for donut and pie charts)
*   dataItem - the original data item used to construct the point. (only for donut and pie charts)

#### Example - set the chart legend label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: "Name: #: text #"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: kendo.template("Name: #: text #")
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin `Number|Object` *(default: 5)*

The margin of the chart legend. A numeric value will set all paddings.

#### Example - set the chart legend margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: 20
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.bottom `Number` *(default: 0)*

The bottom margin of the chart legend.

#### Example - set the chart legend bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          bottom: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.left `Number` *(default: 0)*

The left margin of the chart legend.

#### Example - set the chart legend left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          left: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.right `Number` *(default: 0)*

The right margin of the chart legend.

#### Example - set the chart legend right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          right: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.top `Number` *(default: 0)*

The top margin of the chart legend.

#### Example - set the chart legend top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          top: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.offsetX `Number` *(default: 0)*

The X offset of the chart legend. The offset is relative to the default position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
A negative value will move the legend to the left of its current position.

#### Example - set the chart legend horizontal offset

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        offsetX: 10
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.offsetY `Number` *(default: 0)*

The Y offset of the chart legend.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from its initial position.
A negative value will move the legend upwards from its current position.

#### Example - set the chart legend vertical offset

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        offsetY: 10
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.position `String` *(default: "right")*

The positions of the chart legend.

The supported values are:

* "top" - the legend is positioned on the top.

* "bottom" - the legend is positioned on the bottom.

* "left" - the legend is positioned on the left.

* "right" - the legend is positioned on the right.

* "custom" - the legend is positioned using [legend.offsetX](#configuration-legend.offsetX) and [legend.offsetY](#configuration-legend.offsetY).

### legend.visible `Boolean` *(default: true)*

If set to `true` the chart will display the legend. By default the chart legend is visible.

#### Example - hide the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        visible: false
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### panes `Array`

The chart panes configuration.

Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.

Each axis can be associated with a pane by setting its `pane` option to the name of the desired pane.
Axis that don't have specified pane are placed in the top (default) pane.

Series are moved to the desired pane by associating them with an axis.

#### Example - configure the chart panes
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane" }
      ]
    });
    </script>

### panes.background `String`

The background color of the chart pane. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart panes background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "#00ff00" },
        { name: "bottom-pane", background: "#ff00ff" }
      ]
    });
    </script>

#### Example - set the chart panes background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "rgb(0, 255, 0)" },
        { name: "bottom-pane", background: "rgb(255, 0, 255)" }
      ]
    });
    </script>

#### Example - set the chart panes background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "red" },
        { name: "bottom-pane", background: "green" }
      ]
    });
    </script>

### panes.border `Object`

The border of the chart pane.

#### Example - set the chart pane border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            color: "red",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            color: "green",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            color: "red",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            color: "green",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart pane border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            dashType: "dashDot",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            dashType: "dashDot",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart pane border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            width: 2
          }
        }
      ]
    });
    </script>

### panes.height `Number`

The chart pane height in pixels.

#### Example - set the chart pane height

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", height: 200 },
        { name: "bottom-pane", height: 300  }
      ]
    });
    </script>

### panes.margin `Number|Object` *(default: 0)*

The margin of the pane. A numeric value will set all margins.

#### Example - set the chart pane margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", margin: 10 },
        { name: "bottom-pane", margin: 10 }
      ]
    });
    </script>

### panes.margin.bottom `Number` *(default: 0)*

The bottom margin of the chart panes.

#### Example - set the chart pane bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            bottom: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            bottom: 10
          }
        }
      ]
    });
    </script>

### panes.margin.left `Number` *(default: 0)*

The left margin of the chart panes.

#### Example - set the chart pane left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            left: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            left: 10
          }
        }
      ]
    });
    </script>

### panes.margin.right `Number` *(default: 0)*

The right margin of the chart panes.

#### Example - set the chart pane right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            right: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            right: 10
          }
        }
      ]
    });
    </script>

### panes.margin.top `Number` *(default: 0)*

The top margin of the chart panes.

#### Example - set the chart pane top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            top: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            top: 10
          }
        }
      ]
    });
    </script>

### panes.name `String`

The unique name of the chart pane.

#### Example - set the chart pane name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane" }
      ]
    });
    </script>

### panes.padding `Number|Object` *(default: 0)*

The padding of the pane. A numeric value will set all paddings.

#### Example - set the chart pane padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", padding: 10 },
        { name: "bottom-pane", padding: 10 }
      ]
    });
    </script>

### panes.padding.bottom `Number` *(default: 0)*

The bottom padding of the chart panes.

#### Example - set the chart pane bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            bottom: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            bottom: 10
          }
        }
      ]
    });
    </script>

### panes.padding.left `Number` *(default: 0)*

The left padding of the chart panes.

#### Example - set the chart pane left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            left: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            left: 10
          }
        }
      ]
    });
    </script>

### panes.padding.right `Number` *(default: 0)*

The right padding of the chart panes.

#### Example - set the chart pane right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            right: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            right: 10
          }
        }
      ]
    });
    </script>

### panes.padding.top `Number` *(default: 0)*

The top padding of the chart panes.

#### Example - set the chart pane top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            top: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            top: 10
          }
        }
      ]
    });
    </script>

### panes.title `String|Object`

The title configuration of the chart pane.

> The [panes.title.text](#configuration-panes.title.text) option must be set in order to display the title.

#### Example - set the chart pane title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom"
          }
        }
      ]
    });
    </script>

### panes.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            background: "red"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            background: "green"
          }
        }
      ]
    });
    </script>

### panes.title.border `Object`

The border of the title.

#### Example - set the chart pane title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              color: "red",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              color: "green",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              color: "red",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              color: "green",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart pane title border dashType

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              dashType: "dashDot",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              dashType: "dashDot",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "#aa00bb"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "#a0b0c0"
          }
        }
      ]
    });
    </script>

#### Example - set the chart pane title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "rgb(128, 0, 255)"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "rgb(128, 0, 255)"
          }
        }
      ]
    });
    </script>

#### Example - set the chart pane title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "red"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "green"
          }
        }
      ]
    });
    </script>

### panes.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the chart pane title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            font: "20px sans-serif"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "green"
          }
        }
      ]
    });
    </script>

### panes.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the chart pane title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: 10
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: 10
          }
        }
      ]
    });
    </script>

### panes.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the chart pane title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              bottom: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              bottom: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the chart pane title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              left: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              left: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the chart pane title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              right: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              right: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the chart pane title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              top: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              top: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the chart pane title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            position: "left"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            position: "left"
          }
        }
      ]
    });
    </script>

### panes.title.text `String`

The text of the title.

#### Example - set the chart pane title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom"
          }
        }
      ]
    });
    </script>

### panes.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the pane title. By default the pane title is visible.

#### Example - hide the chart pane title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            visible: false
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            visible: false
          }
        }
      ]
    });
    </script>

### plotArea `Object`

The plot area configuration options. The plot area is the area which displays the series.

#### Example - configure the chart plot area

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green",

      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.background `String` *(default: "white")*

The background color of the chart plot area. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart plot area background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart plot area background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart plot area background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border `Object`

The border of the chart plot area.

#### Example - set the chart plot area border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart plot area border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart plot area border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart plot area border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin `Number|Object` *(default: 5)*

The margin of the chart plot area. A numeric value will set all margins.

#### Example - set the chart plot area margin
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.bottom `Number` *(default: 5)*

The bottom margin of the chart plot area.

#### Example - set the chart plot area bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.left `Number` *(default: 5)*

The left margin of the chart plot area.

#### Example - set the chart plot area left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.right `Number` *(default: 5)*

The right margin of the chart plot area.

#### Example - set the chart plot area right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.top `Number` *(default: 5)*

The top margin of the chart plot area.

#### Example - set the chart plot area top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.opacity `Number` *(default: 1)*

The background opacity of the chart plot area. By default the background is opaque.

#### Example - set the chart plot area opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green",
        opacity: 0.1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### series `Array`

The configuration of the chart series.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

> Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

#### Example - configure the chart series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2, 3] },
        { type: "bar", data: [4, 5, 6] }
      ]
    });
    </script>

### series.aggregate `String` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period.
* function (values, series) - user-defined aggregate function.
* object  - (compound aggregate) **Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

##### Example - set the chart series aggregate

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2012/01/01"),
          new Date("2012/01/02"),
          new Date("2012/01/02")
        ],
        type: "date"
      },
      series: [{
          data: [1, 2, 3],
          aggregate: "avg"
      }]
    });
    </script>

### series.axis `String` *(default: "primary")*

The name of the value axis to use.

> The `axis` option is supported when [series.type](#configuration-series.type) is set to "area", "bar", "column", "line", "candlestick" or "ohlc".

#### Example - set the chart series value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [
        { name: "first" },
        { name: "second" }
      ],
      series: [
        { data: [800, 100, 300],  axis: "first" },
        { data: [1, 5],  axis: "second" }
      ]
    });
    </script>

### series.border `Object`

The border of the chart series.

> The `border` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "donut", "pie", "bubble", "candlestick" or "ohlc".

#### Example - set the chart series border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            dashType: "dash",
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb. By default it is set to color of the current series.

#### Example - set the chart series border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black"
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            dashType: "dash",
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.

#### Example - set the chart series border opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            opacity: 0.5
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.width `Number` *(default: 1)*

The width of the border in pixels.

#### Example - set the chart series border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.categoryField `String` *(default: "category")*

The data item field which contains category name.

> The `categoryField` option is supported when [series.type](#configuration-series.type) is set to "bubble", "donut" or "pie".

#### Example - set the chart series category field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "pie",
          categoryField: "type",
          data: [
            { value: 1, type: "Category 1" },
            { value: 2, type: "Category 2" },
          ]
        }
      ]
    });
    </script>

### series.closeField `String` *(default: "close")*

The data field containing the close value.

> The `closeField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          closeField: "closePrice",
          data: [
            { open: 1, high: 2, low: 0.5, closePrice: 1.5},
            { open: 2, high: 3, low: 1, closePrice: 1.5}
          ]
        }
      ]
    });
    </script>

### series.color `String`

The series base color. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series color as a hex string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2],
          color: "#a0b0c0"
        }
      ]
    });
    </script>

#### Example - set the chart series color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2],
          color: "rgb(128, 0, 255)"
        }
      ]
    });
    </script>

#### Example - set the chart series color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2],
          color: "red"
        }
      ]
    });
    </script>

#### Example - set the chart series color as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2],
          color: function(point) {
            if (point.value > 1) {
              return "red";
            }

            // use the default series theme color
          }
        }
      ]
    });
    </script>

### series.colorField `String` *(default: "color")*

The data item field which contains the series color.

> The `colorField` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "bubble", "donut", "pie", "candlestick" or "ohlc".

#### Example - set the chart series color field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        colorField: "valueColor",
        data: [
         { value: 1, valueColor: "red" },
         { value: 2, valueColor: "green" }
        ]
      }]
    });
    </script>

### series.connectors `Object`

The label connectors options.

> The `connectors` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie" and
[series.labels.visible](#configuration-series.labels.visible) is set to `true`.

#### Example - configure the label connectors
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          width: 4,
          color: "red"
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.color `String`

The color of the connector. Accepts a valid CSS color string, including hex and rgb.

#### Example - configure the label connector color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          color: "red"
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.padding `Number` *(default: 4)*

The padding between the connector line and the label, and connector line and donut chart.

#### Example - configure the label connector padding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          padding: 10
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.width `Number` *(default: 1)*

The width of the connector line.

#### Example - configure the label connector width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          width: 10
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.currentField `String` *(default: "current")*

The data item field containing the current value.

> The `currentField` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - set the bullet chart series current field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          currentField: "price",
          data: [
            { price: 1, target: 2 }
          ]
        }
      ]
    });
    </script>

### series.dashType `String` *(default: "solid")*

The dash type of line chart.

> The `dashType` option is taken into consideration only if the [series.type](#configuration-series.type) option is set to "line".

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart legend border dash type
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          dashType: "dashDot",
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](#configuration-series.type) option is set to "area", "bar", "column", "donut", "pie" or "line".
* Array of arrays of numbers. Supported when the [series.type](#configuration-series.type) option is set to "bubble", "scatter", "scatterLine" or "ohlc".
    * Bubble series need arrays of three values - X value, Y value and Size value e.g. `[1, 1, 10]`
    * Scatter and scatter line series need arrays of two values - X value and Y value
    * OHLC and candlestick series need arrays of four values - open, high, low and close

#### Example - set the chart series data as array of objects

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          field: "price",
          data: [
            { price: 1 },
            { price: 2 },
            { price: 3 }
          ]
        }
      ]
    });
    </script>

#### Example - set the chart series data as array of numbers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart series data as array of arrays

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bubble",
          data: [
            [1, 2, 15],
            [2, 3, 4]
          ]
        }
      ]
    });
    </script>

### series.downColor `String`

The series color when the open value is greater than the close value.

> The `downColor` option is supported when [series.type](#configuration-series.type) is set to "candlestick".

#### Example - set the chart series down color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "candlestick",
        downColor: "green",
        color: "red",
        data: [
          { open: 4, high: 5, low: 2, close: 3 },
          { open: 3, high: 5, low: 2, close: 4 }
        ]
      }]
    });
    </script>

### series.downColorField `String` *(default: "downColor")*

The data field containing the color applied when the open value is greater than the close value.

> The `downColorField` option is supported when [series.type](#configuration-series.type) is set to "candlestick".

#### Example - set the chart series down color field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "candlestick",
        color: "red",
        downColorField:"down",
        data: [
          { open: 4, high: 5, low: 2, close: 3, down: "green" },
          { open: 3, high: 5, low: 2, close: 4 }
        ]
      }]
    });
    </script>

### series.explodeField `String` *(default: "explode")*

The data item field which contains a boolean value indicating whether the sector is exploded.

> The `explodeField` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart series explode field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "pie",
          explodeField: "isExploded",
          data: [
            { value: 1, isExploded: true },
            { value: 2 }, // isExpaded is missing, "false" is asumed
            { value: 3, isExploded: false }
          ]
        }
      ]
    });
    </script>

### series.field `String` *(default: "value")*

The data item field which contains the series value.

#### Example - set the chart series field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "pie",
          field: "price",
          data: [
            { price: 1 },
            { price: 2 },
            { price: 3 }
          ]
        }
      ]
    });
    </script>

### series.gap `Number` *(default: 1.5)*

The distance between the category clusters.

> The `gap` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick" or "ohlc".

#### Example - set the chart series gap

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        gap: 0,
        data: [1, 2]
      }]
    });
    </script>

### series.groupNameTemplate `String`

The [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example - set the chart series group name template

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { value: 1, category: "One"},
          { value: 2, category: "Two"}
        ],
        group: { field: "category" }
      },
      series: [
        {
          field: "value",
          groupNameTemplate: "Category: #: group.value #"
        }
      ]
    });
    </script>

### series.highField `String` *(default: "high")*

The data field containing the high value.

> The `highField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          highField: "highPrice",
          data: [
            { open: 1, highPrice: 2, low: 0.5, close: 1.5},
            { open: 2, highPrice: 3, low: 1, close: 1.5}
          ]
        }
      ]
    });
    </script>

### series.highlight `Object`

The chart series highlighting configuration options.

#### Example - configure the chart series highlighting

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              opacity: 1,
              width: 5,
              color: "black"
            }
          }
      }]
    });
    </script>

### series.highlight.border `Object`

The border of the highlighted chart series. The color is computed automatically from the base point color.

> The `border` option is supported when [series.type](#configuration-series.type) is set to "donut", "bubble", "pie", "candlestick" or "ohlc".

#### Example - set the chart highlight border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              width: 5,
              color: "black"
            }
          }
      }]
    });
    </script>

### series.highlight.border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart highlight border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              color: "red",
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.

#### Example - set the chart highlight border opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              opacity: 0.5,
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart highlight border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.color `String`

The highlight color. Accepts a valid CSS color string, including hex and rgb.

> The `color` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart highlight color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "donut",
          data: [1, 2],
          highlight: {
            color: "green"
          }
      }]
    });
    </script>

### series.highlight.line `Object`

The line of the highlighted chart series. The color is computed automatically from the base point color.

> The `line` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the highlight line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              width: 5,
              color: "green"
            }
          }
      }]
    });
    </script>

### series.highlight.line.color `String`

The line color. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the highlight line color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              color: "green"
            }
          }
      }]
    });
    </script>

### series.highlight.line.opacity `Number` *(default: 1)*

The opacity of the line. By default the border is opaque.

#### Example - set the highlight line opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              opacity: 0.5,
              width: 10
            }
          }
      }]
    });
    </script>

### series.highlight.line.width `Number`

The width of the line.

#### Example - set the highlight line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.opacity `Number`

The opacity of the highlighted points.

> The `opacity` option is supported when [series.type](#configuration-series.type) is set to "bubble", "pie" or "donut".

#### Example - set the highlight opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            opacity: 0.5
          }
      }]
    });
    </script>

### series.highlight.visible `Boolean` *(default: true)*

If set to `true` the chart will highlight the series when the user hovers it with the mouse.
By default chart series highlighting is enabled.

#### Example - prevent the chart series highlighting

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            visible: false
          }
      }]
    });
    </script>

### series.holeSize `Number`

The diameter of the donut hole in pixels.

> The `holeSize` option is supported when [series.type](#configuration-series.type) is set to "donut".

#### Example - set the donut chart hole size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "donut",
          holeSize: 80,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](#configuration-series.labels.visible) option is set to `true`.

#### Example - configure the chart series label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          background: "green",
          border: {
            width: 2,
            color: "black"
          }
        },
        data: [1, 2]
      }]
    });
    </script>

### series.labels.align `String` *(default: "circle")*

The label alignment when [series.type](#configuration-series.type) is set to "donut" or "pie".

The supported values are:

* "circle" - the labels are positioned in circle around the chart.
* "column" - the labels are positioned in columns to the left and right of the chart.

#### Example - set the chart series label alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          align: "column"
        },
        type: "pie",
        data: [1, 2, 3, 4, 5, 6]
      }]
    });
    </script>

### series.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          background: "green"
        },
        data: [1, 2]
      }]
    });
    </script>

### series.labels.border `Object`

The border of the labels.

#### Example - set the chart series label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              color: "green",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              dashType: "dashDot",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "#aa00bb"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

#### Example - set the chart series label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "rgb(128, 0, 255)"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

#### Example - set the chart series label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.distance `Number` *(default: 35)*

The distance of the labels when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart series label distance
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          distance: 70
        },
        type: "pie",
        data: [1, 2, 3, 4, 5, 6]
      }]
    });
    </script>

### series.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart series label font
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          font: "20px sans-serif"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.format `String` *(default: "{0}")*

The format of the labels. Uses [kendo.format](/api/framework/kendo#methods-format).

#### Example - set the chart series label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          format: "{0:C}"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.margin `Number|Object` *(default: 5)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: 10,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            bottom: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            left: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            right: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            top: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: 10,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            bottom: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            left: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            right: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            top: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.position `String` *(default: "above")*

The position of the labels.

* "above" - the label is positioned at the top of the marker. ** Applicable for area, bubble, line, scatter and scatterLine series. **
* "below" - the label is positioned at the bottom of the marker. ** Applicable for area, bubble, line, scatter and scatterLine series. **
* "center" - the label is positioned at the point center. ** Applicable for bar, column, donut and pie series. **
* "insideBase" - the label is positioned inside, near the base of the bar. ** Applicable for bar and column series. **
* "insideEnd" - the label is positioned inside, near the end of the point. ** Applicable for bar, column, donut and pie series. **
* "left" - the label is positioned to the left of the marker. ** Applicable for area, bubble, line, scatter and scatterLine series. **
* "outsideEnd" - the label is positioned outside, near the end of the bar. ** Applicable for bar, column, donut and pie series. Not applicable for stacked series. **
* "right" - the label is positioned to the right of the marker. ** Applicable for area, bubble, line, scatter and scatterLine series. **

#### Example - set the chart series label position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          position: "center"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available for donut and pie series.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example - set the chart series label template

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          template: "Value: #: value #%"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

#### Example - show the chart series labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line `String|Object`

The chart line configuration options.

> The `line` option is supported when the [series.type](#configuration-series.type) option is set to "area", "candlestick" or "ohlc".

#### Example - configure the chart line options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.color `String`

The line color. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart line color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.opacity `Number` *(default: 1)*

The line opacity. By default the line is opaque.

#### Example - set the chart line opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          opacity: 0.5,
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.width `String` *(default: 4)*

The line width in pixels.

#### Example - set the chart line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          opacity: 0.5,
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.lowField `String` *(default: "low")*

The data field containing the low value.

> The `lowField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          lowField: "lowPrice",
          data: [
            { open: 1, high: 2, low: 0.5, lowPrice: 1.5},
            { open: 2, high: 3, low: 1, lowPrice: 1.5}
          ]
        }
      ]
    });
    </script>

### series.margin `Number|Object` *(default: 1)*

The margin around each donut series (ring). A numeric value will set all margins.

#### Example - set the chart donut series margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: 30,
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart donut series bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          bottom: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart donut series left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          left: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart donut series right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          right: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart donut series top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          top: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers `Object`

The chart series marker configuration.

> The chart displays the series labels when the [series.markers.visible](#configuration-series.markers.visible) option is set to `true`.
> The `markers` option is supported when [series.type](#configuration-series.type) is set to "area", "line", "scatter" or "scatterLine".

#### Example - set the chart series markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          background: "green",
          size: 30
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.background `String`

The background color of the series markers.

#### Example - set the chart series markers background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          background: "green"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border `Object`

The border of the markers.

#### Example - set the chart series markers border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series markers border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series markers border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.size `Number` *(default: 6)*

The marker size in pixels.

#### Example - set the chart markers size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          size: 30
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.type `String` *(default: "circle")*

The markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.

#### Example - set the chart series marker shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true,
          type: "triangle",
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series markers. By default chart series markers are not displayed.

#### Example - display the chart series markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        markers: {
          visible: true
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.maxSize `Number` *(default: 100)*

The maximum size of the chart bubble series marker.

#### Example - set the bubble chart series max marker size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        maxSize: 40,
        data: [
          [1, 2, 3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.minSize `Number` *(default: 5)*

The minimum size of the chart bubble series marker.

#### Example - set the bubble chart series min marker size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        minSize: 40,
        data: [
          [1, 2, 3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.missingValues `String` *(default: "gap")*

The behavior for handling missing values.

> The `missingValues` option is supported when [series.type](#configuration-series.type) is set to "area", "line" or "scatterLine".

The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

#### Example - set the missing values behavior
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        missingValues: "interpolate",
        data: [1, 3, null, 4, 5]
      }]
    });
    </script>

### series.name `String`

The name of the chart series which is visible in the legend.

#### Example - set the chart series name
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { name: "Series 1", data: [1, 2] },
        { name: "Series 2", data: [2, 3] }
      ]
    });
    </script>

### series.negativeColor `String`

The color to use for bar or column series with negative values. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart column series negative color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        missingValues: "interpolate",
        data: [-1, 1, 2, -2],
        negativeColor: "green"
      }]
    });
    </script>

### series.negativeValues `Object`

The options for displaying the chart negative bubble values.

#### Example - set the chart negative bubbles

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          color: "green",
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.negativeValues.color `String` *(default: "#ffffff")*

The color of the chart negative bubble values.

#### Example - set the chart negative bubbles color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          color: "green",
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.negativeValues.visible `Boolean` *(default: false)*

If set to `true` the chart will display the negative bubbles. By default the negative bubbles are not displayed.

#### Example - show the chart negative bubbles

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.opacity `Number` *(default: 1)*

The series opacity. By default the series are opaque.

#### Example - set the chart series opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        opacity: 0.5,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.openField `String`

The data field containing the open value.

> The `openField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          openField: "openPrice",
          data: [
            { open: 1, high: 2, low: 0.5, openPrice: 1.5},
            { open: 2, high: 3, low: 1, openPrice: 1.5}
          ]
        }
      ]
    });
    </script>

### series.overlay `Object`

The chart series overlay options.

#### Example - set the chart series overlay options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        overlay: {
          gradient: "none"
        },
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.overlay.gradient `String`

The chart series gradient.

The supported values are:

* "glass" (bar, column and candlestick series)
* "none"
* "roundedBevel" (donut and pie series)
* "sharpBevel" (donut and pie series)

#### Example - set the chart series gradient options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        overlay: {
          gradient: "none"
        },
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.padding `Number`

The padding around the chart (equal on all sides).

> The `padding` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the donut chart series padding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        padding: 60,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.size `Number`

The or radius of the chart donut series in pixels. If not set, the available space is split evenly between the series.

#### Example - set the donut chart series size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        size: 100,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.sizeField `String` *(default: "size")*

The data field containing the bubble size value.

#### Example - set the bubble chart series size field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        sizeField: "price",
        data: [
          { x: 1, y: 2, price: 3 }
        ]
      }]
    });
    </script>

### series.spacing `Number` *(default: 0.4)*

The space between the chart series as proportion of the series width.

> The `spacing` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick" or "ohlc".

#### Example - set the chart series spacing

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { spacing: 0.1, data: [ 1, 2 ,3 ] },
        { data: [ 1, 2 ,3 ] }
      ]
    });
    </script>

### series.stack `Boolean|String` *(default: false)*

A value indicating if the series should be stacked. String value indicates that the series should be stacked in a group with the specified name.

> The `stack` option is supported when [series.type](#configuration-series.type) is set to "bar" or "column".

#### Example - enable chart series stacking

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { stack: true, data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### series.startAngle `Number` *(default: 90)*

The start angle of the first donut or pie segment.

#### Example - set the donut chart series start angle
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        startAngle: 180,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.target `Object`

The configuration options of the target

> The `target` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - configure the bullet chart target

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            color: "green",
            border: {
              width: 3,
              color: "red"
            },
            line: {
              width: 10
            }
          },
          data: [
            { current: 1, target: 2 }
          ]
        }
      ]
    });
    </script>

### series.target.border `Object`

The border of the target.

#### Example - set the bullet chart target border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              color: "red"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the bullet chart target border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              color: "red"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.dashType `String` *(default: "solid")*

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the bullet chart target border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              dashType: "dashDot"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the bullet chart target border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.color `String`

The target color.

#### Example - set the bullet chart target color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            color: "green"
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.line `Object`

The target line options.

#### Example - set the bullet chart target line options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            line: {
              width: 10
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });

### series.target.line.width `Object`

The width of the line.

#### Example - set the bullet chart target line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            line: {
              width: 10
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });

### series.targetField `String` *(default: "target")*

The data item field containing the target value.

> The `currentField` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - set the bullet chart series current field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          targetField: "price",
          data: [
            { current: 1, price: 2 }
          ]
        }
      ]
    });
    </script>

### series.tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [series.tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            background: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            background: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2,
              color: "green"
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2,
              color: "green"
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            color: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            font: "20px sans-serif"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/framework/kendo#methods-format).

Format placeholders:

* Area, bar, column, line and pie
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter and scatterLine
    *   {0} - x value
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            format: "{0} x {1} ({2:C})"
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              bottom: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              left: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              right: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              top: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

*   category - the category name
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   series - the data series
*   value - the point value (either a number or an object)

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            template: "#: value.x # - #: value.y # (#: value.size #)"
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.type `String` *(default: "column")*

The type of the series.

The supported values are:

* area
* bar
* bubble
* bullet
* candlestick
* column
* donut
* line
* ohlc
* pie
* scatterLine
* verticalArea
* verticalBullet
* verticalLine

#### Example - set the chart series type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### series.visibleInLegend `Boolean` *(default: true)*

A value indicating whether to show the point category name (for bubble, donut and pie series)
or series name (for other available series types) in the legend.

#### Example - hide a chart series from the legend
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          name: "Series 1",
          visibleInLegend: false,
          data: [1, 2, 3]
        },
        { name: "Series 2", data: [1, 2, 3] }
      ]
    });
    </script>

### series.visibleInLegendField `String`

The data item field which indicates whether to show the point category name in the legend.

> The `visibleInLegendField` option is supported when [series.type](#configuration-series.type) is set to "buble", "donut" or "pie".

#### Example - set the chart series visible in legend field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { value: 1, category: "firstValue", visible: false },
          { value: 2, category: "secondValue", visible: true }
        ]
      },
      series: [
        {
          type: "pie",
          field: "value",
          visibleInLegendField: "visible"
        }
      ]
    });
    </script>

### series.width `Number`

The line width.

> The `width` option is supported when [series.type](#configuration-series.type) is set to "line" or "scatterLine".

#### Example - set the chart line width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "line",
          width: 6,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.xAxis `String` *(default: "primary")*

The name of the X axis to use.

> The `xAxis` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter" or "scatterLine".

### series.xField `String` *(default: "x")*

The data item field containing the X value.

> The `xField` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter" or "scatterLine".

#### Example - set the chart series x field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        xField: "price",
        data: [
          { price: 1, y: 2, size: 3 }
        ]
      }]
    });
    </script>

### series.yAxis `String` *(default: "primary")*

The name of the Y axis to use.

** Available for bubble, scatter and scatterLine series. **

### series.yField `String` *(default: "y")*

The data item field containing the Y value.

> The `yField` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter" or "scatterLine".

#### Example - set the chart series y field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        yField: "price",
        data: [
          { x: 1, yField: 2, size: 3 }
        ]
      }]
    });
    </script>

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

#### Example - set the chart series colors
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesColors: ["red", "green"],
      series: [
        { data: [1, 2] },
        { data: [1, 2] },
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults `Object`

The default options for all series.

### seriesDefaults.area `Object`

The area chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the area chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        area: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "area", data: [1, 2] },
        { data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.bar `Object`

The bar chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the bar chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        bar: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "bar", data: [1, 2] },
        { data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.border `Object`

The border of the series.

#### Example - set the chart series border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.dashType `String` *(default: "solid")*

The dash type of the chart series border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          dashType: "dashDot",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.bubble `Object`

The bubble chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the bubble chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        bubble: {
          color: "green",
          opacity: 0.5
        }
      },
      series: [
        { type: "bubble", data: [ [1, 2, 3] ] }
      ]
    });
    </script>

### seriesDefaults.candlestick `Object`

The candlestick chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the candlestick chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        candlestick: {
          color: "red",
          opacity: 0.3
        }
      },
      series: [
        { type: "candlestick", data: [ [1, 2, 0.5, 1.5] ] }
      ]
    });
    </script>

### seriesDefaults.column `Object`

The column chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the column chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        column: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "column", data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.donut `Object`

The donut chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the donut chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        donut: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "donut",  data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.gap `Number` *(default: 1.5)*

The distance between category clusters.

#### Example - set the gap between the chart categories
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        gap: 4
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [seriesDefaults.labels.visible](#configuration-seriesDefaults.labels.visible) option is set to `true`.

#### Example - configure the chart series label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          background: "green",
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border `Object`

The border of the labels.

#### Example - set the chart series label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            dashType: "dashDot"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series label border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - set the chart series label color as a RGB value
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - set the chart series label color by name
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "green"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          font: "20px sans-serif"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.format `String` *(default: "{0}")*

The format of the labels. Uses [kendo.format](/api/framework/kendo#methods-format).

#### Example - set the chart series label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          format: "{0:C}"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all margins.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available for donut and pie series.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example - set the chart series label template

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          template: "Value: #: value #%"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

#### Example - show the chart series labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.line `Object`

The line chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the line chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        line: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.ohlc `Object`

The ohlc chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the ohlc chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        ohlc: {
          color: "red",
          opacity: 0.3
        }
      },
      series: [
        { type: "ohlc", data: [ [1, 2, 0.5, 1.5] ] }
      ]
    });
    </script>

### seriesDefaults.overlay `Object`

The chart series overlay options.

#### Example - set the chart series overlay options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        overlay: {
          gradient: "none"
        }
      },
      series: [
        { data: [ 1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.overlay.gradient `String`

The chart series gradient.

The supported values are:

* "glass" (bar, column and candlestick series)
* "none"
* "roundedBevel" (donut and pie series)
* "sharpBevel" (donut and pie series)

#### Example - set the chart series gradient options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        overlay: {
          gradient: "none"
        }
      },
      series: [
        { data: [ 1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.pie `Object`

The pie chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the pie chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        pie: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "pie", data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.scatter `Object`

The scatter chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the scatter chart default options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        color: "green"
      },
      series: [ {
        type: "scatter",
        data: [
           [1, 2],
           [2, 3]
        ]
      }]
    });
    </script>

### seriesDefaults.scatterLine `Object`

The scatterLine chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the scatterLine chart default options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        color: "green"
      },
      series: [ {
        type: "scatterLine",
        data: [
           [1, 2],
           [2, 3]
        ]
      }]
    });
    </script>

### seriesDefaults.spacing `Number` *(default: 0.4)*

The space between the chart series as proportion of the series width.

> The `spacing` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick" or "ohlc".

#### Example - set the chart series spacing

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        spacing: 0.1
      },
      series: [
        { data: [ 1, 2 ,3 ] },
        { data: [ 1, 2 ,3 ] }
      ]
    });
    </script>

### seriesDefaults.stack `Boolean` *(default: false)*

A value indicating if the series should be stacked. String value indicates that the series should be stacked in a group with the specified name.

> The `stack` option is supported when [series.type](#configuration-series.type) is set to "bar" or "column".

#### Example - enable chart series stacking

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        stack: true
      },
      series: [
        { data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### seriesDefaults.tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [seriesDefaults.tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          font: "20px sans-serif"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/framework/kendo#methods-format).

Format placeholders:

* Area, bar, column, line and pie
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter and scatterLine
    *   {0} - x value
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          format: "{0} x {1} ({2:C})"
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

*   category - the category name
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   series - the data series
*   value - the point value (either a number or an object)

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          template: "#: value.x # - #: value.y # (#: value.size #)"
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### seriesDefaults.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        },
      ]
    });
    </script>

### seriesDefaults.verticalArea `Object`

The verticalArea chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the verticalArea chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        verticalArea: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "verticalArea", data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.verticalLine `Object`

The verticalLine chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the verticalLine chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        verticalLine: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "verticalLine", data: [1, 2] }
      ]
    });
    </script>

### theme `String`

The chart theme.

The supported values are:

* "black"
* "blueopal"
* "bootstrap"
* "default"
* "highcontrast"
* "metro"
* "metroblack"
* "moonlight"
* "silver"
* "uniform"

### title `Object|String`

The chart title configuration options or text.

#### Example - set the chart title as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: "Title",
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - configure the chart title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        align: "left
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

#### Example - configure the chart alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        align: "left
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - configure the chart alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        background: "green"
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.border `Object`

The border of the series.

#### Example - set the chart title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.dashType `String` *(default: "solid")*

The dash type of the chart title border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          dashType: "dashDot",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example - set the chart title border font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        font: "20px sans-serif"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

#### Example - set the chart title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        position: "bottom"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.text `String`

The text of the chart title. You can also set the text directly for a title with default options.

#### Example - set the chart title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        position: "bottom"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.visible `Boolean` *(default: false)*

If set to `true` the chart will display the title. By default the title is not displayed.

#### Example - hide the title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        color: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        font: "20px sans-serif"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/framework/kendo#methods-format).

Format placeholders:

* Area, bar, column, line and pie
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter and scatterLine
    *   {0} - x value
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        format: "{0} x {1} ({2:C})"
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.shared `Boolean` *(default: false)*

If set to `true` the chart will display a single tooltip for every category.

#### Example - display shared tooltip
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1,2,3]
      },{
        data: [1,2,3]
      },{
        data: [1,2,3]
      }],
      tooltip: {
        visible: true,
        shared: true
      }
    });
    </script>

### tooltip.sharedTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the shared tooltip.

The fields which can be used in the template are:

*   points - the category points
*   category - the category name

#### Example - set the shared tooltip template

    <div id="chart"></div>
    <script id="template" type="text/x-kendo-template">
      <div>#: category #</div>
      # for (var i = 0; i < points.length; i++) { #
        <div>#: points[i].series.name# : #: points[i].value #</div>
      # } #
    </script>
    <script>
    $("#chart").kendoChart({
      series: [
        { name: "Series 1", data: [1,2] },
        { name: "Series 2", data: [1,2] }
      ],
      categoryAxis: {
        categories: [2012, 2013]
      },
      tooltip: {
        visible: true,
        shared: true,
        sharedTemplate:kendo.template($("#template").html())
      }
    });
    </script>

### tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

*   category - the category name
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   series - the data series
*   value - the point value (either a number or an object)

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        template: "#: value.x # - #: value.y # (#: value.size #)"
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        },
      ]
    });
    </script>

### transitions `Boolean` *(default: true)*

If set to `true` the chart will play animations when displaying the series. By default animations are enabled.

#### Example - disable the chart animations

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      transitions: false,
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis `Array`

The value axis configuration options.

#### Example - configure the chart value axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
          min: 0,
          max: 10,
          majorUnit: 2
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### valueAxis.axisCrossingValue `Object|Date|Array`

Value at which the category axis crosses this axis. (Only for object)

Value indices at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

#### Example - set the value axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
          data: [4,7,10]
        }],
        categoryAxes: [{
          categories: ["A", "B", "C"]
        }, {
          categories: ["D", "E", "F"]
        }],
        valueAxis:  {
          axisCrossingValues: [0, 12]
        }
    });
    </script>

### valueAxis.color `String`

The color of the value axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        color: "green"
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### valueAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [valueAxis.crosshair.visible](#configuration-valueAxis.crosshair.visible) option is set to `true`.

#### Example - set the value axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        {
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### valueAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the value axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [valueAxis.crosshair.tooltip.visible](#configuration-valueAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the value axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        {
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the value axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the value axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the value axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the value axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

#### Example - set the value axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the value axis crosshair tooltip. By default the value axis crosshair tooltip is not visible.

#### Example - show the value axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the value axis crosshair. By default the value axis crosshair is not visible.

#### Example - show the value axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the value axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels `Object`

The axis labels configuration.

#### Example - configure the value axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          background: "green",
          color: "white"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border `Object`

The border of the labels.

#### Example - set the value axis label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the value axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
           font: "20px sans-serif",
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the value axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
           format: "{0:C}"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the value axis label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the value axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the value axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the value axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the value axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

#### Example - mirror the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          mirror: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all margins.

#### Example - set the value axis label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the value axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the value axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the value axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the value axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example - rotate the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          rotation: 90
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

#### Example - skip value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          skip: 1
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value

#### Example - set the value axis template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          template: "Year: #: value #"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          template: kendo.template("Year: #: value #")
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis labels. By default the category axis labels are visible.

#### Example - hide the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the value axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the value axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis lines. By default the value axis lines are visible.

#### Example - hide the value axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

#### Example - set the value axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the value axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          width: 3,
          color: "green"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis major grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis major grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

#### Example - hide the value axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.width `Number` *(default: 1)*

The width of the value axis major grid lines in pixels.

#### Example - set the value axis major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorUnit `Number`

The interval between major divisions.

#### Example - set the value axis major unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorUnit: 1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.max `Number` *(default: 1)*

The maximum value of the axis.

#### Example - set the value axis maximum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
         max: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.min `Number` *(default: 0)*

The minimum value of the axis.

#### Example - set the value axis minimum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
         min: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the value axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          width: 3,
          color: "green"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the value axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.width `Number` *(default: 1)*

The width of the value axis minor grid lines in pixels.

#### Example - set the value axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks `Object`

The configuration of the value axis minor ticks.

#### Example - configure the value axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the value axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          size: 6
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis minor ticks. By default the value axis minor ticks are visible.

#### Example - hide the value axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the value axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [valueAxis.majorUnit](#configuration-valueAxis.majorUnit).

#### Example - set the value axis minor unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorUnit: 2
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.name `Object` *(default: "primary")*

The unique axis name. Used to associate a series with a value axis using the [series.axis](#configuration-series.axis) option.

#### Example - set the value axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ]
    });
    </script>

### valueAxis.narrowRange `Boolean` *(default: false)*

If set to `true` the chart will prevent the automatic axis range from snapping to 0.

#### Example - prevent automatic axis range snapping

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        narrowRange: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.pane `String`

The name of the pane that the value axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the value axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ]
    });
    </script>

### valueAxis.plotBands `Array`

The plot bands of the value axis.

#### Example - set the value plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the value plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the value plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the value plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the value plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

#### Example - reverse the value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        categories: ["2012", "2013"],
        reverse: true
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title `Object`

The title configuration of the value axis.

> The [valueAxis.title.text](#configuration-valueAxis.title.text) option must be set in order to display the title.


#### Example - set the value axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border `Object`

The border of the title.

#### Example - set the value axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the value axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the value axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the value axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the value axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the value axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the value axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the value axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the value axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the value axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the value axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the value axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the value axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the value axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.text `String`

The text of the title.

#### Example - set the value axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis title. By default the value axis title is visible.

#### Example - hide the value axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis. By default the value axis is visible.

#### Example - hide the value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis `Array`

The X-axis configuration options of the scatter chart X-axis. Supports all [valueAxis](#configuration-valueAxis) options.

#### Example - set the scatter chart x axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        color: "red",
        min: -5,
        max: 5,
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### xAxis.axisCrossingValue `Object|Date|Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indices at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

> Set a value greater than or equal to the axis maximum value to denote the far end of the axis.

#### Example - set the scatter chart x axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        axisCrossingValue: [1, 2]
      }
    });
    </script>

### xAxis.baseUnit `String`

The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:

* days
* hours
* minutes
* months
* weeks
* years

#### Example - set the scatter chart x axis base unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "hours"
      }
    });
    </script>

### xAxis.color `String`

The color of the axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        color: "red"
      }
    });
    </script>

### xAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [xAxis.crosshair.visible](#configuration-xAxis.crosshair.visible) option is set to `true`.

#### Example - set the scatter chart x axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the scatter chart x axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [xAxis.crosshair.tooltip.visible](#configuration-xAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the scatter chart x axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the scatter chart x axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the scatter chart x axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the scatter chart x axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the scatter chart x axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

#### Example - set the scatter chart x axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart x axis crosshair tooltip. By default the scatter chart x axis crosshair tooltip is not visible.

#### Example - show the scatter chart x axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart x axis crosshair. By default the scatter chart x axis crosshair is not visible.

#### Example - show the scatter chart x axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the scatter chart x axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.labels `Object`

The axis labels configuration.

#### Example - set the scatter chart x axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### xAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "red"
        }
      }
    });
    </script>

### xAxis.labels.border `Object`

The border of the labels.

#### Example - set the scatter chart x axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            color: "green",
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            color: "green"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1
          }
        }
      }
    });
    </script>

### xAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "red"
        }
      }
    });
    </script>

### xAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/getting-started/framework/globalization/overview) for more information.

### xAxis.labels.dateFormats `Object`

The format used to display the labels when the x values are dates. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [xAxis.baseUnit](#configuration-xAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example - set the scatter chart x axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "days".

#### Example - set the days format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "hours".

#### Example - set the hours format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "months".

#### Example - set the months format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      }
    });
    </script>

### xAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the scatter chart x axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          font: "20px sans-serif"
        }
      }
    });
    </script>

### xAxis.labels.format `String`

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the scatter chart x axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          format: "{0:C"}
        }
      }
    });
    </script>

### xAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the scatter chart x axis label margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: 10
        }
      }
    });
    </script>

### xAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the scatter chart x axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the scatter chart x axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            left: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the scatter chart x axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            right: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the scatter chart x axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            top: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          mirror: true
        }
      }
    });
    </script>

### xAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the scatter chart x axis label padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: 10
        }
      }
    });
    </script>

### xAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the scatter chart x axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the scatter chart x axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            left: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the scatter chart x axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            right: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the scatter chart x axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            top: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example - set the scatter chart x axis label rotation

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          rotation: 90
        }
      }
    });
    </script>

### xAxis.labels.skip `Number` *(default: 1)*

The number of labels to skip.

#### Example - skip  scatter chart x axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          skip: 2
        }
      }
    });
    </script>

### xAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd x axis label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          step: 2
        }
      }
    });
    </script>

### xAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the scatter chart x axis label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          template: "X: #: value #"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          template: kendo.template("X: #: value #")
        }
      }
    });
    </script>

### xAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis labels. By default the x axis labels are visible.

#### Example - hide the scatter chart x axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          visible: false
        }
      }
    });
    </script>

### xAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the scatter chart x axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### xAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### xAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis lines. By default the x axis lines are visible.

#### Example - hide the scatter chart x axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### xAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the scatter chart x axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### xAxis.majorGridLines.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x major grid lines color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x major grid lines dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### xAxis.majorGridLines.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x major grid liness. By default the x major grid liness are visible.

#### Example - hide the scatter chart x major grid liness

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### xAxis.majorGridLines.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorTicks `Object`

The configuration of the scatter chart x axis major ticks.

#### Example - configure the scatter chart x axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }
    });
    </script>

### xAxis.majorTicks.color `String` *(default: "black")*

The color of the scatter chart x axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the scatter chart x axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          size: 6
        }
      }
    });
    </script>

### xAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart x axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the scatter chart x axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          visible: false
        }
      }
    });
    </script>

### xAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the scatter chart x axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorUnit `Number`

The interval between major divisions.

#### Example - set the scatter chart x axis major unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorUnit: 1
      }
    });
    </script>

### xAxis.max `Object`

The maximum value of the axis.

#### Example - set the scatter chart x axis maximum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        max: 5
      }
    });
    </script>

### xAxis.min `Object`

The minimum value of the axis.

#### Example - set the scatter chart x axis minimum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        min: 1
      }
    });
    </script>

### xAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [xAxis.majorUnit](#configuration-xAxis.majorUnit).

### xAxis.name `Object` *(default: "primary")*

The unique axis name. Used to associate a series with a x axis using the [series.xAxis](#configuration-series.xAxis) option.

#### Example - set the scatter chart x axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1000, 2000]], xAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second" }
      ],
      xAxis: [
        { name: "first"},
        { name: "second"}
      ]
    });
    </script>

### xAxis.narrowRange `Boolean` *(default: false)*

If set to `true` the chart will prevent the automatic axis range from snapping to 0.

#### Example - prevent scatter chart x axis automatic range snapping
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        narrowRange: false
      }
    });
    </script>

### xAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the scatter chart x axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]], xAxis: "first", yAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second", yAxis: "second" }
      ],
      panes: [
        { name: "topPane" },
        { name: "bottomPane" },
      ],
      xAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ]
    });
    </script>

### xAxis.plotBands `Array`

The plot bands of the x axis.

#### Example - set the scatter chart x axis plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the scatter chart x axis plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the scatter chart x axis plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the scatter chart x axis plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      }
    });
    </script>

### xAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the scatter chart x axis plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default values increase from left to right and from bottom to top.

#### Example - reverse the scatter chart x axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        reverse: true
      }
    });
    </script>

### xAxis.title `Object`

The title configuration of the scatter chart x axis.

> The [xAxis.title.text](#configuration-xAxis.title.text) option must be set in order to display the title.

#### Example - set the scatter chart x axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border `Object`

The border of the title.

#### Example - set the scatter chart x axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the scatter chart x axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the scatter chart x axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the scatter chart x axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the scatter chart x axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the scatter chart x axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the scatter chart x axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the scatter chart x axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the scatter chart x axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the scatter chart x axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the scatter chart x axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the scatter chart x axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the scatter chart x axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the scatter chart x axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.text `String`

The text of the title.

#### Example - set the scatter chart x axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart x axis title. By default the scatter chart x axis title is visible.

#### Example - hide the scatter chart x axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.type `String` *(default: "numeric")*

The axis type.

The supported values are:

* "number" - discrete category axis.
* "date" - specialized axis for displaying chronological data.

> The chart will automatically switch to a date axis if the series X value
is of type `Date`. Set the `xAsix.type` when such behavior is undesired.

#### Example - set the scatter chart x axis type
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date"
      }
    });
    </script>

### xAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis. By default the x axis is visible.

#### Example - hide the scatter chart x axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        visible: false
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis `Array`

The y axis configuration options of the scatter chart. Supports all [valueAxis](#configuration-valueAxis) options.

#### Example - set the scatter chart y axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        color: "red",
        min: -5,
        max: 5,
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### yAxis.axisCrossingValue `Object|Date|Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indices at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

> Set a value greater than or equal to the axis maximum value to denote the far end of the axis.

#### Example - set the scatter chart y axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        axisCrossingValue: [1, 2]
      }
    });
    </script>

### yAxis.baseUnit `String`

The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:

* days
* hours
* minutes
* months
* weeks
* years

#### Example - set the scatter chart y axis base unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "hours"
      }
    });
    </script>

### yAxis.color `String`

The color of the axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        color: "red"
      }
    });
    </script>

### yAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [yAxis.crosshair.visible](#configuration-yAxis.crosshair.visible) option is set to `true`.

#### Example - set the scatter chart y axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the scatter chart y axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [yAxis.crosshair.tooltip.visible](#configuration-yAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the scatter chart y axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the scatter chart y axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the scatter chart y axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the scatter chart y axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the scatter chart y axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

#### Example - set the scatter chart y axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart y axis crosshair tooltip. By default the scatter chart y axis crosshair tooltip is not visible.

#### Example - show the scatter chart y axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart y axis crosshair. By default the scatter chart y axis crosshair is not visible.

#### Example - show the scatter chart y axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the scatter chart y axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.labels `Object`

The axis labels configuration.

#### Example - set the scatter chart y axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### yAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "red"
        }
      }
    });
    </script>

### yAxis.labels.border `Object`

The border of the labels.

#### Example - set the scatter chart y axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            color: "green",
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            color: "green"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1
          }
        }
      }
    });
    </script>

### yAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "red"
        }
      }
    });
    </script>

### yAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/getting-started/framework/globalization/overview) for more information.

### yAxis.labels.dateFormats `Object`

The format used to display the labels when the x values are dates. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [yAxis.baseUnit](#configuration-yAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example - set the scatter chart y axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "days".

#### Example - set the days format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "hours".

#### Example - set the hours format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "months".

#### Example - set the months format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      }
    });
    </script>

### yAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the scatter chart y axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          font: "20px sans-serif"
        }
      }
    });
    </script>

### yAxis.labels.format `String`

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the scatter chart y axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          format: "{0:C"}
        }
      }
    });
    </script>

### yAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the scatter chart y axis label margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: 10
        }
      }
    });
    </script>

### yAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the scatter chart y axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the scatter chart y axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            left: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the scatter chart y axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            right: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the scatter chart y axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            top: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          mirror: true
        }
      }
    });
    </script>

### yAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the scatter chart y axis label padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: 10
        }
      }
    });
    </script>

### yAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the scatter chart y axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the scatter chart y axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            left: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the scatter chart y axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            right: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the scatter chart y axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            top: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example - set the scatter chart y axis label rotation

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          rotation: 90
        }
      }
    });
    </script>

### yAxis.labels.skip `Number` *(default: 1)*

The number of labels to skip.

#### Example - skip  scatter chart y axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          skip: 2
        }
      }
    });
    </script>

### yAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd y axis label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          step: 2
        }
      }
    });
    </script>

### yAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the scatter chart y axis label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          template: "X: #: value #"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          template: kendo.template("X: #: value #")
        }
      }
    });
    </script>

### yAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis labels. By default the y axis labels are visible.

#### Example - hide the scatter chart y axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          visible: false
        }
      }
    });
    </script>

### yAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the scatter chart y axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### yAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart y axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### yAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis lines. By default the y axis lines are visible.

#### Example - hide the scatter chart y axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### yAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart y axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the scatter chart y axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### yAxis.majorGridLines.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x major grid lines color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x major grid lines dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### yAxis.majorGridLines.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x major grid liness. By default the x major grid liness are visible.

#### Example - hide the scatter chart x major grid liness

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### yAxis.majorGridLines.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorTicks `Object`

The configuration of the scatter chart y axis major ticks.

#### Example - configure the scatter chart y axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }
    });
    </script>

### yAxis.majorTicks.color `String` *(default: "black")*

The color of the scatter chart y axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the scatter chart y axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          size: 6
        }
      }
    });
    </script>

### yAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart y axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the scatter chart y axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          visible: false
        }
      }
    });
    </script>

### yAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the scatter chart y axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorUnit `Number`

The interval between major divisions.

#### Example - set the scatter chart y axis major unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorUnit: 1
      }
    });
    </script>

### yAxis.max `Object`

The maximum value of the axis.

#### Example - set the scatter chart y axis maximum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        max: 5
      }
    });
    </script>

### yAxis.min `Object`

The minimum value of the axis.

#### Example - set the scatter chart y axis minimum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        min: 1
      }
    });
    </script>

### yAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [yAxis.majorUnit](#configuration-yAxis.majorUnit).

### yAxis.name `Object` *(default: "primary")*

The unique axis name. Used to associate a series with a y axis using the [series.yAxis](#configuration-series.yAxis) option.

#### Example - set the scatter chart y axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1000, 2000]], yAxis: "first" },
        { type: "scatter", data: [[5, 6]], yAxis: "second" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second"}
      ]
    });
    </script>

### yAxis.narrowRange `Boolean` *(default: false)*

If set to `true` the chart will prevent the automatic axis range from snapping to 0.

#### Example - prevent scatter chart y axis automatic range snapping
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        narrowRange: false
      }
    });
    </script>

### yAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the scatter chart y axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]], xAxis: "first", yAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second", yAxis: "second" }
      ],
      panes: [
        { name: "topPane" },
        { name: "bottomPane" },
      ],
      xAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ]
    });
    </script>

### yAxis.plotBands `Array`

The plot bands of the y axis.

#### Example - set the scatter chart y axis plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the scatter chart y axis plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the scatter chart y axis plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the scatter chart y axis plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      }
    });
    </script>

### yAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the scatter chart y axis plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default values increase from left to right and from bottom to top.

#### Example - reverse the scatter chart y axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        reverse: true
      }
    });
    </script>

### yAxis.title `Object`

The title configuration of the scatter chart y axis.

> The [yAxis.title.text](#configuration-yAxis.title.text) option must be set in order to display the title.

#### Example - set the scatter chart y axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border `Object`

The border of the title.

#### Example - set the scatter chart y axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the scatter chart y axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the scatter chart y axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the scatter chart y axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the scatter chart y axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the scatter chart y axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the scatter chart y axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the scatter chart y axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the scatter chart y axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the scatter chart y axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the scatter chart y axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the scatter chart y axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the scatter chart y axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the scatter chart y axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.text `String`

The text of the title.

#### Example - set the scatter chart y axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart y axis title. By default the scatter chart y axis title is visible.

#### Example - hide the scatter chart y axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.type `String` *(default: "numeric")*

The axis type.

The supported values are:

* "number" - discrete category axis.
* "date" - specialized axis for displaying chronological data.

> The chart will automatically switch to a date axis if the series X value
is of type `Date`. Set the `xAsix.type` when such behavior is undesired.

#### Example - set the scatter chart y axis type
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date"
      }
    });
    </script>

### yAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis. By default the y axis is visible.

#### Example - hide the scatter chart y axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        visible: false
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/framework/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.dataSource.add({ value: 2 });
    </script>

#### Example - update a data item in the data source
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(0);
    data.set("name", "John Doe");
    </script>

#### Example - remove a data item from the data source
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 },
        { value: 2 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var data = chart.dataSource.at(0);
    chart.dataSource.remove(data);
    </script>

### options `Object`

The [configuration](#configuration) options with which the chart is initialized.

> Call the [refresh](#methods-refresh) method after modifying the `options` field.

#### Example - change the chart options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.options.series[0].type = "bar";
    chart.refresh();
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.destroy();
    </script>

### redraw

Repaints the chart using the currently loaded data.

#### Example - redraw the chart
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    $("#chart").css( { width: 300 });
    chart.redraw();
    </script>

### refresh

Reloads the data and renders the chart.

#### Example - refresh the chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.options.series[0].type = "bar";
    chart.refresh();
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 },
        { value: 2 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var dataSource = new kendo.data.DataSource( {
      data: [
        { value: 3 },
        { value: 4 }
      ]
    });
    chart.setDataSource(dataSource);
    </script>

### svg

Returns the [SVG](http://www.w3.org/Graphics/SVG/) representation of the chart. The returned string is a self-contained SVG document that can be used as is or converted to other formats using tools like [Inkscape](http://inkscape.org/) and
[ImageMagick](http://www.imagemagick.org/). Both programs provide command-line interface suitable for server-side processing.

#### Returns

`String` the SVG representation of the chart.

#### Example - get the SVG representation of the chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var svg = chart.svg();
    console.log(svg); // displays the SVG string
    </script>

## Events

### axisLabelClick

Fired when the user clicks an axis label.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.dataItem `Object`

The original data item used to generate the label. Available only for data bound category axis.

##### e.element `Object`

The DOM element of the label.

##### e.index `Object`

The label sequential index or category index.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.text `String`

The label text.

##### e.value `Object`

The label value or category name.

#### Example - subscribe to the "axisLabelClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [2012, 2013]
      },
      series: [
        { data: [1, 2] }
      ],
      axisLabelClick: function(e) {
        console.log(e.axis.type, e.value);
      }
    });
    </script>

#### Example - subscribe to the "axisLabelClick" event after initialization
    <div id="chart"></div>
    <script>
    function chart_axisLabelClick(e) {
      console.log(e.axis.type, e.value);
    }
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [2012, 2013]
      },
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("axisLabelClick", chart_axisLabelClick);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ],
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dataBound(e) {
      console.log("dataBound");
    }
    $("#chart").kendoChart({
      autoBind: false,
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dataBound", chart_dataBound);
    chart.dataSource.fetch();
    </script>

### drag

Fired as long as the user is dragging the chart using the mouse or swipe gestures.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "drag" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      drag: function(e) {
        console.log("drag");
      }
    });
    </script>

#### Example - subscribe to the "drag" event after initialization
    <div id="chart"></div>
    <script>
    function chart_drag(e) {
      console.log("drag");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("drag", chart_drag);
    </script>

### dragEnd

Fired when the user stops dragging the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the dragEnd action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dragEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      dragEnd: function(e) {
        console.log("dragEnd");
      }
    });
    </script>

#### Example - subscribe to the "dragEnd" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dragEnd(e) {
      console.log("dragEnd");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dragEnd", chart_dragEnd);
    </script>

### dragStart

Fired when the user starts dragging the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.preventDefault `Function`

If invoked the drag operation will abort.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dragStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      dragStart: function(e) {
        console.log("dragStart");
      }
    });
    </script>

#### Example - subscribe to the "dragStart" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dragStart(e) {
      console.log("dragStart");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dragStart", chart_dragStart);
    </script>

### plotAreaClick

Fired when the user clicks the plot area.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value. Available only for categorical charts (bar, line, area and similar).

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The X axis value or array of values for multi-axis charts.

#### Example - subscribe to the "plotAreaClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      plotAreaClick: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "plotAreaClick" event after initialization
    <div id="chart"></div>
    <script>
    function chart_plotAreaClick(e) {
      console.log(e.value);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("plotAreaClick", chart_plotAreaClick);
    </script>

### select

Fired when the user modifies the selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "select" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      },
      select: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="chart"></div>
    <script>
    function chart_select(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("select", chart_select);
    </script>

### selectEnd

Fired when the user completes modifying the selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "selectEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        selectEnd: {
          from: 1,
          to: 5
        }
      },
      selectEnd: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>

#### Example - subscribe to the "selectEnd" event after initialization

    <div id="chart"></div>
    <script>
    function chart_selectEnd(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        selectEnd: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("selectEnd", chart_selectEnd);
    </script>

### selectStart

Fired when the user starts modifying the axis selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "selectStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      },
      selectStart: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>
#### Example - subscribe to the "selectStart" event after initialization

    <div id="chart"></div>
    <script>
    function chart_selectStart(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("selectStart", chart_selectStart);
    </script>

### seriesClick

Fired when the user clicks the chart series.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category

##### e.element `Object`

The DOM element of the data point.

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

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

#### Example - subscribe to the "seriesClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      seriesClick: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "seriesClick" event after initialization
    <div id="chart"></div>
    functino chart_seriesClick(e) {
      console.log(e.value);
    }
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("seriesClick", chart_seriesClick);
    </script>

### seriesHover

Fired when the user hovers the chart series.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category

##### e.element `Object`

The DOM element of the data point.

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

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

#### Example - subscribe to the "seriesHover" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      seriesHover: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "seriesHover" event after initialization
    <div id="chart"></div>
    functino chart_seriesHover(e) {
      console.log(e.value);
    }
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("seriesHover", chart_seriesHover);
    </script>

### zoom

Fired as long as the user is zooming the chart using the mousewheel.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.delta `Number`

A number that indicates the zoom amount and direction. A negative value indicates "zoom in", while a positive "zoom out".
##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoom" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoom: function(e) {
        console.log("zoom");
      }
    });
    </script>

#### Example - subscribe to the "zoom" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoom(e) {
      console.log("zoom");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoom", chart_zoom);
    </script>

### zoomEnd

Fired when the user stops zooming the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoomEnd action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoomEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoomEnd: function(e) {
        console.log("zoomEnd");
      }
    });
    </script>

#### Example - subscribe to the "zoomEnd" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoomEnd(e) {
      console.log("zoomEnd");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoomEnd", chart_zoomEnd);
    </script>

### zoomStart

Fired when the user uses the mousewheel to zoom the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.preventDefault `Function`

If invoked the zoom operation will abort.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoomStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoomStart: function(e) {
        console.log("zoomStart");
      }
    });
    </script>

#### Example - subscribe to the "zoomStart" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoomStart(e) {
      console.log("zoomStart");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoomStart", chart_zoomStart);
    </script>

