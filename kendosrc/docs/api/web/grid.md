---
title: kendo.ui.Grid
meta_title: Configuration, methods and events of Kendo UI Grid
meta_description: Code examples for Grid UI widget configuration, learn how to use methods and which events to set once the grid UI widget detail is initialized and expanded.
slug: api-web-grid
relatedDocs: gs-web-grid-overview
tags: api,web
publish: true
---

# kendo.ui.Grid

Represents the Kendo UI Grid widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### altRowTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the alternating table rows. Be default the grid renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.

#### Example - specify alternating row template as a function

    <div id="grid"></div>
    <script id="alt-template" type="text/x-kendo-template">
        <tr data-uid="#= uid #">
            <td colspan="2">
                <strong>#: name #</strong>
                <strong>#: age #</strong>
            </td>
        </tr>
    </script>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      altRowTemplate: kendo.template($("#alt-template").html())
    });
    </script>

#### Example - specify alternating row template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      altRowTemplate: '<tr data-uid="#= uid #"><td colspan="2"><strong>#: name #</strong><strong>#: age #</strong></td></tr>'
    });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/framework/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#grid").kendoGrid({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### columns `Array`

The configuration of the grid columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](#configuration-columns.field) to which the column is bound. The grid will create a column for every item of the array.

> If this setting is **not** specified the grid will create a column for every field of the data item.

#### Example - specify grid columns as array of strings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: ["name", "age"], // two columns bound to the "name" and "age" fields
      dataSource: [ { name: "Jane", age: 31 }, { name: "John", age: 33 }]
    });
    </script>

#### Example - specify grid columns as array of objects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",// create a column bound to the "name" field
        title: "Name" // set its title to "Name"
      }, {
        field: "age",// create a column bound to the "age" field
        title: "Age" // set its title to "Age"
      }],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.aggregates `Array`

The aggregate(s) which are calculated when the grid is grouped by the columns [field](#configuration-columns.field).
The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - set column aggregates
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "firstName", groupable: false },
        { field: "lastName" }, /* group by this column to see the footer template */
        { field: "age",
          groupable: false,
          aggregates: [ "count", "min", "max" ],
          groupFooterTemplate: "age total: #: count #, min: #: min #, max: #: max #"
        }
      ],
      groupable: true,
      dataSource: {
        data: [
          { firstName: "Jane", lastName: "Doe", age: 30 },
          { firstName: "John", lastName: "Doe", age: 33 }
        ]
      }
    });
    </script>

> Check [Aggregates](http://demos.kendoui.com/web/grid/aggregates.html) for a live demo.

### columns.attributes `Object`

HTML attributes of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - specify column HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        title: "Name",
        attributes: {
          "class": "table-cell",
          style: "text-align: right; font-size: 14px"
        }
      } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    </script>

The table cells would look like this: `<td class="table-cell" style="text-align: right; font-size: 14px">...</td>`.

### columns.command `String|Array`

The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit" or "destroy").

The "edit" built-in command switches the current table row in edit mode.

The "destroy" built-in command removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [click](#configuration-columns.command.click) option.

> The built-in "edit" and "destroy" commands work *only* if editing is enabled via the [editable](#configuration-editable) option. The "edit" command supports "inline" and "popup" editing modes.

#### Example - set command as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: "destroy" } // displays the built-in "destroy" command
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

#### Example - set command as array of strings
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: ["edit", "destroy"] } // displays the built-in "edit" and "destroy" commands
      ],
      editable: "inline",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

#### Example - set command as array of objects
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [
            {
             name: "details",
             click: function(e) {
                // command button click handler
             }
            },
            { name: "destroy" } // built-in "destroy" command
          ]
        }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.name `String`

The name of the command. The built-in commands are "edit" and "destroy". Can be set to a custom value.

#### Example - set the command name
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit" }] }
      ],
      editable: "popup",
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.text `String`

The text displayed by the command button. If not set the [name](#configuration-columns.command.name) option is used as the button text.

#### Example - customize the text of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.command.className `String`

The CSS class applied to the command button.

#### Example - set the CSS class of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ className: "btn-destroy", name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>
    <style>
    .btn-destroy {
        color: red;
    }
    </style>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](http://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the grid instance.

#### Example - handle the click event of the custom command button
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [ {
            name: "details",
            click: function(e) {
              // e.target is the DOM element representing the button
              var tr = $(e.target).closest("tr"); // get the current table row (tr)
              // get the data bound to the current table row
              var data = this.dataItem(tr);
              console.log("Details for: " + data.name);
            }
          } ]
       }
      ],
      dataSource: [ { name: "Jane Doe" } ]
    });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element whose `name` HTML attribute is set as the column [field](#configuration-columns.field).

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column specified via the [format](#configuration-columns.format) option.

##### options.model `kendo.data.Model`

The model instance to which the current table row is bound.

##### options.values `Array`

Array of values specified via the [values](#configuration-columns.values) option.

#### Example - create a custom column editor using the Kendo UI AutoComplete

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        editor: function(container, options) {
         // create an input element
         var input = $("<input/>");
         // set its name to the field to which the column is bound ('name' in this case)
         input.attr("name", options.field);
         // append it to the container
         input.appendTo(container);
         // initialize a Kendo UI AutoComplete
         input.kendoAutoComplete({
           dataTextField: "name",
           dataSource: [
             { name: "Jane Doe" },
             { name: "John Doe" }
           ]
         });
        }
      } ],
      editable: true,
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

> Check [Editing custom editor](http://demos.kendoui.com/web/grid/editing-custom.html) for a live demo.

### columns.encoded `Boolean` *(default: true)*

If set to `true` the column value will be HTML-encoded before it is displayed. If set to `false` the column value will be displayed as is. By default the column value is HTML-encoded.

#### Example - prevent HTML encoding

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", encoded: false }
      ],
      dataSource: [ { name: "<strong>Jane Doe</strong>" } ]
    });
    </script>


