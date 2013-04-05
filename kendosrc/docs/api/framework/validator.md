---
title: kendo.ui.Validator
meta_title: Validator configuration and methods | Kendo UI Framework
meta_description: How to configure the Validator in Kendo UI Framework, get error messages and ensure the validation of the input elements in supported methods.
slug: api-framework-validator
tags: api,web
publish: true
---

# kendo.ui.Validator

## Configuration

### messages `Object`

Set of messages (either strings or functions) which will be shown when given validation rule fails.
By setting already existing key the appropriate built-in message will be overridden.

### Defining custom messages

    $("#myform").kendoValidator({
         messages: {
             // defines a message for the 'custom' validation rule
             custom: "Please enter valid value for my custom rule",

             // overrides the built-in message for the required rule
             required: "My custom required message",

             // overrides the built-in message for the email rule
             // with a custom function that returns the actual message
             email: function(input) {
                 return getMessage(input);
             }
         }
    });

Note that validation messages can also be defined on a per-component basis, via the following attributes (in that order):

    1. `data-[rule]-msg` -- where [rule] is the failing validation rule
    2. `validationMessage`
    3. `title`

These attributes will be checked before applying the message from the `messages` configuration option.

#### Using validationMessage attribute to specify a custom validation message

    <input type="tel" pattern="\d{10}" validationMessage="Plase enter a ten digit phone number">

Setting multiple `data-[rule]-msg` attributes allows a field to have different messages for each different validation rule.

    <input type="url" required data-required-msg="You need to enter a URL" data-url-msg="This url is invalid">

Validation messages can also be defined for custom rules.

#### Defining validation messages for custom rules

    $("#myform").kendoValidator({
        rules: {
            custom: function(input){
                return input.val() === "Test";
            },
            foo: function(input){
                return input.val() === "Foo";
            }
        },
        messages: {
            custom: "Your name must be Test",
            foo: "Your name must be Foo"
        }
    });

### rules `Object`

Set of custom validation rules. Those rules will extend the [built-in ones](/getting-started/framework/validator/overview#default-validation-rules).

#### Defining custom rules

    $("#myform").kendoValidator({
         rules: {
             custom: function(input) {
                 // Only "Tom" will be a valid value for the FirstName input
                 return input.is("[name=firstname]") && input.val() === "Tom";
             },
             alsoCustom: function(input) {
                return $.trim(input.val()) !== "";
             }
         }
    });

This configuration can be [tested live using this JSBin example](http://jsbin.com/erixot/3/edit).


### validateOnBlur `Boolean`

Determines if validation will be triggered when element loses focus. Default value is true.

## Methods

### errors

Get the error messages if any.

#### Example

    // get a reference to the validatable form
    var validatable = $("#myform").kendoValidator().data("kendoValidator");
    $("#save").click(function() {
        if (validatable.validate() === false) {
            // get the errors and write them out to the "errors" html container
            var errors = validatable.errors();
            $(errors).each(function() {
                $("#errors").html(this);
            });
        }
    });

#### Returns

`Array` Messages for the failed validation rules.

### hideMessages

Hides the validation messages.

### validate

Validates the input element(s) against the declared validation rules.

#### Example

    // get a reference to the validatable form
    var validatable = $("#myform").kendoValidator().data("kendoValidator");
    // check validation on save button click
    $("#save").click(function() {
        if (validatable.validate()) {
            save();
        }
    });

#### Returns

`Boolean` `true` if all validation rules passed successfully.

Note that if a HTML form element is set as validation container, the form submits will be automatically prevented if validation fails.


### validateInput

Validates the input element against the declared validation rules.

#### Parameters

##### input `Element`

Input element to be validated.

#### Returns

`Boolean` `true` if all validation rules passed successfully.
