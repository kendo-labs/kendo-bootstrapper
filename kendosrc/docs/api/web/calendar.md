---
title: kendo.ui.Calendar
meta_title: Configuration, methods and events of Kendo UI Calendar
meta_description: Find out how to successfully configure calendar UI component, how to use methods to get the max value of the calendar and navigate easily.
slug: api-web-calendar
relatedDocs: gs-web-calendar-overview
tags: api,web
publish: true
---

# kendo.ui.Calendar

Represents the Kendo UI Calendar widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### culture `String`*(default: en-US)*

 Specifies the culture info used by the widget.

#### Example

    // specify on widget initialization
    $("#calendar").kendoCalendar({
        culture: "de-DE"
    });

### dates `Array`

 Specifies a list of dates, which will be passed to the month template.


#### Example

    $("#calendar").kendoCalendar({
        dates: [new Date(2000, 10, 10, 10, 0, 0), new Date(2000, 10, 10, 30, 0)] //can manipulate month template depending on this array.
    });

### depth `String`

Specifies the navigation depth.

#### Example

    $("#calendar").kendoCalendar({
        depth: "year"
    });

### footer `String`

 Template to be used for rendering the footer. If false, the footer will not be rendered.

#### Example

    //calendar intialization
     <script>
         $("#calendar").kendoCalendar({
             footer: "Today - #=kendo.toString(data, 'd') #"
         });
     </script>

### format `String`*(default: MM/dd/yyyy)*

 Specifies the format, which is used to parse value set with value() method.

#### Example

    $("#calendar").kendoCalendar({
        format: "yyyy/MM/dd"
    });

### max `Date`*(default: Date(2099, 11, 31))*

 Specifies the maximum date, which the calendar can show.

#### Example

    $("#calendar").kendoCalendar({
        max = new Date(2013, 0, 1);
    });

#### Example

    // get a reference to the Kendo UI calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // set the max date to Jan 1st, 2013
    calendar.max(new Date(2013, 0, 1));

### min `Date`*(default: Date(1900, 0, 1))*

 Specifies the minimum date, which the calendar can show.

#### Example

    // set the min date to Jan 1st, 2011
    $("#calendar").kendoCalendar({
        min = new Date(2011, 0, 1)
    });

#### Example

    // get a reference to the Kendo UI calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // set the min date to Jan 1st, 2011
    calendar.min(new Date(2011, 0, 1));

### month `Object`

 Templates for the cells rendered in the "month" view.

### month.content `String`

 Template to be used for rendering the cells in the "month" view, which are in range.

#### Example

    //template
    <script id="cellTemplate" type="text/x-kendo-tmpl">
         <div class="${ data.value < 10 ? exhibition : party }">
         </div>
         ${ data.value }
     </script>

     //calendar intialization
     <script>
         $("#calendar").kendoCalendar({
             month: {
                content:  kendo.template($("#cellTemplate").html()),
             }
         });
     </script>

### month.empty `String`

 Template to be used for rendering the cells in the "month" view, which are not in the min/max range.

### start `String`*(default: month)*

 Specifies the start view.

#### Example

    $("#calendar").kendoCalendar({
        start: "year"
    });

### value `Date`*(default: null)*

 Specifies the selected date.

#### Example

    // set the selected date to Jan 1st. 2012
    $("#calendar").kendoCalendar({
        value: new Date(2012, 0, 1)
    });

#### Example

    // get a reference to the Kendo UI calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // set the selected date on the calendar to Jan 1st, 2012
    calendar.value(new Date(2012, 0, 1));

## Methods

### destroy
Prepares the **Calendar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Calendar element from DOM.

#### Example

    var calendar = $("#calendar").data("kendoCalendar");

    // detach events
    calendar.destroy();

### max

Gets/Sets the max value of the calendar.

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");

    // get the max value of the calendar.
    var max = calendar.max();

    // set the max value of the calendar.
    calendar.max(new Date(2100, 0, 1));

#### Parameters

##### value `Date | String`

The max date to set.

#### Returns

`Date` The max value of the calendar.

### min

Gets/Sets the min value of the calendar.

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");

    // get the min value of the calendar.
    var min = calendar.min();

    // set the min value of the calendar.
    calendar.min(new Date(1900, 0, 1));

#### Parameters

##### value `Date|String`

The min date to set.

#### Returns

`Date` The min value of the calendar.

### navigate

Navigates to view

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // navigate to the desired date
    calendar.navigate(value, view);

#### Parameters

##### value `Date`

Desired date

##### view `String`

Desired view

### navigateDown

Navigates to the lower view

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // navigate down
    calendar.navigateDown(value);

#### Parameters

##### value `Date`

Desired date

### navigateToFuture

Navigates to the future

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // navigate to future
    calendar.navigateToFuture();

### navigateToPast

Navigates to the past

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // navigate to past
    calendar.navigateToPast();

### navigateUp

Navigates to the upper view

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // navigate up
    calendar.navigateUp();

### value

Gets/Sets the value of the calendar.

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");

    // get the value of the calendar.
    var value = calendar.value();

    // set the value of the calendar.
    calendar.value(new Date());

#### Parameters

##### value `Date|String`

The date to set.

#### Returns

`Date` The value of the calendar.

### current

Gets currently focused date.

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");

    // get the current focused date
    var current = calendar.current(); //will be today, because value is `null`

#### Returns

`Date` The current focused date shown in the calendar.

### view

Gets an instance of the current view used by the calendar.

#### Returns

`Object` The instance of the current view used by the calendar.

#### Example

    // get a reference to the calendar widget
    var calendar = $("#calendar").data("kendoCalendar");

    // get the current focused date
    var view = calendar.view();

## Events

### change

Fires when the selected date is changed

#### Example

    $("#calendar").kendoCalendar({
        change: function(e) {
            // handle event
        });
    });

#### To set after initialization

    // get a reference to the Kendo UI calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // bind to the change event
    calendar.bind("change", function(e) {
         // handle event
    });

### navigate

Fires when navigate

#### Example

    $("#calendar").kendoCalendar({
        navigate: function(e) {
             // handle event
        }
    });

#### To set after initialization

    // get a reference to the Kendo UI calendar widget
    var calendar = $("#calendar").data("kendoCalendar");
    // bind to the change event
    calendar.bind("navigate", function(e) {
         // handle event
    });