### columns.field `String`

The field to which the column is bound. The value of this field is displayed by the column during data binding.

#### Example - specify the column field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        // create a column bound to the "name" field
        { field: "name" },
        // create a column bound to the "age" field
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` a filter menu will be displayed for this column when filtering is enabled. If set to `false` the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the [filterable](#configuration-filterable) option.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - disable filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", filterable: false },
        { field: "age" }
      ],
      filterable: true,
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.ui `String|Function`

The role data attribute of the widget used in the filter menu or a JavaScript function which initializes that widget.

#### Example - specify the filter UI as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        filterable: {
          ui: "datetimepicker" // use Kendo UI DateTimePicker
        }
      } ],
      filterable: true,
      dataSource: [ { date: new Date() }, { date: new Date() } ]
    });
    </script>

#### Example - initialize the filter UI

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        filterable: {
          ui: function(element) {
            element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
          }
        }
      } ],
        filterable: true,
        dataSource: [ { date: new Date() }, { date: new Date() } ]
    });
    </script>

> Check [Filter menu customization](http://demos.kendoui.com/web/grid/filter-menu-customization.html) for a live demo.

### columns.footerTemplate `String|Function`
The [template](/api/framework/kendo#methods-template) which renders the footer table cell for the column.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)

#### Example - specify column footer template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          footerTemplate: "Min: #: min # Max: #: max #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
        ]
      }
    });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a [standard number format](/api/framework/kendo#standard-number-formats),
[custom number format](/api/framework/kendo#custom-number-formats), [standard date format](/api/framework/kendo#standard-date-formats) or a [custom date format](/api/framework/kendo#custom-date-formats).

> The [kendo.format](/api/framework/kendo#methods-format) function is used to format the value.

#### Example - specify the column format string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0: yyyy-MM-dd HH:mm:ss}"
      }, {
        field: "number",
        format: "{0:c}"
      } ],
      filterable: true,
      dataSource: [ { date: new Date(), number: 3.1415 } ]
    });
    </script>

### columns.groupHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the group header when the grid is grouped by the column [field](#configuration-columns.field). By default the name of the field
and the current group value is displayed.

The fields which can be used in the template are:

* value - the current group value
* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)

#### Example - set the group header template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderTemplate: "Age: #= value # total: #= count #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });

### columns.groupFooterTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the group footer when the grid is grouped by the column field. By default the group footer is not displayed.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)

#### Example - set the group header template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: "Total: #= count #"
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });

### columns.headerAttributes `Object`

HTML attributes of the column header. The grid renders a table header cell (`<th>`) for every column. The `headerAttributes` option can be used to set the HTML attributes of that `th`.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.

#### Example - set the column header HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",
        headerAttributes: {
          "class": "table-header-cell",
          style: "text-align: right; font-size: 14px"
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

The table header cell will look like this: `<th class="table-header-cell" style="text-align: right; font-size: 14px">name</th>`.

### columns.headerTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the column header content. By default the value of the [title](#configuration-columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in a `<a>` element. As a result the template **must** contain only inline elements.

#### Example - column header template as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">Check All</label>'
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true` the column will not be displayed in the grid. By default all columns are displayed.

#### Example - hide columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { hidden: true, field: "id" },
        { field: "name" }
      ],
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sortable `Boolean` *(default: true)*

