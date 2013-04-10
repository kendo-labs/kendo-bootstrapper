---
title: kendo.ui.DateTimePicker
meta_title: Configuration, methods and events of Kendo UI DateTimePicker
meta_description: Learn how to configure the UI DateTimePicker widget. Use methods to open, close, remove, enable, disable, set maximum or minimum values and more.
slug: api-web-datetimepicker
relatedDocs: gs-web-datetimepicker-overview
tags: api,web
publish: true
---

# kendo.ui.DateTimePicker

Represents the Kendo UI DateTimePicker widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

The animation(s) used for opening and/or closing the pop-ups. Setting this value to **false**
will disable the animation(s).

### animation.close `Object`

The animation(s) used for hiding of the pop-up.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
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

    $("#dateTimePicker").kendoDateTimePicker({
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

### culture `String`*(default: "en-US")*

 Specifies the culture info used by the widget.

#### Example

    // specify on widget initialization
    $("#datetimepicker").kendoDateTimePicker({
        culture: "de-DE"
    });

### dates `Array`

 Specifies a list of dates, which will be passed to the month template of the DateView. All dates, which match the date portion of the selected date will be used to re-bind the TimeView.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        dates: [new Date(2000, 10, 10, 10, 0, 0), new Date(2000, 10, 10, 10, 30, 0)] //the drop-down list will consist only two entries ("10:00 AM", "10:30 AM") if selected date is 10/10/2000
    });

### depth `String`

Specifies the navigation depth of the calendar. The following
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

    $("#dateTimePicker").kendoDateTimePicker({
        start: "decade",
        depth: "year" // the dateTimePicker will only go to the year level
    });

### footer `String`

 Template to be used for rendering the footer of the calendar.

#### Example

    // DateTimePicker initialization
     <script>
         $("#dateTimePicker").kendoDateTimePicker({
             footer: "Today - #=kendo.toString(data, 'd') #"
         });
     </script>

### format `String`*(default: "MM/dd/yyyy h:mm tt")*

 Specifies the format, which is used to format the value of the DateTimePicker displayed in the input. The format also will be used to parse the input.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        format: "yyyy/MM/dd hh:mm tt"
    });

### interval `Number`*(default: 30)*

 Specifies the interval, between values in the popup list, in minutes.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        interval: 15
    });

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
     max: new Date(2013, 0, 1) // sets max date to Jan 1st, 2013 12:00 AM
    });

#### Example

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    // set the max date to Jan 1st, 2013 12:00 AM
    dateTimePicker.max(new Date(2013,0, 1));

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date that the calendar can show.

#### Example

    // set the min date to Jan 1st, 2011
    $("#dateTimePicker").kendoDateTimePicker({
     min: new Date(2011, 0, 1)
    });

#### Example

    // get a reference to the dateTimePicker widget
    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    // set the min date to Jan 1st, 2011 12:00 AM
    dateTimePicker.min(new Date(2011, 0, 1));

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

     //dateTimePicker initialization
     <script>
         $("#dateTimePicker").kendoDateTimePicker({
             month: {
                content:  kendo.template($("#cellTemplate").html()),
             }
         });
     </script>

### month.empty `String`

The template used for rendering the cells in the calendar "month" view, which are not in the range between
the minimum and maximum values.

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with value() method or by direct input. If not set the value of the options.format and options.timeFormat will be used. Note that value of the format option is always used.

#### Example

    $("#datetimepicker").kendoDateTimePicker({
        format: "yyyy/MM/dd hh:mm tt",
        parseFormats: ["MMMM yyyy", "HH:mm"] //format also will be added to parseFormats
    });

### start `String`*(default: "month")*

 Specifies the start view of the calendar.
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

    $("#dateTimePicker").kendoDateTimePicker({
        start: "decade" // the dateTimePicker will start with a decade display
    });

### timeFormat `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the values in the time drop-down list.

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        timeFormat: "HH:mm" //24 hours format
    });

### value `Date`*(default: null)*

 Specifies the selected value.

#### Example

    // set the selected value to January 1st, 2011 12:00 AM
    $("#dateTimePicker").kendoDateTimePicker({
     value: new Date(2011, 0, 1)
    });

#### Example

    // get a reference to the dateTimePicker widget
    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    // set the selected value on the dateTimePicker to January 1st, 2011
    dateTimePicker.value(new Date(2011, 0, 1));

