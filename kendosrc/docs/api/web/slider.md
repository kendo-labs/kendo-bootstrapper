---
title: kendo.ui.Slider
meta_title: Configuration, methods and events of Kendo UI Slider
meta_description: Configuration of Slider UI control, different methods, and events, triggered when the slider value changes upon specific conditions.
slug: api-web-slider
relatedDocs: gs-web-slider-overview
tags: api,web
publish: true
---

# kendo.ui.Slider

Represents the Kendo UI Slider widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### decreaseButtonTitle `String`*(default: "Decrease")*

The title of the decrease button of the **Slider**.

### increaseButtonTitle `String`*(default: "Increase")*

The title of the increase button of the **Slider**.

### largeStep `Number`*(default: 5)*

The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: The allied largeStep will also set large tick for every large step.

### max `Number`*(default: 10)*

The maximum value of the **Slider**.

### min `Number`*(default: 0)*

The minimum value of the **Slider**.

### orientation `String`*(default: "horizontal")*

The orientation of a **Slider**: **"horizontal"** or **"vertical"**.

### showButtons `Boolean`*(default: true)*

Can be used to show (**true**) or hide (**false**) the
increase and decrease buttons of a **Slider**.

### smallStep `Number`*(default: 1)*

The small step value of the **Slider**. The underlying value will be changed when the end user
(1) clicks on the increase or decrease buttons of the **Slider**, (2) presses the arrow keys
(the drag handle must be focused), or (3) drags the drag handle.

### tickPlacement `String`*(default: "both")*

Denotes the location of the tick marks in the **Slider**. The available options are:


#### *"topLeft"*

Tick marks are located on the top of the horizontal widget or on the left of
  the vertical widget.

#### *"bottomRight"*

Tick marks are located on the bottom of the horizontal widget or on the
  right side of the vertical widget.

#### *"both"*

Tick marks are located on both sides of the widget.

#### *"none"*

Tick marks are not visible.

### tooltip `Object`

Configuration of the **Slider** tooltip.

### tooltip.enabled `Boolean`*(default: true)*

Disables (**false**) or enables (**true**) the tooltip of
the **Slider**.

### tooltip.format `String`*(default: "{0}")*

Format string for the text of the tooltip. Note: The applied
format will also influence the appearance of the **Slider**
tick labels.

### tooltip.template `String`

Template of the tooltip.

*   **value** - the current value.

### value `Number`

The underlying value of the **Slider**.

## Methods

### destroy

Prepares the **Slider** for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.

#### Example

	// deatach events
	$("#slider").data("kendoSlider").destroy();

	// remove slider html from DOM
    $("#slider").closest(".k-slider").remove();

### enable

Enable/Disable the **Slider** widget.

#### Example

    // get a reference to the slider widget
    var slider = $("#slider").data("kendoSlider");

    // disables the slider
    slider.enable(false);

    // enables the slider
    slider.enable(true);

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the **Slider**.

### value

Gets or sets the value of a **Slider**. It accepts a string or number as parameters and returns
a number representing the underlying value.

#### Example

    var slider = $("#slider").data("kendoSlider");
    var sliderValue = slider.value();

#### Parameters

##### value `String`

_optional, default: _

The value to be set for a Slider.

## Events

### change

Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.

#### Event Data

##### e.value `Number`

Represents the updated value of the slider.

### slide

Fires when the user drags the drag handle to a new position.

#### Event Data

##### e.value `Number`

Represents the value from the current position of the drag handle.