If set to `true` the user can click the column header and sort the grid by the column [field](#configuration-columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](#configuration-sortable) option.

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { sortable: false, field: "id" },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the column content. The grid renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the grid columns. By default the HTML-encoded value of the [field](#configuration-columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

#### Example - set the template as a string (wrap the column value in HTML)

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: "<strong>#: name # </strong>"
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - set the template as a function returned by kendo.template

    <div id="grid"></div>
    <script id="name-template" type="text/x-kendo-template">
      <strong>#: name #</strong>
    </script>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: kendo.template($("#name-template").html())
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - set the template as a function which returns a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: function(dataItem) {
          return "<strong>" + kendo.htmlEncode(dataItem.name) + "</strong>";
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set the [field](#configuration-columns.field) is used.

#### Example - set the title of the column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ { field: "name", title: "Name" } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.

> If the total sum of the column widths exceeds the width of the grid a horizontal scrollbar will appear (if scrolling is enabled). If that sum is less than the width of the grid
one of the columns would stretch out to occupy the remaining space. Thus it is a good idea to have a column without specified width. On the other hand, explicit widths for all columns
should be set only if their sum exceeds the Grid width and the goal is to have horizontal scrolling. Otherwise if the sum of all column widths is small, the widths will be ignored and
unexpected side effects may occur, e.g. jumpy column resizing.

#### Example - set the column width as a string
     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       columns: [
         { field: "name", width: "200px" },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

#### Example - set the column width as a number
     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       columns: [
         { field: "name", width: 200 },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

### columns.values `Array`

An array of values that will be displayed instead of the bound value. Each item in the array must have a `text` and `value` fields.

> Use the `values` option to display user-friendly text instead of database values.

#### Example - specify column values

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
          { text: "Beverages", value: 1 },
          { text: "Food", value: 2 }
        ] }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ]
    });
    </script>

This example displays "Beverages" and "Food" in the "category" column instead of "1" and "2".

> Check [ForeignKey column](http://demos.kendoui.com/web/grid/foreignkeycolumn.html) for a live demo.

### columns.menu `Boolean`

If set to `true` the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their [field](#configuration-columns.field) set).

#### Example - hide a column from the column menu
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", menu: false },
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true` the grid will display the column menu when the user clicks the chevron icon in the column headers. The column menu allows the user to show and hide columns, filter and sort (if filtering and sorting are enabled).
By default the column menu is not enabled.

Can be set to a JavaScript object which represents the column menu configuration.

#### Example - enable the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Column menu](http://demos.kendoui.com/web/grid/column-menu.html) for a live demo.

### columnMenu.columns `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to select (show and hide) grid columns. By default the column menu allows column selection.

#### Example - disable column selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        columns: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to filter the grid. By default the column menu allows the user to filter if filtering is enabled via the [filterable](#configuration-filterable).

#### Example - disable column menu filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        filterable: false
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to sort the grid by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](#configuration-sortable) option.

> If this option is set to `false` the user could still sort by clicking the column header cell.

#### Example - disable column menu sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        sortable: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages `Object`

The text messages displayed in the column menu. Use it to customize or localize the column menu messages.

#### Example - customize column menu messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          columns: "Choose columns",
          filter: "Apply filter",
          sortAscending: "Sort (asc)",
          sortDescending: "Sort (desc)"
        }
      },
      sortable: true,
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message displayed for the column selection menu item.

#### Example - set the column selection message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          columns: "Choose columns"
        }
      },
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message displayed for the filter menu item.

#### Example - set the filter message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          filter: "Apply filter",
        }
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.

#### Example - set the sort ascending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortAscending: "Sort (asc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.

#### Example - set the sort descending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortDescending: "Sort (desc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/framework/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/framework/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/framework/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/products",
          dataType: "jsonp"
        }
      },
      pageSize: 10
    });
    $("#grid").kendoGrid({
      dataSource: dataSource,
      pageable: true
    });
    </script>

> Check [Binding to local data](http://demos.kendoui.com/web/grid/local-data.html) and [Binding to remote data](http://demos.kendoui.com/web/grid/remote-data.html) for live demos.

### detailTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the detail rows.


#### Example - specify detail template as a function
    <script id="detail-template">
      <div>
        Name: #: name #
      </div>
      <div>
        Age: #: age #
      </div>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: kendo.template($("#detail-template").html())
    });
    </script>

#### Example - specify detail template as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    </script>

> The detail template content cannot be wider than the total width of all master columns, unless the detail template is scrollable.
Check [Detail Template](http://demos.kendoui.com/web/grid/detailtemplate.html) for a live demo.

### editable `Boolean|Object` *(default: false)*

If set to `true` the user would be able to edit the data to which the grid is bound to. By default editing is disabled.

Can be set to a string ("inline", "incell" or "popup") to specify the editing mode. The default editing mode is "incell".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - enable editing
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: true
    });
    </script>

#### Example - enable popup editing
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: "popup"
    });
    </script>

> Check [Batch editing](http://demos.kendoui.com/web/grid/editing.html), [Inline editing](http://demos.kendoui.com/web/grid/editing-inline.html) and [Popup editing](http://demos.kendoui.com/web/grid/editing-popup.html) for live demos.

### editable.confirmation `Boolean|String` *(default: true)*

If set to `true` the grid will display a confirmation dialog when the user clicks the "destroy" command button.

Can be set to a string which will be used as the confirmation text.

#### Example - disable delete confirmation
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       editable: {
         confirmation: false
       }
    });
    </script>

