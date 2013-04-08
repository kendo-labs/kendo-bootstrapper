---
title: kendo
meta_title: API Reference for methods and properties in Kendo UI Framework
meta_description: Examples and detailed explanation of Kendo UI methods and properties.
slug: api-framework
tags: api,framework
publish: true
---

# kendo

## Methods

### bind
Binds a HTML View to a View-Model.

Model View ViewModel ([MVVM](http://en.wikipedia.org/wiki/Model_View_ViewModel)) is a design pattern which helps developers separate the Model from the View. The View-Model part of MVVM is responsible for
exposing the data objects from the Model in such a way that those objects are easily consumed in the View.

> **Important:** Kendo UI Mobile is not included in the default list of initialized namespaces. You can initialize it explicitly by
  running `kendo.bind(element, viewModel, kendo.mobile.ui);`


#### Example
     <!-- View -->
     <div id="view">
       <!-- The value of the INPUT element is bound to the "firstName" field of the View-Model.
       When the value changes so will the "firstName" field and vice versa.  -->
       <label>First Name:<input data-bind="value: firstName" /></label>
       <!-- The value of the INPUT element is bound to the "lastName" field of the View-Model.
       When the value changes so will the "lastName" field and vice versa.   -->
       <label>Last Name:<input data-bind="value: lastName" /></label>
       <!-- The click event of the BUTTON element is bound to the "displayGreeting" method of the View-Model.
       When the user clicks the button the "displayGreeting" method will be invoked.  -->
       <button data-bind="click: displayGreeting">Display Greeting</button>
     </div>
     <script>
       // View-Model
       var viewModel = kendo.observable({
          firstName: "John",
          lastName: "Doe",
          displayGreeting: function() {
              // Get the current values of "firstName" and "lastName"
              var firstName = this.get("firstName");
              var lastName = this.get("lastName");
              alert("Hello, " + firstName + " " + lastName + "!!!");
          }
       });

       // Bind the View to the View-Model
       kendo.bind($("#view"), viewModel);
     </script>
#### Parameters

##### element `String|jQuery|Node`

The root element(s) from which the binding starts. Can be a valid jQuery string selector, a DOM element or a jQuery object.
All child elements are traversed.

##### viewModel `Object|kendo.data.ObservableObject`

The View-Model which the elements are bound to. Wraped as an instance of `kendo.data.ObservableObject` if not already.

##### namespace `Object`

Optional namespace too look in when instantiating Kendo UI widgets. The valid namespaces are `kendo.ui`, `kendo.dataviz.ui` and `kendo.mobile.ui`. If omitted
`kendo.ui` will be used.

### observableHierarchy

Creates an ObservableArray instance that is bound to a HierarchicalDataSource. Required to bind a HierarchicalDataSource-enabled widget (such as the Kendo TreeView) to an observable array.

#### Example

    var viewModel = kendo.observable({
        products: kendo.observableHierarchy([
            { text: "foo", items: [
                { text: "bar" }
            ] },
            { text: "baz" }
        ])
    });

#### Parameters

##### array `Array`

The array that will be converted to an ObservableArray.

### culture
Sets or gets the current culture. Uses the passed culture name to select a culture from the culture scripts that you have included and then sets the current culture.
If there is no corresponding culture then the method will try to find culture which is equal to the country part of the culture name.
If no culture is found the default one is used.

#### Include culture JavaScript files and select a culture
    <script src="jquery.js" ></script>
    <script src="kendo.all.min.js"></script>
    <script src="kendo.culture.en-GB.js"></script>
    <script>
    //set current culture to "en-GB".
    kendo.culture("en-GB");
    </script>
#### Get the current culture
    var culture = kendo.culture();

### destroy
Finds all Kendo widgets that are children of the specified element and calls their destroy method.

#### Parameters

##### element `String|jQuery|Node`

### format
Replaces each format item in a specified string with the text equivalent of a corresponding object's value.

#### Example
    kendo.format("{0} - {1}", 12, 24); //12 - 24
    kendo.format("{0:c} - {1:c}", 12, 24); //$12.00 - $24.00

#### Returns

`String` The formatted string.

### htmlEncode

Encodes HTML characters to entities.

#### Example
    var html = kendo.htmlEncode("<span>Hello</span>");
    console.log(html); // outputs "&lt;span&gt;Hello&lt;/span&gt;"

#### Parameters

##### value `String`

The string that needs to be HTML encoded.

#### Returns

`String` The encoded string.

### parseDate
Parses as a formatted string as a `Date`.
#### Example
    kendo.parseDate("12/22/2000"); //Fri Dec 22 2000
    kendo.parseDate("2000/12/22", "yyyy/MM/dd"); //Fri Dec 22 2000
#### Returns
`Date` the parsed date.

#### Parameters

##### value `String`
The formatted string which should be parsed as date.

##### formats `String|Array` *(optional)*
The format(s) that will be used to parse the date. By default all standard date formats are used.

##### culture `String` *(optional)*
The culture used to parse the number. The current culture is used by default.

### parseFloat
Parses as a formatted string as a floating point number.

#### Example
    kendo.parseFloat("12.22"); //12.22

    kendo.culture("de-DE");
    kendo.parseFloat("1.212,22 €"); //1212.22
#### Returns
`Number` the parsed number.

#### Parameters

##### value `String`
The formatted string which should be parsed as number.

##### culture `String` *(optional)*
The culture used to parse the number. The current culture is used by default.

### parseInt
Parses as a formatted string as an integer.
#### Example
    kendo.parseInt("12.22"); //12

    kendo.culture("de-DE");
    kendo.parseInt("1.212,22 €"); //1212
#### Returns
`Number` the parsed number.

#### Parameters

##### value `String`
The formatted string which should be parsed as number.

##### culture `String` *(optional)*
The culture used to parse the number. The current culture is used by default.

<a name="parseColor"></a>
### parseColor

Parse a color string into a <a href="#Color">Color</a> object.  If the input is not valid, it throws an Error, unless the `noerror` argument is given.

#### Example

    red = kendo.parseColor("#ff0000");
    green = kendo.parseColor("#0f0");
    // the sharp is optional:
    blue = kendo.parseColor("0000ff"); // or 00f

    red = kendo.parseColor("rgb(255, 0, 0)");
    halfBlue = kendo.parseColor("rgba(0, 0, 255, 0.5)");

#### Parameters

##### color `String`

A string in one of the following (case-insensitive) CSS notations:

- `#F00` (optionally without the sharp: `F00`)
- `#FF0000` (optionally without the sharp: `FF0000`)
- `rgb(255, 0, 0)`
- `rgba(255, 0, 0, 1)`

Particularly if this argument is `null` or the string `"transparent"` then this function will return `null`.

##### noerror `Boolean`*(default: false)*

If you pass `true` then this function will return `undefined` rather than throwing an error on invalid input.

#### Returns

`Color` A <a href="#Color">Color</a> object.

### render

Renders the specified template using the provided data.

#### Example
    var template = kendo.template("<li>#: name #</li>");
    var data = [ { name: "John Doe" }, { name: "Jane Doe" }];
    $("ul").html(kendo.render(template, data)); // sets the html to <li>John Doe</li><li>Jane Doe</li>

#### Parameters

##### template `Function`

The Kendo template which should be rendered.

##### data `Array`

Array of JavaScript objects which contains the data that the template will render.

### stringify

Converts a value to JSON. Uses [JSON.stringify](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify) in browsers that support it.

#### Parameters

##### value `Object`

The value to convert to a JSON string.

#### Returns

`String` The JSON representation of the value.

#### Example

    var json = kendo.stringify({ foo: "bar" });
    console.log(json); // displays {"foo":"bar"}


### template
Compiles a template to a function that builds HTML. Useful when a template will be used several times.
Templates offer way of creating HTML chunks. Options such as HTML encoding and compilation for optimal
performance are available.

#### Returns
`Function` the compiled template as a JavaScript function. When called this function will return the generated HTML string.

#### Basic template

    var inlineTemplate = kendo.template("Hello, #= firstName # #= lastName #");
    var inlineData = { firstName: "John", lastName: "Doe" };
    $("#inline").html(inlineTemplate(inlineData));

#### Output:

    Hello, John Doe!

#### Encode HTML

    var encodingTemplate = kendo.template("HTML tags are encoded as follows: #:html#");
    var encodingData = { html: "<strong>lorem ipsum</strong>" };
    $("#encoding").html(encodingTemplate(encodingData));

#### Output:

    HTML tags are encoded as follows: <strong>lorem ipsum</strong>

#### Use JavaScript in templates

    var encodingTemplate = kendo.template("#if (foo) {# bar #}#");
    var data = { foo: true};
    $("#encoding").html(encodingTemplate(data)); // outputs bar

#### Escape sharp symbols in JavaScript strings

    var encodingTemplate = kendo.template("<a href='\\#'>Link</a>");

#### Escape sharp symbols in script templates

    <script type="text/x-kendo-template" id="template">
     <a href="\#">Link</a>
    </script>

    <script>
    var encodingTemplate = kendo.template($("#template").html());
    </script>

#### Parameters
##### template `String`

The template that will be compiled.
##### options `Object` (optional)
Template compilation options.

##### options.paramName `String` *(default: "data")*
The name of the parameter used by the generated function. Useful when `useWithBlock` is set to `false`.

###### Example
    var template = kendo.template("<strong>#: d.name #</strong>", { paramName: "d", useWithBlock: false });

##### options.useWithBlock `Boolean` *(default: true)*
Wraps the generated code in a `with` block. This allows the usage of unqualified fields in the template. Disabling the `with` block will improve
the performance of the template.

###### Example
    var template = kendo.template("<strong>#: data.name #</strong>", { useWithBlock: false }); // Note that "data." is used to qualify the field

    console.log(template({ name: "John Doe" })); // outputs "<strong>John Doe</strong>"

### touchScroller

Enables kinetic scrolling on touch devices

#### Parameters

##### element `Selector`

The container element to enable scrolling for.
### toString
Formats a `Number` or `Date` using the specified format and the current culture.
#### Returns
`String` the string representation of the formatted value.
#### Formatting numbers and dates
    //format a number using standard number formats and default culture en-US
    kendo.toString(10.12, "n"); //10.12
    kendo.toString(10.12, "n0"); //10
    kendo.toString(10.12, "n5"); //10.12000
    kendo.toString(10.12, "c"); //$10.12
    kendo.toString(0.12, "p"); //12.00 %
    //format a number using custom number formats
    kendo.toString(19.12, "00##"); //0019
    //format a date
    kendo.toString(new Date(2010, 9, 5), "yyyy/MM/dd" ); // "2010/10/05"
    kendo.toString(new Date(2010, 9, 5), "dddd MMMM d, yyyy" ); // "Tuesday October 5, 2010"
    kendo.toString(new Date(2010, 10, 10, 22, 12), "hh:mm tt" ); // "10:12 PM"
#### Parameters

##### value `Date|Number`
The `Date` or `Number` which should be formatted.

##### format `String`
The format string which should be used to format the value.

## Field

### support
A range of useful supported by the current browser capabilities and features.

#### support

##### touch `Boolean`
Return true if the browser supports touch events.

##### pointers `Boolean`
Return true if the browser supports pointer events (IE10 and Metro apps currently).

##### scrollbar `Function`
Checks for the browser scrollbar width, returns scrollbar width in pixels, 0 if no scrollbars available (e.g. in mobile).

##### hasHW3D `Boolean`
Return true if the browser supports 3D transitions and transforms.

##### hasNativeScrolling `Boolean`
Returns true if the browser supports overflow-scrolling CSS property (currently only iOS 5+).

##### devicePixelRatio `Number` *(default: 1)*
Returns the current device Device to Pixel Ratio - works only in Android.

##### placeHolder `Boolean`
Retruns true if the browser supports input placeholders.

##### zoomLevel `Number` *(default: 1)*
Returns the current zoom level on a mobile browser (returns 1 on desktop).

### support.transforms `Object`
Returns a number of browser specific transformation properties

#### support.transforms
##### transforms.css `String`
Returns the CSS prefix of the current browser proprietary transform properties. E.g. "-webkit-", "-moz-", "-o-", "-ms-"

##### transforms.prefix `String`
Returns the JavaScript prefix of the current browser proprietary transform properties. E.g. "webkit", "Moz", "O", "ms"

### support.transitions `Object`
Returns a number of browser specific transition properties

#### support.transitions
##### transitions.css `String`
Returns the CSS prefix of the current browser proprietary transition properties. E.g. "-webkit-", "-moz-", "-o-", "-ms-"

##### transitions.prefix `String`
Returns the JavaScript prefix of the current browser proprietary transition properties. E.g. "webkit", "Moz", "O", "ms"

##### transitions.event `String`
Returns the transition end event name in the current browser. E.g. "webkitTransitionEnd", "transitionend", "oTransitionEnd"

### support.mobileOS `Object`
Returns a number of properties that identify the current mobile browser. Parses navigator.userAgent to do it. Undefined on desktop.

#### support.mobileOS
##### device `String`
Returns the current mobile device identificator, can be "fire", "android", "iphone", "ipad", "meego", "webos", "blackberry", "playbook", "winphone", "windows".

##### tablet `String` *(default: false)*
Returns the current tablet identificator or false if the current device is not a tablet, can be "fire", "ipad", "playbook" or false.

##### browser `String` *(default: "default")*
Returns the current browser identificator or "default" if the browser is the native one, can be "omini", "omobile", "firefox", "mobilesafari", "webkit", "ie", "default".

##### name `String`
Returns the current os name identificator, can be "ios", "android", "blackberry", "windows", "webos", "meego". For convenience a property with the os name is also initialized,
for instance:

    if (kendo.support.mobileOS.android) {
        // Do something in Android
    }

##### majorVersion `String`
The current OS major version, e.g. "5" in iOS 5.1.

##### minorVersion `String`
The current OS minor versions, e.g. "1.1" in iOS 5.1.1.

##### flatVersion `Number`
A convenience property to allow easier version checks, for instance:

    var os = kendo.support.mobileOS;
    if (os.ios && os.flatVersion >= 400 && os.flatVersion < 500) {
        // Do something in iOS 4.x
    }

##### appMode `Boolean`
Returns true if running in application mode - pinned to desktop in iOS or running in PhoneGap/WebView.

## Standard number formats

*n* - number
    kendo.culture("en-US");
    kendo.toString(1234.567, "n"); //1,234.57

    kendo.culture("de-DE");
    kendo.toString(1234.567, "n3"); //1.234,567

*c* - currency
    kendo.culture("en-US");
    kendo.toString(1234.567, "c"); //$1,234.57

    kendo.culture("de-DE");
    kendo.toString(1234.567, "c3"); //1.234,567 €

*p* - percentage (the value is multiplied by 100)
    kendo.culture("en-US");
    kendo.toString(0.222, "p"); //22.20 %

    kendo.culture("de-DE");
    kendo.toString(0.22, "p3"); //22.000 %

*e* - exponential
    kendo.toString(0.122, "e"); //1.22e-1
    kendo.toString(0.122, "e4"); //1.2200e-1

## Custom number formats

Custom number formats can be created by using one or more custom numeric specifiers.

### Format Specifiers

#### *0* - zero placeholder

Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string.
    kendo.toString(1234.5678, "00000"); // 01235

#### *#* - digit placeholder

Replaces the pound sign with the corresponding digit if one is present; otherwise, no digit appears in the result string.
    kendo.toString(1234.5678, "#####"); // 1235

#### *.* - decimal placeholder

Determines the location of the decimal separator in the result string.
    kendo.tostring(0.45678, "0.00"); // 0.46

#### *,* - group separator placeholder
Inserts a group separator between each group of digits.
    kendo.tostring(12345678, "##,#"); // 12,345,678

#### *%* - percentage placeholder
Multiplies a number by 100 and inserts a the percentage symbol (according to the current culture) in the result string.

#### *e* - exponential notation
    kendo.toString(0.45678, "e0"); // 5e-1

#### *;* - section separator

Defines sections of separate format strings for positive, negative, and zero numbers.

#### *"string"|'string'* - literal string
Indicates literal strings which should be included in the result verbatim.

## Standard date formats

#### *d* - short date pattern
    kendo.toString(new Date(2000, 10, 6), "d"); // 11/6/2000

#### *D* - long date pattern
    kendo.toString(new Date(2000, 10, 6), "D"); // Monday, November 06, 2000

#### *F* - full date/time pattern
    kendo.toString(new Date(2000, 10, 6), "F"); // Monday, November 06, 2000 12:00:00 AM

#### *g* - general date/time pattern (short time)
    kendo.toString(new Date(2000, 10, 6), "g"); // 11/6/2000 12:00 AM

#### *G* - general date/time pattern (long time)
    kendo.toString(new Date(2000, 10, 6), "G"); // 11/6/2000 12:00:00 AM

#### *m|M* - month/day pattern
    kendo.toString(new Date(2000, 10, 6), "m"); // November 06

#### *u* - universal sortable date/time pattern
    kendo.toString(new Date(2000, 10, 6), "u"); // 2000-11-06 00:00:00Z

#### *y|Y* - month/year pattern
    kendo.toString(new Date(2000, 10, 6), "y"); // November, 2000

## Custom date formats
Custom date formats can be created by using one or more custom date specifiers.

### Format Specifiers

#### *d* - the day of the month, from 1 to 31

#### *dd* - the zero-padded day of the month - from 01 to 31

#### *ddd* - the abbreviated name of the day of the week

#### *dddd* - the full name of the day of the week

#### *f* - the tenths of a second

#### *ff* - the hundreds of a second

#### *fff* - the milliseconds

#### *M* - the month, from 1 to 12

#### *MM* - the zero-padded month, from 01 to 12

#### *MMM* - the abbreviated name of the month

#### *MMMM* - the full name of the month

#### *h* - the hour, using 12-hour clock - from 1 to 12

#### *hh* - the zero-padded hour, using 12-hour clock - from 01 to 12

#### *H* - the hour, using 24-hour clock - from 0 to 23

#### *HH* - the zero-padded hour, using 24-hour clock - from 00 to 23

#### *m* - the minute, from 0 to 59

#### *mm* - the zero-padded minute, from 00 to 59

#### *s* - the second, from 00 to 59

#### *ss* - the zero-padded second, from 00 to 59

#### *tt* - the AM/PM designator

### unbind

Unbinds a tree of HTML elements from a View-Model.
#### Example
    kendo.unbind($("body"));
#### Parameters
##### element `String|jQuery|Node`

The root element(s) from which the unbinding starts. Can be a valid jQuery string selector, a DOM element or a jQuery object.
All child elements are traversed.


<a name="Color"></a>
## Color objects

These objects can be used to manipulate colors.  You cannot instantiate a
`Color` object directly, instead you should use `kendo.parseColor` or one of
the functions below:

    var red = kendo.Color.fromRGB(1, 0, 0, 1);
    var blue = kendo.Color.fromBytes(0, 0, 255, 1);
    var green = kendo.Color.fromHSV(120, 1, 1, 1);

We support three color representations: as RGB (where the values are float
numbers between 0 and 1), as Bytes (where values are integers between 0 and
255) or as [HSV](http://en.wikipedia.org/wiki/HSL_and_HSV).  They all
support transparency via the last argument, a float between 0 and 1.  If
missing it will default to 1 (fully opaque).

If you are not certain which representation is used internally for a
particular color object, you can convert it to the one you need using one of
the methods below.

### Methods

#### toHSV

Returns the color in HSV representation.  As HSV object, it has the
following properties:

- `h` -- hue, an integer between 0 and 360
- `s` -- saturation, floating point between 0 and 1
- `v` -- value, floating point between 0 and 1
- `a` -- alpha, floating point between 0 and 1

This does not modify the current object, it creates a new one instead.

#### toRGB

Returns the color in RGB representation.  The result has the following
properties:

- `r` -- red component as floating point between 0 and 1
- `g` -- green component
- `b` -- blue component
- `a` -- alpha

This does not modify the current object, it creates a new one instead.

#### toBytes

Returns the color in "Bytes" representation.  It has the same properties as
RGB, but `r`, `g` and `b` are integers between 0 and 255 instead of floats.

This does not modify the current object, it creates a new one instead.

#### toHex

Returns a string in `"FF0000"` form (without a leading `#`).

#### toCss

Like `toHex`, but includes a leading `#`.

#### toCssRgba

Returns the color in RGBA notation (includes the opacity).

#### toDisplay

Returns the color in the best notation supported by the current browser.  In
IE < 9 this returns the `#FF0000` form; in all other browsers it returns the
RGBA form.

#### equals

Returns `true` if two colors are identical.

##### Parameters

###### other `Color`

This can also be a `String` parse-able with `kendo.parseColor`.

### Examples

    color = kendo.parseColor("rgba(255, 0, 0, 1)");

    color = color.toHSV();
    console.log(color.h, color.s, color.v, color.a);

    color = color.toRGB(); // floating point values 0..1
    console.log(color.r, color.g, color.b, color.a);

    color = color.toBytes(); // bytes (0..255)
    console.log(color.r, color.g, color.b, color.a);

    console.log(color.equals("#f00")); // true
    console.log(color.equals("rgb(255, 0, 0)")); // true
    console.log(color.equals(kendo.Color.fromHSV(0, 1, 1)); // true

    color.g = 255; // current representation is Bytes
    console.log(color.equals("#ff0")); // true
