---
title: kendo.data.Binder
slug: api-framework-binder
tags: api,framework
publish: true
---


# kendo.data.Binder

The base class for MVVM-style bindings. Used for creating **custom MVVM bindings**.

## Class Fields

### element `Element`

The element that is bound with this binder. Used in the `refresh` method to apply the custom binding.

## Class methods

### extend

Creates a new binder.

#### Returns

`Object` a new class which inherits the base methods.

#### Parameters

##### prototype `Object`

A key/value pair of all methods that the new class will have.

#### Example

    kendo.data.binders.slide = kendo.data.Binder.extend({
        refresh: function() {
            var value = this.bindings["slide"].get();

            if (value) {
                $(this.element).slideDown();
            } else {
                $(this.element).slideUp();
            }
        }
    });