#### Example - set delete confirmation text
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       editable: {
         confirmation: "Are you sure that you want to delete this record?"
       }
    });
    </script>

### editable.createAt `String` *(default: "top")*

The positon at which new data items are inserted in the grid. Must be set to either "top" or "bottom". By default new data items are inserted at the top.

#### Example - insert new data items at the bottom

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: {
        createAt: "bottom"
      },
      toolbar: ["create"]
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete data items from the grid by clicking the "destroy" command button. Deleting is enabled by default.

#### Example - disable deleting
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      editable: {
        destroy: false
      },
      toolbar: ["create"]
    });
    </script>

### editable.mode `String` *(default: "incell")*

The editing mode to use. The supported editing modes are "incell", "inline" and "popup".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

#### Example - specify inline editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders popup editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use [MVVM](/getting-started/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/getting-started/data-attribute-initialization) for more info.

#### Example - customize the popup editor

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input name="name" /></label>
      </p>
      <p>
        <label>Age: <input data-role="numerictextbox" name="age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      }
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input data-bind="value: name" /></label>
      </p>
      <p>
        <label>Age:<input data-role="numerictextbox" data-bind="value:age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      }
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `true` the user can edit data items when editing is enabled.

#### Example - enable only deleting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
      ],
      editable: {
        mode: "incell",
        update: false
      }
    });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true` the user can filter the data source using the grid filter menu. Filtering is disabled by default.

Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - enable the filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criteria.

#### Example - disable the extra filtering criteria

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      filterable: {
        extra: false
      },
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### filterable.messages `Object`

The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.

#### Example - customize filter menu messages
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          and: "and",
          or: "or",
          filter: "Apply filter",
          clear: "Clear filter"
        }
      }
    });
    </script>

### filterable.messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.

#### Example - set the "and" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          and: "and"
        }
      }
    });
    </script>

### filterable.messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.

#### Example - set the "clear" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          clear: "Clear filter"
        }
      }
    });
    </script>

### filterable.messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.

#### Example - set the "filter" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          filter: "Apply filter"
        }
      }
    });
    </script>

### filterable.messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on the top of the filter menu.

#### Example - set the "info" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          info: "Filter by: "
        }
      }
    });
    </script>

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.

#### Example - set the "isFalse" message
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
            }
          }
        }
      },
      filterable: {
        messages: {
          isFalse: "False"
        }
      }
    });
    </script>

### filterable.messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when filtering `Boolean` fields.

#### Example - set the "isTrue" message
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
            }
          }
        }
      },
      filterable: {
        messages: {
          isTrue: "True"
        }
      }
    });
    </script>

### filterable.messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.

#### Example - set the "or" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      filterable: {
        messages: {
          or: "or"
        }
      }
    });
    </script>

### filterable.messages.selectValue `String` *(default: "-Select value-")*

The text of the dropdownlist displayed in the filter menu for columns whose [values](#configuration-columns.values) option is set.

#### Example - set the "selectValue" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        messages: {
          selectValue: "Select category"
        }
      }
    });
    </script>

### filterable.operators `Object`

The text of the filter operators displayed in the filter menu.

### filterable.operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the dropdown list with the available operators.

#### Example - set string operators
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the dropdown list - "Equal to" and "Not equal to".

### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the string "equal" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the string "not equal" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.

#### Example - set the string "starts with" operator
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            startswith: "Starts"
          }
        }
      }
    });
    </script>


### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.

#### Example - set the string "contains" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            contains: "Contains"
          }
        }
      }
    });
    </script>

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.

#### Example - set the string "does not contain" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotcontain: "Doesn't contain"
          }
        }
      }
    });
    </script>


### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.

#### Example - set the string "ends with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotcontain: "Ends"
          }
        }
      }
    });
    </script>

### filterable.operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the dropdown list with the available operators.

#### Example - set number operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the dropdown list - "Equal to" and "Not equal to".

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the number "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>


### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the number "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.

#### Example - set the number "greater than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gte: "Greater than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.

#### Example - set the number "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gt: "Greater than"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.

#### Example - set the number "less than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lte: "Less than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.

#### Example - set the number "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lt: "Less than"
          }
        }
      }
    });
    </script>

### filterable.operators.date `Object`

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the dropdown list with the available operators.

#### Example - set date operators
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After",
            lt: "Before"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the dropdown list - "Equal to" and "Not equal to".

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the date "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            eq: "Equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the date "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            neq: "Not equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.

#### Example - set the date "greater than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gte: "After or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.

#### Example - set the date "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.

#### Example - set the date "less than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lte: "Before or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.

#### Example - set the date "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lt: "Before"
          }
        }
      }
    });
    </script>


### filterable.operators.enums `Object`

The texts of the filter operators displayed for columns which have their [values](#configuration-columns.values) option set.

> Omitting an operator will exclude it from the dropdown list with the available operators.

#### Example - set enum operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example - set the enum "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example - set the enum "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### groupable `Boolean|Object` *(default: false)*

If set to `true` the user could group the grid by dragging the column header cells. By default grouping is disabled.

Can be set to a JavaScript object which represents the grouping configuration.

#### Example - enable grouping

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: true
    });
    </script>

> Check [Basic usage](http://demos.kendoui.com/web/grid/index.html) for a live demo.

### groupable.messages `Object`

The text messages displayed during grouping.

### groupable.messages.empty `String` *(default: "Drag a column header and drop it here to group by that column")*

The text displayed in the grouping drop area.

#### Example - set the "empty" grouping message
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: {
        messages: {
          empty: "Drop columns here"
        }
      }
    });
    </script>

### height `Number|String`

The height of the grid. Numeric values are treated as pixels.

#### Example - set the height as a number

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: 100
    });
    </script>

#### Example - set the height as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: "10em"
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the use could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.

#### Example - enable keyboard navigation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      navigatable: true,
      selectable: true
    });
    </script>

> Check [Keyboard navigation](http://demos.kendoui.com/web/grid/navigation.html) for a live demo.

### pageable `Boolean|Object` *(default: false)*

If set to `true` the grid will display a pager. By default paging is disabled.

Can be set to a JavaScript object which represents the pager configuration.

#### Example - enable paging

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the grid.

#### Example - set page size

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true` the pager will display buttons for going to the first, previous, next and last pages. By default those buttons are displayed.

