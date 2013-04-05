---
title: kendo.ui.Widget
slug: api-framework-Widget
tags: api,framework
publish: true
---

# kendo.ui.Widget

Base class of all Kendo UI widgets. Inherits from [Observable](/api/framework/observable).

## Methods

### bind

Attaches a handler to an event. More info can be found in the [bind](/api/framework/observable#bind) section of the
kendo.Observable API reference.

### destroy

Prepares the widget for safe removal from the DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

### one

Attaches a handler to an event. The handler is executed only once. More info can be found in the [one](/api/framework/observable#one) section of the
kendo.Observable API reference.

### trigger

Executes all handlers attached to the given event. More info can be found in the [trigger](/api/framework/observable#trigger) section of the
kendo.Observable API reference.

### unbind

Remove a previously attached event handler. More info can be found in the [unbind](/api/framework/observable#unbind) section of the
kendo.Observable API reference.

