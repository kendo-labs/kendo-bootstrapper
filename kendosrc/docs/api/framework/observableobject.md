---
title: kendo.data.ObservableObject
meta_title: API Reference for ObservableObject, a building block of Kendo MVVM
meta_description: The documentation contains examples for the configuration of a new ObservableObject, methods and different types of events.
slug: api-framework-observableobject
tags: api,framework
publish: true
---

# kendo.data.ObservableObject

The `ObservableObject` is a very important piece of the Kendo UI framework. It is the building block of [Kendo MVVM](/getting-started/framework/mvvm/overview). In addition·
the Kendo [DataSource](/getting-started/framework/datasource/overview) contains instances of the `ObservableObject`. Inherits from [Observable](/api/framework/observable).

## Configuration

To create a new `ObservableObject` use its constructor or the `kendo.observable` method.
### Creating a new ObservableObject

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
### Using the kendo.observable method

    var observable = kendo.observable({ name: "John Doe" });
> **Important:** Complex fields are automatically wrapped in `ObservableObject`. Array fields are wrapped in `ObservableArray` objects. The `change` event of the child objects will bubble
to the parent `ObservableObject`. Fields, which name are prefixed with an underscore will not be wrapped.

### Creating ObservableObject with complex and array fields

    var observable = kendo.observable({
        // complex object field
        person: {
            name: "John Doe"
        },
        // array field
        numbers: [1, 2, 3]
    });

    console.log(observable.person instanceof kendo.data.ObservableObject); // outputs "true"
    console.log(observable.numbers instanceof kendo.data.ObservableArray); // outputs "true"

## Fields

### uid

The unique identifier of the `ObservableObject`.

#### Example
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    console.log(observable.uid); // outputs "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where "x" is a number or letter

## Methods

### bind

Attaches a handler to an event. More info can be found in the [bind](/api/framework/observable#bind) section of the
kendo.Observable API reference.

#### Example

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.bind("change", function(e) {
        console.log(e.field); // will output the changed field once the event is raised
    });

    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"

### get

Gets the value of the specified field.

#### Get the value of a field

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    var name = observable.get("name");

    console.log(name); //outputs "John Doe"

#### Get the value of a nested field

    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });

    var name = observable.get("person.name"); // use dot notation to denote nested fields

    console.log(name); //outputs "John Doe"

#### Parameters

##### name `String`

The name of the field whose value is going to be returned.

#### Returns

`Object` The value of the specified field.

### parent

Returns the parent `ObservableObject`. If the current `ObservableObject` is not
nested returns `undefined`;

#### Example

    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });

    var person = observable.get("person");

    console.log(observable.parent()); // outputs "undefined"

    console.log(person.parent() === observable); // outputs "true"

### set

Sets the value of the specified field.

#### Set the value of a field

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.set("name", "Jane Doe"); // set the value

    console.log(observable.get("name")); //outputs the new value "Jane Doe"

#### Set the value of a nested field

    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });

    observable.set("person.name", "Jane Doe"); // set the value

    console.log(observable.get("person.name")); //outputs the new value "Jane Doe"
#### Parameters

##### name `String`

The name of the field whose value is going to be returned.

##### value `Number|String|Date|Object`

The new value of the field.

### toJSON

Creates a plain JavaScript object which contains all fields of the `ObservableObject`.

#### Example
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var json = observable.toJSON();

    console.log(JSON.stringify(json)); // outputs {"person":{"name":"John Doe"}}

#### Returns

An `Object` which contains only the fields of the `ObservableObject`.

## Events

### change event

Raised when a field value is updated via the `set` method.

#### Example

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.bind("change", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });

    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"

> The `change` event is raised **after** the field value is updated. Calling the `get` method from the event handler will return the new value.

#### Event Data

##### e.field `String`

The name of the field which has changed.

### get event

Raised when the `get` method is invoked.

#### Example

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.bind("get", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });

    observable.get("name"); // raises the "get" event and the handler outputs "name"

#### Event Data

##### e.field `String`

The name of the field which is retrieved.

### set event

Raised when the `set` method is invoked.

#### Example

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.bind("set", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });

    observable.set("name", "Jane Doe"); // raises the "set" event and the handler outputs "name"
> The `set` event is raised **before** the field value is updated. Calling the `get` method from the event handler will return the old value. Calling
`e.preventDefault` will prevent the update of the field and the `change` event will not be raised.

#### Event Data

##### e.field `String`

The name of the field which is retrieved.

##### e.value `Number|String|Data|Object`

The new value.

##### e.preventDefault `Function`

A function which may prevent the update of the value. Can be used to perform validation.

#### Perform validation by preventing the `set` event

    var observable = new kendo.data.ObservableObject({ name: "John Doe" });

    observable.bind("set", function(e) {
        if (e.field == "name") {
            if (!e.value) {
                // avoid emtpy value for the "name" field
                e.preventDefault();
            }
        }
    });

    observable.set("name", "Jane Doe");