#### Example - hide the first, previous, next, and last buttons
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        previousNext: false
      }
    });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

#### Example - hide the numeric pager buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        numeric: false
      }
    });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.

#### Example - set pager button count

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        buttonCount: 1
      }
    });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

#### Example - show the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true
      }
    });
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true` the pager will display a dropdown list which allows the user to pick a page size. By default the page size dropdown list is not displayed.

Can be set to an array with the available page sizes.

#### Example - show the page size dropdown

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        pageSizes: true
      }
    });
    </script>

#### Example - specify the page sizes as array

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        pageSizes: [2, 3, 4]
      }
    });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will refresh the grid. By default the refresh button is not displayed.

#### Example - show the refresh button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true
      }
    });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true` the pager will display information about the current page and total number of data items. By default the paging information is displayed.

##### Example - hide the paging information

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        info: false
      }
    });
    </script>

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/framework/kendo#methods-format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items

#### Example - set the "display" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          display: "Showing {0}-{1} from {2} data items"
        }
      }
    });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text displayed when the grid is empty.

#### Example - set the "empty" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
      ],
      pageable: {
        pageSize: 2,
        messages: {
          empty: "No data"
        }
      }
    });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label displayed before the pager input.

#### Example - set the label before the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true,
        messages: {
          page: "Enter page"
        }
      }
    });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label displayed before the pager input. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one optional placeholder {0} which represents the total number of pages.

#### Example - set the label after the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true,
        messages: {
          of: "from {0}"
        }
      }
    });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label displayed after the page size dropdown list.

#### Example - set the label after the page size dropdown list

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        pageSizes: true,
        messages: {
          itemsPerPage: "data items per page"
        }
      }
    });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.

#### Example - set the tooltip of the first page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          first: "First page"
        }
      }
    });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.

#### Example - set the tooltip of the last page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          last: "Last page"
        }
      }
    });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The tooltip of the button which goes to the next page.

#### Example - set the tooltip of the next page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          next: "Next page"
        }
      }
    });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The tooltip of the button which goes to the previous page.

#### Example - set the tooltip of the previous page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          previous: "Previous page"
        }
      }
    });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The tooltip of the refresh button.

