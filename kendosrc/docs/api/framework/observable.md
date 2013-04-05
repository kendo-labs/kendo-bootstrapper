---
title: kendo.Observable
slug: api-framework-Observable
tags: api,framework
publish: true
---


# kendo.Observable

Provides support for events. Inherits from [kendo.Class](/api/framework/class).

## Methods

### bind

Attaches a handler to an event.

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

A function to execute each time the event is triggered. That function should have a single parameter which will contain any event specific data.

> Important: The context (`this`) of the `handler` function is set to the observable object itself.

#### Example

    var obj = new kendo.Observable();

    obj.bind("myevent", function(e) {
        console.log(e.sender === obj); // outputs "true"
        console.log(this === obj); // also outputs "true"
    });

    obj.trigger("myevent"); // causes the handler to be executed

### one

Attaches a handler to an event. The handler is executed only once.

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

A function to execute each time the event is triggered. That function should have a single parameter which will contain any event specific data.

> Important: The context (`this`) of the `handler` function is set to the observable object itself.

#### Example

    var obj = new kendo.Observable();

    var numberOfCalls = 0;

    obj.one("myevent", function() {
        numberOfCalls ++;
    });

    obj.trigger("myevent");

    obj.trigger("myevent");

    console.log(numberOfCalls); // outputs "1"

### trigger

Executes all handlers attached to the given event.

#### Parameters

##### eventName `String`

The name of the event to trigger.

##### eventData `Object`

Optional event data which will be passed as an argument to the event handlers.

#### Example

    var obj = new kendo.Observable();

    obj.bind("myevent", function(e) {
        console.log(e.data); // outputs "data"
    });

    obj.trigger("myevent", { data: "data" });

### unbind

Remove a previously attached event handler.

#### Parameters

##### eventName `String`

The name of the event. If not specified all handlers of all events will be removed.

##### handler `Function`

The handler which should no loger be executed. If not specified all handlers listening to that event will be removed.

#### Example
    var obj = new kendo.Observable();

    var numberOfCalls = 0;

    function handler(e) {
        numberOfCalls ++;
    }

    obj.bind("myevent", handler);

    obj.trigger("myevent");

    obj.unbind("myevent", handler);

    obj.trigger("myevent");

    console.log(numberOfCalls); // outputs "1"
