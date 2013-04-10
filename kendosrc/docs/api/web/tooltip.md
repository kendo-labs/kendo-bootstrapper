---
title: kendo.ui.Tooltip
meta_title: Configuration, methods and events of Kendo UI Tooltip
slug: api-web-tooltip
relatedDocs: gs-web-tooltip-overview
tags: api,web
publish: true
---

# kendo.ui.Tooltip

Represents the Kendo UI Tooltip. Inherits from [Widget](/api/framework/widget).

## Configuration

### autoHide `Boolean`*(default: true)*

Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip.

### animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

### animation.close `Object`

The animation that will be used when a Tooltip closes.

### animation.close.effects `String`

Effect to be used for closing of the tooltip.

### animation.close.duration `Number`

Difines the animation duration.

### animation.open `Object`

The animation that will be used when a Tooltip opens.

### animation.open.effects `String`

Effect to be used for opening of the Tooltip.

### animation.open.duration `Number`

Difines the animation duration.

### content `Object|String|Function`

The text or a function which result will be shown within the tooltip.
By default the tooltip will display the target element title attribute content.

#### Example

    $("#container").kendoTooltip({
        content: function(e) {
            var target = e.target; // element for which the tooltip is shown
            return target.attr("src");
        }
    });


### content.url `String`

Specifies a URL or request options that the tooltip should load its content from.

Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

### callout `Boolean`*(default:true)*

Specifies if the tooltip callout will be displayed.

### filter `String`

Specifies a selector for elements, within the container, for which the tooltip will be displayed.

### iframe `Boolean`

Explicitly states whether content iframe should be created.

### height `Number`*(default: Infinity)*

The height (in pixels) of the tooltip.

### width `Number`*(default: Infinity)*

The width (in pixels) of the tooltip.

### position `String`*(default: bottom)*

The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".

### showAfter `Number`*(default: 100)*

Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".

### showOn `String`*(default: mouseenter)*

The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".

## Methods

### show

Shows the tooltip for given target.

#### Example

    var kendoTooltip = $("#content").data("kendoTooltip");
    kendoTooltip.show(targetElement);

#### Parameters

##### element `jQuery`

The target element for which the tooltip should be shown.

### hide

Hides the tooltip.

### target

Gets the tooltip current target.

#### Returns

`jQuery` The target element or null.

## Events

### contentLoad

Triggered when an AJAX request for content completes.

### show

Triggered when a Tooltip is shown.

### hide

Triggered when a Tooltip is hidden

### requestStart

Triggered before an AJAX request started.

#### Event Data

##### e.target `jQuery`

The target element, for which the tooltip is shown.

##### e.options `Object`

The request options which will be set to [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) or to the iframe

### error

Triggered when an AJAX request for content fails.

#### Event Data

##### e.xhr `jqXHR`

The XHR request object, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

##### e.status `String`

The status of the request, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)