#### Example - set the tooltip of the refresh button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true,
        messages: {
          refresh: "Refresh the grid"
        }
      }
    });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true` the user could reorder the columns by dragging their header cells. By default reordering is disabled.

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    </script>

> Check [Column reordering](http://demos.kendoui.com/web/grid/column-reordering.html) for a live demo.

### resizable `Boolean` *(default:false)*

If set to `true` the user could resize the columns by dragging the edges of their header cells. By default resizing is disabled.

#### Example - enable column resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    </script>

> Check [Column resizing](http://demos.kendoui.com/web/grid/column-resizing.html) for a live demo.

### rowTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) which renders rows. Be default renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.

#### Example - specify row template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
        <tr data-uid="#= uid #">
            <td colspan="2">
                <strong>#: name #</strong>
                <strong>#: age #</strong>
            </td>
        </tr>
    </script>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      rowTemplate: kendo.template($("#template").html())
    });
    </script>

#### Example - specify row template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      rowTemplate: '<tr data-uid="#= uid #"><td colspan="2"><strong>#: name #</strong><strong>#: age #</strong></td></tr>'
    });
    </script>

> Check [Row template](http://demos.kendoui.com/web/grid/rowtemplate.html) for a live demo.

### scrollable `Boolean|Object` *(default: true)*

If set to `true` the grid will display a scrollbar when the total row height (or width) exceeds the grid height (or width). By default scrolling is enabled.

Can be set to a JavaScript object which represents the scrolling configuration.

#### Example - disable scrolling

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      scrollable: false
    });
    </script>

### scrollable.virtual `Boolean` *(default: false)*

If set to `true` the grid will always display a single page of data. Scrolling would just change the data which is currently displayed.

> Check [Virtualization of local data](http://demos.kendoui.com/web/grid/virtualization-local-data.html) and [Virtualization of remote data](http://demos.kendoui.com/web/grid/virtualization-remote-data.html) for live demos.

### selectable `Boolean|String` *(default: false)*

If set to `true` the user would be able to select grid rows. By default selection is disabled.

Can also be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

#### Example - set selectable as a boolean
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: true
    });
    </script>

#### Example - set selectable as a string
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    </script>

> Check [Selection](http://demos.kendoui.com/web/grid/selection.html) for a live demo.

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the grid by clicking the column header cells. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.

#### Example - enable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true
    });
    </script>

> Check [Sorting](http://demos.kendoui.com/web/grid/sorting.html) for a live demo.

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the grid in unsorted state by clicking the sorted column header.

#### Example - do not allow unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        allowUnsort: false
      }
    });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by one column.

#### Example - allow multiple column sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        mode: "multiple"
      }
    });
    </script>

### toolbar `Array`

The list of commands displayed in the grid toolbar. Commands can be custom or built-in ("cancel", "create", "save").

The "cancel" built-in command reverts any data changes done by the end user.

The "create" command adds an empty data item to the grid.

The "save" command persists any data changes done by the end user.

#### Example - configure the grid toolbar
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" },
        { name: "cancel" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

### toolbar.name `String`

The name of the toolbar command. Either a built-in ("cancel", "create" and "save") or custom.

#### Example - specify the name of the command
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

### toolbar.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the command. Be default renders a button.

#### Example - set the template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        { template: kendo.template($("#template").html()) }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Toolbar template](http://demos.kendoui.com/web/grid/toolbar-template.html) for a live demo.

#### Example - set the template as a string

    <div id="grid"></div>
    <script>
    function toolbar_click() {
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        {
          template: '<a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>'
        }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>

### toolbar.text `String`

The text displayed by the command button. If not set the [name](#configuration-toolbar.name)` option would be used as the button text instead.

#### Example - set the text of the toolbar button
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create", text: "Add new" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ],
      editable: true
    });
    </script>

## Fields

### columns `Array`

