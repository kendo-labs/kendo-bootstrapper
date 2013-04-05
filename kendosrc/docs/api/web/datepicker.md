---
title: kendo.ui.DatePicker
meta_title: Configuration, methods and events of Kendo UI DatePicker
meta_description: Easy to follow steps guide how to quickly configure DatePicker UI widget, easily enable/disable it using methods and how to change events.
slug: api-web-datepicker
relatedDocs: gs-web-datepicker-overview
tags: api,web
publish: true
---

# kendo.ui.DatePicker

Represents the Kendo UI DatePicker widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

The animation(s) used for opening and/or closing the pop-up. Setting this value to **false**
will disable the animation(s).

### animation.close `Object`

The animation(s) used for hiding of the pop-up.

#### Example

    $("#datePicker").kendoDatePicker({
        animation: {
            close: {
                effects: "fadeOut",
                duration: 300,
                show: false,
                hide: true
            }
        }
    });

### animation.close.effects `String`

Effect to be used for closing of the popup.

### animation.close.duration `Number`

Difines the animation duration.

### animation.open `Object`

The animation(s) used for displaying of the pop-up.

#### Example

    $("#datePicker").kendoDatePicker({
        animation: {
            open: {
                effects: "fadeIn",
                duration: 300,
                show: true
            }
        }
    });

### animation.open.effects `String`

Effect to be used for opening of the popup.

### animation.open.duration `Number`

Difines the animation duration.

### culture `String`*(default: en-US)*

 Specifies the culture info used by the widget.

#### Example

    // specify on widget initialization
    $("#datepicker").kendoDatePicker({
        culture: "de-DE"
    });

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.


#### Example

    $("#datepicker").kendoDatePicker({
        dates: [new Date(2000, 10, 10, 10, 0, 0), new Date(2000, 10, 10, 30, 0)] //can manipulate month template depending on this array.
    });

### depth `String`

Specifies the navigation depth. The following
settings are available for the **depth** value:


#### *"month"*

shows the days of the month

#### *"year"*

shows the months of the year

#### *"decade"*

shows the years of the decade

#### *"century"*

shows the decades from the centery

#### Example

    $("#datePicker").kendoDatePicker({
        start: "decade",
        depth: "year" // the datePicker will only go to the year level
    });

### footer `String`

 Template to be used for rendering the footer of the calendar.

#### Example

    // DatePicker initialization
     <script>
         $("#datePicker").kendoDatePicker({
             footer: "Today - #=kendo.toString(data, 'd') #"
         });
     </script>

### format `String`*(default: MM/dd/yyyy)*

 Specifies the format, which is used to format the value of the DatePicker displayed in the input. The format also will be used to parse the input.

#### Example

    $("#datePicker").kendoDatePicker({
        format: "yyyy/MM/dd"
    });

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example

    $("#datePicker").kendoDatePicker({
     max: new Date(2013, 0, 1) // sets max date to Jan 1st, 2013
    });

#### Example

    var datePicker = $("#datePicker").data("kendoDatePicker");
    // set the max date to Jan 1st, 2013
    datePicker.max(new Date(2013,0, 1));

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example

    // set the min date to Jan 1st, 2011
    $("#datePicker").kendoDatePicker({
     min: new Date(2011, 0, 1)
    });

#### Example

    // get a reference to the datePicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // set the min date to Jan 1st, 2011
    datePicker.min(new Date(2011, 0, 1));

### month `Object`

 Templates for the cells rendered in the calendar "month" view.

### month.content `String`

 Template to be used for rendering the cells in the calendar "month" view, which are in range.

#### Example

    //template

    <script id="cellTemplate" type="text/x-kendo-tmpl">
         <div class="${ data.value < 10 ? exhibition : party }">
         </div>
         ${ data.value }
     </script>

     //datePicker initialization
     <script>
         $("#datePicker").kendoDatePicker({
             month: {
                content:  kendo.template($("#cellTemplate").html()),
             }
         });
     </script>

### month.empty `String`

The template used for rendering the cells in the calendar "month" view, which are not in the range between
the minimum and maximum values.

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with value() method or by direct input. If not set the value of the format will be used. Note that value of the format option is always used.

#### Example

    $("#datePicker").kendoDatePicker({
        format: "yyyy/MM/dd",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats
    });

### start `String`*(default: month)*

 Specifies the start view.
The following settings are available for the **start** value:


#### *"month"*

shows the days of the month

#### *"year"*

shows the months of the year

#### *"decade"*

shows the years of the decade

#### *"century"*

shows the decades from the centery

#### Example

    $("#datePicker").kendoDatePicker({
        start: "decade" // the datePicker will start with a decade display
    });

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example

    // set the selected value to January 1st, 2011
    $("#datePicker").kendoDatePicker({
     value: new Date(2011, 0, 1)
    });

#### Example

    // get a reference to the datePicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // set the selected date on the datePicker to January 1st, 2011
    datePicker.value(new Date(2011, 0, 1));

## Methods

### close

Closes the calendar.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // close the datepicker
    datePicker.close();

### destroy
Prepares the **DatePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DatePicker element from DOM.

#### Example

    var datePicker = $("#datePicker").data("kendoDatePicker");

    // detach events
    datePicker.destroy();

### enable

Enable/Disable the datePicker widget.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");

    // disables the datePicker
    datePicker.enable(false);

    // enables the datePicker
    datePicker.enable(true);

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the datePicker.

### readonly

Controls whether the widget is editable or readonly.

#### Example

    // get a reference to the datepicker widget
    var datepicker = $("datepicker").data("kendoDatePicker");

    // makes datepicker readonly
    datepicker.readonly();

    // makes datepicker editable
    datepicker.readonly(false);

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the datepicker should be readonly or editable.

### max

Gets/Sets the max value of the datePicker.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");

    // get the max value of the datePicker.
    var max = datePicker.max();

    // set the max value of the datePicker.
    datePicker.max(new Date(1900, 0, 1));

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the datePicker.

### min

Gets/Sets the min value of the datePicker.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");

    // get the min value of the datePicker.
    var min = datePicker.min();

    // set the min value of the datePicker.
    datePicker.min(new Date(1900, 0, 1));

#### Parameters

##### value `Date | String`

The min date to set.

#### Returns

`Date` The min value of the datePicker.

### open

Opens the calendar.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // open the datepicker
    datePicker.open();

### value

Gets/Sets the value of the datePicker.

#### Example

    // get a reference to the datepicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");

    // get the value of the datePicker.
    var value = datePicker.value();

    // set the value of the datePicker.
    datePicker.value("10/10/2000"); //parse "10/10/2000" date and selects it in the calendar.

#### Parameters

##### value `Date | String`

The value to set.

#### Returns

`Date` The value of the datePicker.

## Events

### change

Fires when the selected date is changed

#### Example

    $("#datePicker").kendoDatePicker({
        change: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the datePicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // bind to the change event
    datePicker.bind("change", function(e) {
        // handle event
    });

### close

Fires when the calendar is closed

#### Example

    $("#datePicker").kendoDatePicker({
        close: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the datePicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // bind to the close event
    datePicker.bind("close", function(e) {
        // handle event
    });

### open

Fires when the calendar is opened

#### Example

    $("#datePicker").kendoDatePicker({
        open: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the datePicker widget
    var datePicker = $("#datePicker").data("kendoDatePicker");
    // bind to the open event
    datePicker.bind("open", function(e) {
        // handle event
    });
