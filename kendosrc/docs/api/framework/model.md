---
title: kendo.data.Model
meta_title: API Reference for Kendo DataModel
meta_description: The documentation for kendo.data.Model will help you define a new model, then introduce different methods and guide you to change, get or set an event.
slug: api-framework-model
tags: api,framework
publish: true
---

# kendo.data.Model

The `Model` inherits from the [ObservableObject](/api/framework/observableobject) and extends it with the ability to define schema - fields and methods. The
[DataSource](/api/framework/datasource) contains instances of the `Model` when the [schema.model](/api/framework/datasource#schema.model-object) setting is specified.

## Configuration

To define a new model use the `Model.define` method.

### Example: Defining a Model
    var Person = kendo.data.Model.define( {
        id: "personId", // the identifier of the model
        fields: {
            "name": {
                type: "string"
            },
            "age": {
                type: "number"
            }
        }
    });

    var person = new Person( {
        name: "John Doe",
        age: 42
    });


    console.log(person.get("name")); // outputs "John Doe"
    console.log(person.get("age")); // outputs 42

## Fields

### uid

The unique identifier of the `Model`. Inherited from `ObservableObject`. More info can be found in the [uid](/api/framework/observableobject#fields-uid) section of the
ObservableObject API reference.

### dirty `Boolean`

Indicates whether the model is modified.

## Methods

### bind

Attaches a handler to an event. More info can be found in the [bind](/api/framework/observable#methods-bind) section of the Observable API reference.

### Model.define

Defines a new `Model` type using the provided options.

#### Parameters

##### options `Object`

Describes the configuration options of the new model type.

##### options.id `String`

The name of the field which acts as an identifier of the model. The identifier is used to determine if a model instance is new or existing one.
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

#### Example: Define the Fields of a Model

    var Product = kendo.data.Model.define( {
        id: "id", // the identifier is the "id" field (declared below)
        fields: {
            /* name of the field */ name: {
                type: "string", // the field is a string
                validation: { // validation rules
                    required: true // the field is required
                },
                defaultValue: "<empty>" // default field value
            },

            /* name of the field */ price: {
                type: "number", // the field is a number
                validation: { // validation rules
                    required: true, // the field is required
                    min: 1 // the minimum value is 1
                },
                defaultValue: 99.99 // default field value
            },

            /* name of the field */ id: {
                editable: false, // this field is not editable
                nullable: true // a default value will not be assigned
            }
        }
    });

### editable

Determines if the specified field is editable or not.

#### Parameters

##### field `String`

The field to check.

#### Example

    var Product = kendo.data.Model.define({
        fields: {
            id: {
                editable: false
            },
            name: {
                editable: true
            }
        }
    });

    var product = new Product();

    console.log(product.editable("id")); // outputs "false"
    console.log(product.editable("name")); // outputs "true"

### get

Gets the value of the specified field. Inherited from `ObservableObject`. More info can be found in the [get](/api/framework/observableobject#methods-get) section of the
ObservableObject API reference.

### isNew

Checks if the `Model` is new or not. The `id` field is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specifed through the `fields` configuration) the model is considered as new.

#### Example
    var Product = kendo.data.Model.define({
        id: "productId",
        fields: {
            productId: {
                editable: false
            }
        }
    });

    var productOne = new Product();

    console.log(productOne.isNew()); // outputs "true"

    var productTwo = new Product({ productId: 1 });

    console.log(productTwo.isNew()); // outputs "false" because productId is set to 1

### set

Sets the value of the specified field. Inherited from `ObservableObject`. More info can be found in the [set](/api/framework/observableobject#methods-set) section of the
ObservableObject API reference.

### toJSON

Creates a plain JavaScript object which contains all fields of the `Model`. Inherited from `ObservableObject`. More info can be found in the [toJSON](/api/framework/observableobject#methods-toJSON) section of the
ObservableObject API reference.

## Events

### change event

Raised when a field value is updated via the `set` method. Inherited from `ObservableObject`. More info can be found in the [change](/api/framework/observableobject#events-change) section of the
ObservableObject API reference.

### get event

Raised when the `get` method is invoked. Inherited from `ObservableObject`. More info can be found in the [get](/api/framework/observableobject#events-get) section of the
ObservableObject API reference.

### set event

Raised when the `set` method is invoked. Inherited from `ObservableObject`. More info can be found in the [set](/api/framework/observableobject#events-set) section of the
ObservableObject API reference.
