---
title: kendo.ui.TimePicker
meta_title: Configuration, methods and events of Kendo UI TimePicker
meta_description: What type of animations you can use in TimePicker UI widget, find supported methods and see which events are triggered once the value is changed.
slug: api-web-timepicker
relatedDocs: gs-web-timepicker-overview
tags: api,web
publish: true
---

# kendo.ui.TimePicker

Represents the Kendo UI TimePicker. Inherits from [Widget](/api/framework/widget).

## Configuration

### animation `Object`

Animations to be used for opening/closing the popup. Setting to false will turn of the animation.

### animation.close `Object`

Animation to be used for closing of the popup.

#### Example

    $("#timepicker").kendoTimePicker({
        animation: {
            close: {
                effects: "fadeOut",
                duration: 300,
                hide: true
                show: false
            }
        }
    });

### animation.close.effects `String`

Effect to be used for closing of the popup.

### animation.close.duration `Number`

Difines the animation duration.

### animation.open `Object`

Animation to be used for opening of the popup.

#### Example

    $("#timePicker").kendoTimePicker({
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
    $("#timepicker").kendoTimePicker({
        culture: "de-DE"
    });

### dates `Array`

 Specifies a list of dates, which are shown in the time drop-down list. If not set, the DateTimePicker will auto-generate the available times.


#### Example

    $("#timePicker").kendoTimePicker({
        dates: [new Date(2000, 10, 10, 10, 0, 0), new Date(2000, 10, 10, 30, 0)] //the drop-down list will consist only two entries - "10:00 AM" and "10:30 AM"
    });

### format `String`*(default: "h:mm tt")*

 Specifies the format, which is used to format the value of the TimePicker displayed in the input. The format also will be used to parse the input.

### interval `Number`*(default: "30")*

Specifies the interval, between values in the popup list, in minutes.

### max `Date`*(default: "00:00")*

Specifies the end value in the popup list.

### min `Date`*(default: "00:00")*

Specifies the start value in the popup list.

### parseFormats `Array`

 Specifies the formats, which are used to parse the value set with the value method or by direct input. If not set the value of the options.format will be used. Note that value of the format option is always used.

#### Example

    $("#timePicker").kendoTimePicker({
        format: "h:mm tt",
        parseFormats: ["HH:mm"] //format also will be added to parseFormats
    });

### value `Date`*(default: null)*

Specifies the selected time.

## Methods

### close

Closes the drop-down list of a TimePicker.

#### Close the time drop-down list of a TimePicker.

    $("timepicker").data("kendoTimePicker").close();

### destroy
Prepares the **TimePicker** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TimePicker element from DOM.

#### Example

    var timePicker = $("#timePicker").data("kendoTimePicker");

    // detach events
    timePicker.destroy();

### enable

Enables or disables a TimePicker.

#### Enable a TimePicker

    $("timepicker").data("kendoTimePicker").enable();

#### Enable a TimePicker

    $("timepicker").data("kendoTimePicker").enable(true);

#### Disable a TimePicker

    $("timepicker").data("kendoTimePicker").enable(false);

#### Parameters

##### enable `Boolean`

Enables (**true** or undefined) or disables (**false**) a TimePicker.

### readonly

Controls whether the widget is editable or readonly.

#### Example

    // get a reference to the timepicker widget
    var timepicker = $("timepicker").data("kendoTimePicker");

    // makes timepicker readonly
    timepicker.readonly();

    // makes timepicker editable
    timepicker.readonly(false);

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the timepicker should be readonly or editable.

### max

Gets or sets the maximum value of the TimePicker.

#### Get the maximum value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    var maximum = timePicker.max();

#### Set the maximum value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    timePicker.max(new Date(1900, 0, 1, 10, 0, 0));

#### Parameters

##### value `Date|String`

The maximum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The maximum time value of a TimePicker.

### min

Gets or sets the minimum value of the TimePicker.

#### Get the minimum value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    var minimum = timePicker.min();

#### Set the minimum value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    timePicker.min(new Date(1900, 0, 1, 10, 0, 0));

#### Parameters

##### value `Date|String`

The minimum time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The minimum time value of a TimePicker.

### open

Opens the drop-down list of a TimePicker.

#### Open the time drop-down list of a TimePicker.

    $("timepicker").data("kendoTimePicker").open();

### value

Gets or sets the value of the TimePicker.

#### Get the value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    var timePickerValue = timePicker.value();

#### Set the value of a TimePicker

    var timePicker = $("#timePicker").data("kendoTimePicker");
    timePicker.value("10:00 AM");

#### Parameters

##### value `Date|String`

The time value to set for a TimePicker, expressed as a Date object or as a string.

#### Returns

`Date` The time value of a TimePicker.

## Events

### change

Triggered when the underlying value of a TimePicker is changed.

#### Attach change event handler during initialization; detach via unbind()

    // event change for expand
    var onChange = function(e) {
        // ...
    };

    // attach change event handler during initialization
    var timePicker = $("#timePicker").kendoTimePicker({
        change: onChange
    });

    // detach change event handler via unbind()
    timePicker.data("kendoTimePicker").unbind("change", onChange);

#### Attach change event handler via bind(); detach via unbind()

    // event change for expand
    var onChange = function(e) {
        // ...
    };

    // attach change event handler via bind()
    $("#timePicker").data("kendoTimePicker").bind("change", onChange);

    // detach change event handler via unbind()
    $("#timePicker").data("kendoTimePicker").unbind("change", onChange);

### close

Fires when the time drop-down list is closed

#### Example

    $("#timePicker").kendoTimePicker({
        close: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the timePicker widget
    var timePicker = $("#timePicker").data("kendoTimePicker");
    // bind to the close event
    timePicker.bind("close", function(e) {
        // handle event
    });

### open

Fires when the time drop-down list is opened

#### Example

    $("#timePicker").kendoTimePicker({
        open: function(e) {
            // handle event
        }
    });

#### To set after initialization

    // get a reference to the timePicker widget
    var timePicker = $("#timePicker").data("kendoTimePicker");
    // bind to the open event
    timePicker.bind("open", function(e) {
        // handle event
    });

## Field

### element
A jQuery object of the original input element.

### options
An object, which holds the options of the widget.

### wrapper
A jQuery object of the span element which wraps the input.

### timeView
An instance of the TimeView object, responsible for the drop-down list of available hours.

#### popup
The Popup instace used by the widget.

#### ul
A jQuery object of the ul element, which holds the available hours.

#### list
A jQuery object of the drop-down list element.

#### template
A template used to render available options in the list.