## Methods

### close

Closes the calendar or the time drop-down list.

#### Close the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").close();

#### Close the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").close("date");

#### Close the time drop-down list of a DateTimePicker.

    $("dateTimePicker").data("kendoDateTimePicker").close("time");

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

### destroy
Prepares the **DateTimePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DateTimePicker element from DOM.

#### Example

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");

    // detach events
    dateTimePicker.destroy();

### enable

Enables or disables a DateTimePicker.

#### Enable a DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").enable();

#### Enable a dateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").enable(true);

#### Disable a dateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").enable(false);

#### Parameters

##### enable `Boolean`

Enables (**true** or undefined) or disables (**false**) a DateTimePicker.

### readonly

Controls whether the widget is editable or readonly.

#### Example

    // get a reference to the datetimepicker widget
    var datetimepicker = $("datetimepicker").data("kendoDateTimePicker");

    // makes datetimepicker readonly
    datetimepicker.readonly();

    // makes datetimepicker editable
    datetimepicker.readonly(false);

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the datetimepicker should be readonly or editable.

### max

Gets or sets the maximum value of the DateTimePicker.

#### Get the maximum value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    var maximum = dateTimePicker.max();

#### Set the maximum value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    dateTimePicker.max(new Date(1900, 0, 1, 10, 0, 0));

#### Parameters

##### value `Date|String`

The maximum time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The maximum time value of a DateTimePicker.

### min

Gets or sets the minimum value of the DateTimePicker.

#### Get the minimum value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    var minimum = dateTimePicker.min();

#### Set the minimum value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    dateTimePicker.min(new Date(1900, 0, 1, 10, 0, 0));

#### Parameters

##### value `Date|String`

The minimum time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The minimum time value of a DateTimePicker.

### open

Opens the calendar or the time drop-down list.

#### Open the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").open();

#### Open the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").open("date");

#### Open the time drop-down list of a DateTimePicker.

    $("dateTimePicker").data("kendoDateTimePicker").open("time");

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

### toggle

Toggles the calendar or the time drop-down list.

#### Toggle the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").toggle();

#### Toggle the calendar of the DateTimePicker

    $("dateTimePicker").data("kendoDateTimePicker").toggle("date");

#### Toggle the time drop-down list of a DateTimePicker.

    $("dateTimePicker").data("kendoDateTimePicker").toggle("time");

#### Parameters

##### view `String`

The view of the DateTimePicker, expressed as a string.
Available views are "time" and "date".

### value

Gets or sets the value of the DateTimePicker.

#### Get the value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    var timePickerValue = dateTimePicker.value();

#### Set the value of a DateTimePicker

    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    dateTimePicker.value("2/23/2000 10:00 AM");

#### Parameters

##### value `Date|String`

The time value to set for a DateTimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The time value of a DateTimePicker.

## Events

### change

Triggered when the underlying value of a DateTimePicker is changed.

#### Attach change event handler during initialization; detach via unbind()

    // event change for expand
    var onChange = function(e) {
        // ...
    };

    // attach change event handler during initialization
    var dateTimePicker = $("#dateTimePicker").kendoDateTimePicker({
        change: onChange
    });

    // detach change event handler via unbind()
    dateTimePicker.data("kendoDateTimePicker").unbind("change", onChange);

#### Attach change event handler via bind(); detach via unbind()

    // event change for expand
    var onChange = function(e) {
        // ...
    };

    // attach change event handler via bind()
    $("#dateTimePicker").data("kendoDateTimePicker").bind("change", onChange);

    // detach change event handler via unbind()
    $("#dateTimePicker").data("kendoDateTimePicker").unbind("change", onChange);

### close

Fires when the calendar or the time drop-down list is closed

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        close: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dateTimePicker widget
    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    // bind to the close event
    dateTimePicker.bind("close", function(e) {
        // handle event
    });

#### Event Data

##### e.view `String`

The view which is closed. Possible values are "date" and "time".

### open

Fires when the calendar or the time drop-down list is opened

#### Example

    $("#dateTimePicker").kendoDateTimePicker({
        open: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the dateTimePicker widget
    var dateTimePicker = $("#dateTimePicker").data("kendoDateTimePicker");
    // bind to the open event
    dateTimePicker.bind("open", function(e) {
        // handle event
    });

#### Event Data

##### e.view `String`

The view which is opened. Possible values are "date" and "time".
