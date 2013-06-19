---
title: kendo.data.SchedulerEvent
meta_title: API Reference for Kendo Data SchedulerEvent
meta_description: Documentation how to get started with the SchedulerEvent.
slug: api-framework-schedulerevent
tags: api,framework
publish: true
---

# kendo.data.SchedulerEvent

The `kendo.data.SchedulerEvent` class represents a data item from the
[kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource).
Inherits from [kendo.data.Model](/api/framework/model).

## Configuration

### description `String`*(default: "")*

The optional event description.

### end `Date`

The date at which the scheduler event ends.

### isAllDay `Boolean`

If set to `true` the event is "all day".

### start `Date`

The date at which the scheduler event starts.

### title `String` *(default: "")*

The title of the event which is displayed by the scheduler widget.

## Fields

### description `String`

The optional event description.

### end `Date`

The date at which the scheduler event ends.

### isAllDay `Boolean`

If set to `true` the event is "all day".

### start `Date`

The date at which the scheduler event starts.

### title `String`

The title of the event which is displayed by the scheduler widget.

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### SchedulerEvent.define

Defines a new `SchedulerEvent` type using the provided options.

#### Parameters

##### options `Object`

Describes the configuration options of the new scheduler event classs.

##### options.id `String`

The name of the field which acts as an identifier of the scheduler event.
The identifier is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specifed through the `fields` configuration) the model is considered as new.

##### options.fields `Object`

A set of key/value pairs the configure the model fields. The key specifies the name of the field.
Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

##### options.fields.fieldName.defaultValue

Specifies the which will be used for the field when a new model instance is created. Default settings depend on the type of the field. Default for "string" is `""`,
for "number" is `0` and for "date" is `new Date()` (today).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. The default value is `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. The default is `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the the type of the field. The available options are `"string"`, `"number"`, `"boolean"`, `"date`". The default is `"string"`.

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by [Kendo Validator](/api/framework/validator).

#### Example: Define custom scheduler event

    var Meeting = kendo.data.SchedulerEvent.define( {
        id: "meetindId",
        fields: {
            /* name of the field */
            roomId: {
                type: "number"
            },
            atendees: {
            }
        }
    });

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