The columns of the grid initialized from the [columns](#configuration-columns) option. Every item from the `columns` array has the same fields as the corresponding [columns](#configuration-columns) option.

#### Example - iterate the grid columns
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    for (var i = 0; i < grid.columns.length; i++) {
      console.log(grid.columns[i].field); // displays "name" and then "age"
    }
    </script>
### dataSource `kendo.data.DataSource`

The [data source](/api/framework/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.add({ name: "John Doe", age: 33 });
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

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(1);
    grid.dataSource.remove(data);
    </script>

### tbody `jQuery`

The jQuery object which reprents the table body. Contains all grid table rows.

#### Example - get the first table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var row = grid.tbody.find("tr:eq(0)");
    var data = grid.dataItem(row);
    console.log(data.name); // displays "Jane Doe"
    </script>

## Methods

### addRow

Adds an empty data item to the grid. In "incell" and "inline" editing mode a table row will be appended. Popup window will be displayed in "popup" editing mode.

Fires the [edit](#events-edit) event.

#### Example - add a new data item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      toolbar: ["save"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.

#### Example - cancel any changes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.cancelChanges();
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.

#### Example - cancel editing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.cancelRow();
    </script>

### cellIndex

Returns the index of the specified table cell. Skips group and detail table cells.

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table cell. A string is treated as a jQuery selector.

#### Returns

`Number` the index of the specified table cell.

#### Example - find the cell index when the cell is a jQuery object

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    var cell = $("#grid td:eq(1)");
    console.log(grid.cellIndex(cell));
    </script>

#### Example - find the cell index when the cell is a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    console.log(grid.cellIndex("td:eq(1)"));
    </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](#configuration-selectable)).

#### Example - clear selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      selectable: true
    });
    var grid = $("#grid").data("kendoGrid");
    // select the first table row
    grid.select("tr:eq(1)");
    grid.clearSelection();
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires "incell" [edit mode](#configuration-editable.mode).

#### Example - cancel cell editing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      editable: "incell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.closeCell();
    </script>

### collapseGroup

Collapses the specified group. This hides the group items.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.

#### Example - collapse the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    </script>

### collapseRow

Collapses the specified master table row. This hides its detail table row.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.

#### Example - collapse the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    // first expand the first master table row
    grid.expandRow(".k-master-row:first");
    grid.collapseRow(".k-master-row:first");
    </script>

### dataItem

Returns the data item to which the specified table row is bound.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` the data item to which the specified table row is bound.

#### Example - get the data item to which the first table row is bound

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataItem("tr:eq(1)");
    console.log(data.name); // displays "Jane Doe"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.destroy();
    </script>

### editCell

Switches the specified table cell in edit mode. Requires "incell" [edit mode](#configuration-editable.mode).

Fires the [edit](#events-edit) event.

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switch the first cell to edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "incell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editCell($("#grid td:eq(0)"));
    </script>

### editRow

Switches the specified table cell in edit mode. Requires "inline" or "popup" [edit mode](#configuration-editable.mode).

Fires the [edit](#events-edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row in edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### expandGroup

Expands the specified group. This shows the group items.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.
Expands specified group.

#### Example - expand the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    // first collapse the group
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    grid.expandGrup(".k-grouping-row:contains(Beverages)");
    </script>

### expandRow

Expands the specified master table row. This shows its detail table row.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.
Expands specified master row.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.expandRow(".k-master-row:first");
    </script>

### hideColumn

Hides the specified grid column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

#### Example - hide a column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(1);
    </script>

#### Example - hide a column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn("age");
    </script>

### refresh

Renders all table rows using the current data items.

#### Example - refresh the widget

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.refresh();
    </script>

### removeRow

Removes the specified table row from the grid. Also removes the corresponding data item from the data source.

Fires the [remove](#events-remove) event.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - remove the first table row
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.removeRow("tr:eq(1)");
    </script>

### reorderColumn

Changes the position of the specified column.

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index should be calculated with regard to all columns, including the hidden ones.

##### column `Object`

The column whose position should be changed.

#### Example - move a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.reorderColumn(1, grid.columns[0]);
    </script>

### saveChanges

Saves any pending changes by calling the [sync](/api/framework/datasource#methods-sync) method.

Fires the [saveChanges](#events-saveChanges) event.

#### Example - save changes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes made by the user.

#### Example - save row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)");
    grid.saveChanges();
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

#### Parameters

##### rows `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row(s) or cell(s). A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table rows or cells.

#### Example - select the first and second table rows

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(1), tr:eq(2)");
    </script>

#### Example - select the first table cell

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "cell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("td:eq(0)");
    </script>

#### Example - get the selected table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "row"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(1)");
    var row = grid.select();
    var data = grid.dataItem(row);
    console.log(data.name); // displays "Jane Doe"
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source

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
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.setDataSource(dataSource);
    </script>

### showColumn

Shows the specified column.

#### Parameters

##### column `Number|String`

The index of the column or the [field](#configuration-columns.field) to which the columns is bound.

#### Example - show a hidden column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(1);
    </script>

#### Example - show a hidden column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn("age");
    </script>

## Events

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](#configuration-editable.mode)) or closes the popup window.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The table row remains in edit mode.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup",
      cancel: function(e) {
        e.preventDefault()
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="grid"></div>
    <script>
    function grid_cancel(e) {
      e.preventDefault()
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("cancel", grid_cancel);
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### change

Fired when the user selects a table row or cell in the grid.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - get the selected data item(s) when using row selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row",
      change: function(e) {
        var selectedRows = this.select();
        var selectedDataItems = [];
        for (var i = 0; i < selectedRows.length; i++) {
          var dataItem = this.dataItem(selectedRows[i]);
          selectedDataItems.push(dataItem);
        }
        // selectedDataItems contains all selected data items
      }
    });
    </script>

#### Example - get the selected data item(s) when using cell selection
    <div id="grid"></div>
    <script>
    function grid_change(e) {
      var selectedCells = this.select();
      var selectedDataItems = [];
      for (var i = 0; i < selectedCells.length; i++) {
        var dataItem = this.dataItem(selectedCells[i].parentNode);
        if ($.inArray(dataItem, selectedDataItems) < 0) {
          selectedDataItems.push(dataItem);
        }
      }
      // selectedDataItems contains all selected data items
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, cell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("change", grid_change);
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnHide" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnHide: function(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnHide(e) {
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnHide", grid_columnHide);
    </script>

### columnMenuInit

Fired when the column menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
      columnMenu: true,
      columnMenuInit: function(e) {
        var menu = e.container.find(".k-menu").data("kendoMenu");
        var field = e.field;
        menu.append({ text: "Custom" });
        menu.bind("select", function(e) {
          if ($(e.item).text() == "Custom") {
            console.log("Custom button for", field);
          }
        });
      }
    });
    </script>

#### Example - subscribe to the "columnMenuInit" event after initialization
    <div id="grid"></div>
    <script>
    function grid_columnMenuInit(e) {
      var menu = e.container.find(".k-menu").data("kendoMenu");
      var field = e.field;
      menu.append({ text: "Custom" });
      menu.bind("select", function(e) {
        if ($(e.item).text() == "Custom") {
          console.log("Custom button for", field);
        }
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnMenuInit", grid_columnMenuInit);
    </script>

### columnReorder

Fired when the user changes the order of a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnReorder" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true,
      columnReorder: function(e) {
        console.log(e.column.field, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - subscribe to the "columnReorder" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnReorder(e) {
      console.log(e.column.field, e.newIndex, e.oldIndex);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnReorder", grid_columnReorder);
    </script>

### columnResize

Fired when the user resizes a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnResize" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true,
      columnResize: function(e) {
        console.log(e.column.field, e.newWidth, e.oldWidth);
      }
    });
    </script>

#### Example - subscribe to the "columnResize" event after initialization
    <div id="grid"></div>
    <script>
    function grid_columnResize(e) {
      console.log(e.column.field, e.newWidth, e.oldWidth);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnResize", grid_columnResize);
    </script>

### columnShow

Fired when the user shows a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](#configuration-columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnShow" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnShow: function(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnShow(e) {
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnShow", grid_columnShow);
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBinding" event before initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBinding: function(e) {
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBinding(e) {
      console.log("dataBinding");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBinding", grid_dataBinding);
    grid.dataSource.fetch();
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBound(e) {
      console.log("dataBound");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBound", grid_dataBound);
    grid.dataSource.fetch();
    </script>

### detailCollapse

Fired when the user collapses a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailCollapse" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>",
      detailCollapse: function(e) {
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailCollapse" event after initialization
    <div id="grid"></div>
    <script>
    function grid_detailCollapse(e) {
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailCollapse", grid_detailCollapse);
    </script>

### detailExpand

Fired when the user expands a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailExpand" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>",
      detailExpand: function(e) {
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailExpand" event after initialization
    <div id="grid"></div>
    <script>
    function grid_detailExpand(e) {
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: "<div>Name: #: name #</div><div>Age: #: age #</div>"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailExpand", grid_detailExpand);
    </script>

### detailInit

Fired when a detail table row is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.data `kendo.data.ObservableObject`

The data item to which the master table row is bound.

##### e.detailCell `jQuery`

The jQuery object which represents the detail table cell.

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>',
      detailInit: function(e) {
        e.detailRow.find(".grid").kendoGrid({
          dataSource: e.data.products
        });
      }
    });
    </script>

#### Example - subscribe to the "detailInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_detailInit(e) {
      e.detailRow.find(".grid").kendoGrid({
        dataSource: e.data.products
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>'
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailInit", grid_detailInit);
    </script>

### edit

Fired when the user edits or creates a data item.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/framework/model#methods-isNew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"],
      edit: function(e) {
        if (!e.model.isNew()) {
          // Disable the editor of the "id" column when editing data items
          var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
          numeric.enable(false);
        }
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_edit(e) {
      if (!e.model.isNew()) {
        // Disable the editor of the "id" column when editing data items
        var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
        numeric.enable(false);
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("edit", grid_edit);
    </script>

### filterMenuInit

Fired when the grid filter menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true,
      filterMenuInit: function(e) {
        if (e.field == "name") {
          var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
          firstValueDropDown.value("contains");
          var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
          logicDropDown.value("or");
          var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
          secondValueDropDown.value("contains");
        }
      }
    });
    </script>

#### Example - subscribe to the "filterMenuInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_filterMenuInit(e) {
      if (e.field == "name") {
        var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
        firstValueDropDown.value("contains");
        var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
        logicDropDown.value("or");
        var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
        secondValueDropDown.value("contains");
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("filterMenuInit", grid_filterMenuInit);
    </script>

### remove

Fired when the user clicks the "destroy" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object representing the current table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      remove: function(e) {
        console.log("Removing", e.model.name);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="grid"></div>
    <script>
    function grid_remove(e) {
      console.log("Removing", e.model.name);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("remove", grid_remove);
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object representing the current table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.values `Object`

The values entered by the user. **Availabe only when the [editable.mode](#configuration-editable.mode) option is set to "incell".**

#### Example - subscribe to the "save" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      save: function(e) {
        if (e.values.name) {
          // the user changed the name field
          if (e.values.name != e.model.name) {
            console.log("name is modified");
          }
        }
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization
    <div id="grid"></div>
    <script>
    function grid_save(e) {
      if (e.values.name) {
        // the user changed the name field
        if (e.values.name != e.model.name) {
          console.log("name is modified");
        }
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("save", grid_save);
    </script>

### saveChanges

Fired when the user clicks the "save" command button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.preventDefault `Function`

If invoked the grid will not call the [sync](/api/framework/datasource#methods-sync) method of the data source.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "saveChanges" event during initialization
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      saveChanges: function(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
           e.preventDefault();
        }
      },
      toolbar: ["save"]
    });
    </script>

#### Example - subscribe to the "saveChanges" event after initialization

    <div id="grid"></div>
    <script>
    function grid_saveChanges(e) {
      if (!confirm("Are you sure you want to save all changes?")) {
         e.preventDefault();
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
      toolbar: ["save"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("saveChanges", grid_saveChanges);
    </script>
