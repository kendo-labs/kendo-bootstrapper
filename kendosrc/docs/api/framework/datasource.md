---
title: kendo.data.DataSource
meta_title: Configuration, methods and events of the Kendo DataSource component.
meta_description: Easy to follow steps for DataSource component configuration, examples of supported methods and executed events.
slug: api-framework-datasource
tags: api,framework
publish: true
---

# kendo.data.DataSource

## Configuration

### aggregate `Array`

The aggregate(s) which are calculated when the data source populates with data. The supported aggregates are "average", "count", "max", "min" and "sum".

> The data source calculates aggregates client-side unless the [serverAggregates](#configuration-serverAggregates) option is set to `true`.

#### Example - specify aggregates

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" },
        { field: "age", aggregate: "min" },
        { field: "age", aggregate: "max" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
      console.log(results.sum, results.min, results.max); // displays "63 30 33"
    });
    </script>

### aggregate.aggregate `String`

The name of the aggregate function. Specifies the aggregate function. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - specify aggregate function

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
      console.log(results.sum); // displays "63"
    });

### aggregate.field `String`

The field which will be aggregated.

#### Example - specify aggregate field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
      console.log(results.sum); // displays "63"
    });
    </script>

### autoSync `Boolean` *(default: false)*

If set to `true` the data source would automatically [sync](#methods-sync) any changes to its data items. By default changes are not automatically sync-ed.

#### Example - enable auto sync
    <script>
    var dataSource = new kendo.data.DataSource({
      autoSync: true,
      transport: {
        read:  {
          url: "http://demos.kendoui.com/service/products",
          dataType: "jsonp" // JSONP is required for cross-domain requests
        },
        update: {
          url: "http://demos.kendoui.com/service/products/update",
          dataType: "jsonp" // JSONP is required for cross-domain requests
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20); // auto-syncs and makes request to http://demos.kendoui.com/service/products/update
    });
    </script>

### batch `Boolean` *(default: false)*

If set to `true` the data source will batch CRUD operation requests. For example updating two data items would cause one HTTP request instead of two during [sync](#methods-sync). By default the data source
makes a HTTP request for every CRUD operation.

> The changed data items are sent by default as `models`. This can be changed via the [parameterMap](#configuration-transport.parameterMap) option.

#### Example - enable batch mode
    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "http://demos.kendoui.com/service/products",
          dataType: "jsonp" //JSONP is required for cross-domain requests
        },
        update: {
          url: "http://demos.kendoui.com/service/products/update",
          dataType: "jsonp" //JSONP is required for cross-domain requests
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      var anotherProduct = dataSource.at(1);
      anotherProduct.set("UnitPrice", 20);
      dataSource.sync(); // causes only one request to "http://demos.kendoui.com/service/products/update"
    });
    </script>

### data `Array|String`

The array of data items. The data source will internally wrap them as [kendo.data.ObservableObject](/api/framework/obvservableobject).

Can be set to a string value if the [schema.type](#configuration-schema.type) option is set to "xml".

#### Example - set the data items of a data source

    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.fetch(function(){
      var janeDoe = dataSource.at(0);
      console.log(janeDoe.name); // displays "Jane Doe"
    });

#### Example - set the data items as an XML string
    <script>
    var dataSource = new kendo.data.DataSource({
      data: '<books><book id="1"><title>Secrets of the JavaScript Ninja</title></book></books>',
      schema: {
        // specify the the schema is XML
        type: "xml",
        // the XML element which represents a single data record
        data: "/books/book",
        // define the model - the object which will represent a single data record
        model: {
          // configure the fields of the object
          fields: {
            // the "title" field is mapped to the text of the "title" XML element
            title: "title/text()",
            // the "id" field is mapped to the "id" attribute of the "book" XML element
            id: "@cover"
          }
        }
      }
    });
    dataSource.fetch(function() {
      var books = dataSource.data();
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### filter `Array|Object`

The filter(s) which is (are) applied over the items when the data source populates with data. By default no filter is applied.

> The data source filters the data items client-side unless the [serverFiltering](#configuration-serverFiltering) option is set to `true`.

#### Example - set a single filter
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

#### Example - set filter as conjunction (and)
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      filter: [
        // leave data items which are "Beverage" and not "Coffee"
        { field: "category", operator: "eq", value: "Beverages" },
        { field: "name", operator: "neq", value: "Coffee" }
      ]
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Tea"
    });
    </script>

#### Example - set filter as disjunction (or)
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      filter: {
        // leave data items which are "Food" or "Tea"
        logic: "or",
        filters: [
          { field: "category", operator: "eq", value: "Food" },
          { field: "name", operator: "eq", value: "Tea" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
      console.log(view[1].name); // displays "Ham"
    });
    </script>

### filter.field `String`

The field to which the filter is applied.

#### Example - set the filter field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.operator `String`

The filter operator (comparison). The supported operators are: "eq" (equal to), "neq" (not equal to), "lt" (less than), "lte" (less than or equal to), "gt" (greater than), "gte" (greater than or equal to),
"startswith", "endswith", "contains". The last three are supported only for string fields.

#### Example - set the filter operator

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.value `Object`

The value to which the [field](#configuration-filter.field) is compared. The value must be from the same type as the field.

#### Example - specify the filter value
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", birthday: new Date(1983, 1, 1) },
        { name: "John Doe", birthday: new Date(1980, 1, 1)}
      ],
      filter: { field: "birthday", operator: "gt", value: new Date(1980, 1, 1) }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### group `Array|Object`

The grouping configuration of the data source. If set the data items will be grouped when the data source populates with data. By default grouping is not applied.

> The data source groups the data items client-side unless the [serverGrouping](#configuration-serverGrouping) option is set to `true`.

#### Example - set group as an object
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // group by the "category" field
      group: { field: "category" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "2"
      var beverages = view[0];
      console.log(beverages.value); // displays "Beverages"
      console.log(beverages.items[0].name); // displays "Tea"
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
      console.log(food.value); // displays "Food"
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

#### Example - set group as an array (subgroups)
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Pork", category: "Food", subcategory: "Meat" },
        { name: "Pepper", category: "Food", subcategory: "Vegetables" },
        { name: "Beef", category: "Food", subcategory: "Meat" }
      ],
      group: [
        // group by "category" and then by "subcategory"
        { field: "category" },
        { field: "subcategory" },
      ]
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      var food = view[0];
      console.log(food.value); // displays "Food"
      var meat = food.items[0];
      console.log(meat.value); // displays "Meat"
      console.log(meat.items.length); // displays "2"
      console.log(meat.items[0].name); // displays "Pork"
      console.log(meat.items[1].name); // displays "Beef"
      var vegetables = food.items[1];
      console.log(vegetables.value); // displays "Vegetables"
      console.log(vegetables.items.length); // displays "1"
      console.log(vegetables.items[0].name); // displays "Pepper"
    });
    </script>

### group.dir `String` *(default: "asc")*

The sort order of the group. The supported values are "asc" (ascending order) and "desc" (descending order). The default sort order is ascending.

#### Example - sort the groups in descending order
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages"},
        { name: "Ham", category: "Food"},
      ],
      // group by "category" in descending order
      group: { field: "category", dir: "desc" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var food = view[0];
      console.log(food.value); // displays "Food"
      var beverages = view[1];
      console.log(beverages.value); // displays "Beverages"
    });
    </script>

### group.field `String`

The field to group by.

#### Example - set the field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // group by the "category" field
      group: { field: "category" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
      console.log(beverages.items[0].name); // displays "Tea"
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

### group.aggregates `Array`

The aggregate(s) which are calculated during grouping. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - set group aggregates
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 },
      ],
      group: {
        field: "category",
        aggregates: [
          { field: "price", aggregate: "max" },
          { field: "price", aggregate: "min" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
      console.log(beverages.aggregates.price.max); // displays "2"
      console.log(beverages.aggregates.price.min); // displays "1"
      var food = view[1];
      console.log(food.aggregates.price.max); // displays "3"
      console.log(food.aggregates.price.min); // displays "3"
    });
    </script>

### group.aggregates.aggregate `String`

The name of the aggregate function. Specifies the aggregate function. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - specify aggregate function
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 }
      ],
      group: {
        field: "category",
        aggregates: [
          // calculate max price
          { field: "price", aggregate: "max" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### group.aggregates.field `String`

The field which will be aggregated.

#### Example - specify aggregate field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 }
      ],
      group: {
        field: "category",
        aggregates: [
          // calculate max price
          { field: "price", aggregate: "max" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### page `Number`

The page of data which the data source will return when the [view](#methods-view) method is invoked.

> The data source will page the data items client-side unless the [serverPaging](#configuration-serverPaging) option is set to `true`.

#### Example - set the current page

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // set the second page as the current page
      page: 2,
      pageSize: 2
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Ham"
    });
    </script>

### pageSize `Number`

The number of data items which a single page of data contains.

> The data source will page the data items client-side unless the [serverPaging](#configuration-serverPaging) option is set to `true`.

#### Example - set the page size

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      page: 1,
      // a page of data contains two data items
      pageSize: 2
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
      console.log(view[1].name); // displays "Coffee"
    });
    </script>

### schema `Object`

The description of the response returned by the remote service.

#### Example - specify the schema of the remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/twitter/search",
          dataType: "jsonp", // JSONP is required for cross-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: function(response) {
          return response.results; // twitter's response is { "results": [ /* results */ ] }
        }
      }
    });
    dataSource.fetch(function(){
      var data = this.data();
      console.log(data.length);
    });
    </script>

### schema.aggregates `Function|String`

The field from the server response which contains the aggregate results. If set to a function - the function will be called to
return the aggregate results from the response.

> The `aggregates` option is used only when the [serverAggregates](#configuration-serverAggregates) option is set to `true`.

The result of the function should be a JavaScript object which contains the aggregate results for every fields in the following format:

    {
      FIEL1DNAME: {
        FUNCTON1NAME: FUNCTION1VALUE,
        FUNCTON2NAME: FUNCTION2VALUE
      },
      FIELD2NAME: {
        FUNCTON1NAME: FUNCTION1VALUE
      }
    }

For example if the data source is configured like this:

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverAggregates: true,
      aggregate: [
        { field: "unitPrice", aggregate: "max" },
        { field: "unitPrice", aggregate: "min" },
        { field: "ProductName", aggregate: "count" }
      ]
    });
    </script>

The aggregate results should have the following format:

    {
      unitPrice: {
          max: 100,
          min: 1
      },
      productName: {
          count: 42
      }
    }

#### Example - set aggregates as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverAggregates: true,
      schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
      }
    });
    </script>

#### Example - set aggregates as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverAggregates: true,
      schema: {
        aggregates: function(response) {
          return response.aggregates;
        }
      }
    });
    </script>


### schema.data `Function|String`

The field from the server response which contains the data items. If set to a function - the function will be called to
return the data items for the response.

#### Returns

`Array` The data items from the response.

#### Example - specify the field which contains the data items as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/twitter/search",
          dataType: "jsonp", // JSONP is required for cross-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: "results" // twitter's response is { "results": [ /* results */ ] }
      }
    });
    dataSource.fetch(function(){
      var data = this.data();
      console.log(data.length);
    });
    </script>

#### Example - specify the field which contains the data items as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/twitter/search",
          dataType: "jsonp", // JSONP is required for cross-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: function(response) {
          return response.results; // twitter's response is { "results": [ /* results */ ] }
        }
      }
    });
    dataSource.fetch(function(){
      var data = this.data();
      console.log(data.length);
    });
    </script>

### schema.errors `Function|String` *(default: "errors")*

The field from the server response which contains server-side errors. If set to a function - the function will be called to
return the errors for response. If there are any errors the [error](#events-error) event will be fired.

#### Example - specify the error field as a string
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/twitter/search",
          dataType: "jsonp", // JSONP is required for cross-domain requests
          data: { q: "#" }
        }
      },
      schema: {
        errors: "error" // twitter's response is { "error": "Invalid query" }
      },
      error: function(e) {
        console.log(e.errors); // displays "Invalid query"
      }
    });
    dataSource.fetch();
    </script>

#### Example - specify the error field as a function
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/twitter/search",
          dataType: "jsonp", // JSONP is required for cross-domain requests
          data: { q: "#" }
        }
      },
      schema: {
        errors: function(response) {
          response.error; // twitter's response is { "error": "Invalid query" }
        }
      },
      error: function(e) {
        console.log(e.errors); // displays "Invalid query"
      }
    });
    dataSource.fetch();
    </script>

### schema.groups `Function|String`

The field from the server response which contains the groups. If set to a function - the function will be called to
return the groups from the response.

> The `groups` option is used only when the [serverGrouping](#configuration-serverGrouping) option is set to `true`.

The result should have the following format:

    [{
      aggregates: {
        FIEL1DNAME: {
          FUNCTON1NAME: FUNCTION1VALUE,
          FUNCTON2NAME: FUNCTION2VALUE
        },
        FIELD2NAME: {
          FUNCTON1NAME: FUNCTION1VALUE
        }
      },
      field: FIELDNAME, // the field by which the data items are grouped
      hasSubgroups: true, // true if there are subgroups
      items: [
        // either the subgroups or the data items
        {
          aggregates: {
            //nested group aggregates
          },
          field: NESTEDGROUPFIELDNAME,
          hasSubgroups: false,
          items: [
          // data records
          ],
          value: NESTEDGROUPVALUE
        },
        //nestedgroup2, nestedgroup3, etc.
      ],
      value: VALUE // the group key
    } /* other groups */
    ]

#### Example - set groups as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverGrouping: true,
      schema: {
        groups: "groups" // groups are returned in the "groups" field of the response
      }
    });
    </script>

#### Example - set groups as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverGrouping: true,
      schema: {
        groups: function(response) {
          return response.groups; // groups are returned in the "groups" field of the response
        }
      }
    });
    </script>

### schema.model `Object|kendo.data.Model`

The data item (model) configuration.

If set to an object the [Model.define](/api/framework/model#model.define) method will be used to initialize the data source model.

If set to an existing [kendo.data.Model](/api/framework/model) instance the data source will use that instance and will **not** initialize a new one.

#### Example - set the model as a JavaScript object

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "ProductID",
          fields: {
            ProductID: {
              //this field will not be editable (default value is true)
              editable: false,
              // a defaultValue will not be assigned (default value is false)
              nullable: true
            },
            ProductName: {
              //set validation rules
              validation: { required: true }
            },
            UnitPrice: {
              //data type of the field {Number|String|Boolean|Date} default is String
              type: "number",
              // used when new model is created
              defaultValue: 42,
              validation: { required: true, min: 1 }
            }
          }
        }
      }
    });
    </script>

#### Example - set the model as an existing kendo.data.Model instance

    <script>
    var Product = kendo.model.define({
      id: "ProductID",
      fields: {
        ProductID: {
          //this field will not be editable (default value is true)
          editable: false,
          // a defaultValue will not be assigned (default value is false)
          nullable: true
        },
        ProductName: {
          //set validation rules
          validation: { required: true }
        },
        UnitPrice: {
          //data type of the field {Number|String|Boolean|Date} default is String
          type: "number",
          // used when new model is created
          defaultValue: 42,
          validation: { required: true, min: 1 }
        }
      }
    });
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: Product
      }
    });
    </script>

### schema.parse `Function`

Executed before the server response is used. Appropriate for preprocessing or parsing of the server response.

#### Example - data projection

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/products",
          dataType: "jsonp"
        }
      },
      schema: {
        parse: function(response) {
          var products = [];
          for (var i = 0; i < response.length; i++) {
            var product = {
              id: response[i].ProductID,
              name: response[i].ProductName
            };
            products.push(product);
          }
          return products;
        }
      }
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
      var product = data[0];
      console.log(product.name); // displays "Chai"
    });
    </script>

### schema.total `Function|String`

The field from the server response which contains the total number of data items. If set to a function - the function will be called to
return the total number of data items for the response.

> If `schema.total` is not specified the `length` of the `Array` returned by [schema.data](#configuration-schema.data) will be used.

The `schema.total` option must be specified when the [serverPaging](#configuration-serverPaging) option is set to `true`.

#### Returns

`Number` The total number of data items.

#### Example: set total as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverGrouping: true,
      schema: {
        total: "total" // total is returned in the "total" field of the response
      }
    });
    </script>

#### Example: set total as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverGrouping: true,
      schema: {
        total: function(response) {
          return response.total; // total is returned in the "total" field of the response
        }
      }
    });
    </script>

### schema.type `String` *(default: "json")*

The type of the response. The supported values are "xml" and "json". By default the schema interprets the server response as JSON.

#### Example - use XML data
    <script>
    var dataSource = new kendo.data.DataSource({
      data: '<books><book id="1"><title>Secrets of the JavaScript Ninja</title></book></books>',
      schema: {
        // specify the the schema is XML
        type: "xml",
        // the XML element which represents a single data record
        data: "/books/book",
        // define the model - the object which will represent a single data record
        model: {
          // configure the fields of the object
          fields: {
            // the "title" field is mapped to the text of the "title" XML element
            title: "title/text()",
            // the "id" field is mapped to the "id" attribute of the "book" XML element
            id: "@cover"
          }
        }
      }
    });
    dataSource.fetch(function() {
      var books = dataSource.data();
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### serverAggregates `Boolean` *(default: false)*

If set to `true` the data source will leave the aggregate calculation to the remote service. By default the data source calculates aggregates client-side.

> Don't forget to set [schema.aggreagates](#configuration-schema.aggregates) if you set `serverAggregates` to `true`.

#### Example - enable server aggregates

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverAggregates: true,
      aggregate: [
        { field: "age", aggregate: "sum" }
      ],
      schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
      }
    });
    </script>

### serverFiltering `Boolean` *(default: false)*

If set to `true` the data source will leave the filtering implementation to the remote service. By default the data source performs filtering client-side.

By default the [filter](#configuration-filter) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the filter `{ logic: "and", filters: [ { field: "name", operator: "startswith", value: "Jane" } ] }` is sent as:

*   filter[logic]: and
*   filter[filters][0][field]: name
*   filter[filters][0][operator]: startswith
*   filter[filters][0][value]: Jane

Use the [parameterMap](#configuration-transport.parameterMap) option to send the filter option in a different format.

#### Example - enable server filtering

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverFiltering: true,
      filter: { logic: "and", filters: [ { field: "name", operator: "startswith", value: "Jane" } ] }
    });
    </script>

### serverGrouping `Boolean` *(default: false)*

If set to `true` the data source will leave the grouping implementation to the remote service. By default the data source performs grouping client-side.

By default the [group](#configuration-group) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the group `{ field: "category", dir: "desc" }` is sent as:

*   group[0][field]: category
*   group[0][dir]: desc


Use the [parameterMap](#configuration-transport.parameterMap) option to send the group option in a different format.

#### Example - enable server grouping

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverGrouping: true,
      group: { field: "category", dir: "desc" }
    });
    </script>

### serverPaging `Boolean` *(default: false)*

If set to `true` the data source will leave the data item paging implementation to the remote service. By default the data source performs paging client-side.

> Don't forget to set [schema.total](#configuration-schema.total) if you set `serverPaging` to `true`.

The following options are sent to the server when server paging is enabled:

- page - the page of data item to return (`1` means the first page)
- pageSize - the number of items to return
- skip - how many data items to skip
- take - the number of data items to return (the same as `pageSize`)

Use the [parameterMap](#configuration-transport.parameterMap) option to send the paging options in a different format.

#### Example - enable server paging

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverPaging: true,
      schema: {
        total: "total" // total is returned in the "total" field of the response
      }
    });
    </script>

### serverSorting `Boolean` *(default: false)*

If set to `true` the data source will leave the data item sorting implementation to the remote service. By default the data source performs sorting client-side.

By default the [sort](#configuration-sort) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the sort `{ field: "age", dir: "desc" }` is sent as:

*   sort[0][field]: age
*   sort[0][dir]: desc

Use the [parameterMap](#configuration-transport.parameterMap) option to send the paging options in a different format.

#### Example - enable server sorting

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverSorting: true,
      sort: { field: "age", dir: "desc" }
    });
    </script>

### sort `Array|Object`

The sort order which will be applied over the data items. By the data items are not sorted.

#### Example - sort the data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
      console.log(data[0].age); // displays "33"
    });
    </script>

#### Example - sort the data items by multiple fields

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      sort: [
        // sort by "category" in descending order and then by "name" in ascending order
        { field: "category", dir: "desc" },
        { field: "name", dir: "asc" }
      ]
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
      console.log(data[1].name); // displays "Coffee"
    });
    </script>

### sort.field `String`

The field by which the data items are sorted.

#### Example - specify the sort field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      // order by "age" in descending order
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
      console.log(data[0].age); // displays "33"
    });
    </script>

### sort.dir `String`

The sort order (direction). The supported values are "asc" (ascending order) and "desc" (descending order).

#### Example - specify the sort order (direction)

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      // order by "age" in descending order
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
      console.log(data[0].age); // displays "33"
    });
    </script>

### transport `Object`

Specifies the settings for loading and saving data. This can be a remote or local/in-memory data.

### transport.create `Object|String|Function`

Options for remote create data operation, or the URL of the remote service.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

#### Example: Specify Create Options

    var dataSource = new kendo.data.DataSource({
        transport: {
            create: {
                url: "/orders/create",
                data: {
                    orderId: $("#input").val() // sends the value of the input as the orderId
                }
            }
        }
    });

#### Example: Specify Create As Function *(Note: transport methods should be consistent - read, update and destroy should be specified as functions too)*

    var dataSource = new kendo.data.DataSource({
        transport: {
            create: function(options) {
                // make AJAX request to the remote service

                $.ajax( {
                    url: "/orders/create",
                    data: options.data, // the "data" field contains paging, sorting, filtering and grouping data
                    success: function(result) {
                        // notify the DataSource that the operation is complete

                        options.success(result);
                    }
                });
            }
        }
    });

### transport.create.cache `Boolean`

If set to false, it will force requested pages not to be cached by the browser. Setting cache to false also appends a query string parameter, `"_=[TIMESTAMP]"`, to the URL.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            cache: false
        }
    }

### transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            contentType: "application/json"
        }
    }

### transport.create.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example: Specify Data As Object
    transport: {
        create: {
            data: {
                id: 42,
                name: "John Doe"
            }
        }
    }

#### Example: Specify Data As Function
    transport: {
        create: {
            data: function() {
                return {
                    id: 42,
                    name: "John Doe"
                };
            }
        }
    }

### transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            dataType: "json"
        }
    }

### transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            type: "POST"
        }
    }

### transport.create.url `String|Function`

The remote url to call when creating a new record.

#### Example
    transport: {
        create: {
            url: "/create"
        }
    }

#### Example: Specify Create URL As Function
    transport: {
        create: {
            url: function(params) {
                //build url
                return "url";
            }
        }
    }

### transport.destroy `Object|String|Function`

Options for remote destroy data operation, or the URL of the remote service.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

#### Example: Specify Destroy Options

    var dataSource = new kendo.data.DataSource({
        transport: {
            destroy: {
                url: "/orders/destroy",
                data: {
                    orderId: $("#input").val() // sends the value of the input as the orderId
                }
            }
        }
    });

#### Example: Specify Destroy As Function *(Note: transport methods should be consistent - read, create and update should be specified as functions too)*

    var dataSource = new kendo.data.DataSource({
        transport: {
            destroy: function(options) {
                // make AJAX request to the remote service

                $.ajax( {
                    url: "/orders/destroy",
                    data: options.data, // the "data" field contains paging, sorting, filtering and grouping data
                    success: function(result) {
                        // notify the DataSource that the operation is complete

                        options.success(result);
                    }
                });
            }
        }
    });

### transport.destroy.cache `Boolean`

If set to false, it will force requested pages not to be cached by the browser. Setting cache to false also appends a query string parameter, `"_=[TIMESTAMP]"`, to the URL.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            cache: false
        }
    }

### transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            contentType: "application/json"
        }
    }

### transport.destroy.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example: Specify Data As Object
    transport: {
        destroy: {
            data: {
                id: 42,
                name: "John Doe"
            }
        }
    }

#### Example: Specify Data As Function
    transport: {
        destroy: {
            data: function() {
                return {
                    id: 42,
                    name: "John Doe"
                };
            }
        }
    }

### transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            dataType: "json"
        }
    }

### transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            type: "POST"
        }
    }

### transport.destroy.url `String|Function`

The remote url to call when creating a new record.

#### Example
    transport: {
        destroy: {
            url: "/destroy"
        }
    }

#### Example: Specify Destroy URL As Function
    transport: {
        destroy: {
            url: function(params) {
                //build url
                return "url";
            }
        }
    }

### transport.parameterMap `Function`

Converts the request parameters and data from the internal format to a format suitable for the remote service.

#### Parameters

##### data `Object`

Contains key/value pairs that represent the request.

All key/value pairs specified in the `data` field of the transport settings (create, read, update or destroy) will be included as well.

If [batch](#batch-boolean-default) is set to `false` the fields of the changed model will be included.

One ore more of the following keys will be present (depending on the configuration and current request type):

- aggregate

    An object containing the current aggregate info. Present if there are any aggregates, [serverAggregates](#serverAggregates-booleandefault) is set to `true` and the type of the request is "read".

- group

    An object containing the current filter info. Present if the data source is grouped, [serverGrouping](#serverGrouping-booleandefault) is set to `true` and the type of request is "read".

- filter

    An object containing the current filter info. Present if the data source is filtered, [serverFiltering](#serverFiltering-booleandefault) is set to `true` and the type of request is "read".

- models

    An array of all changed models. Present if there are any changes and [batch](#batch-boolean-default) is set to `true`.

- page

    The current page. Present if [serverPaging](#serverpaging-booleandefault) is set to `true` and the type of request is "read".

- pageSize

    The current page size specified via [pageSize](#pagesize-numberdefault). Present if [serverPaging](#serverpaging-booleandefault) is set to `true` and the type of request is "read".

- skip

    A number indicating how many records to skip from the beginning (related to the current page). Present if [serverPaging](#serverpaging-booleandefault) is set to `true` and the type of request is "read".

- sort

    An array containing the current sorting info. Present if the data source is sorted, [serverSorting](#serverSorting-booleandefault) is set to `true` and the type of request is "read".

- take

    The same as `pageSize`. Present if [serverPaging](#serverpaging-booleandefault) is set to `true` the and the type of request is "read".


##### type `String`

The type of the request being made. One of the following values: "create", "read", "update", "destroy".

#### Example

    var dataSource = new kendo.data.DataSource({
         serverPaging: true,
         serverSorting: true,
         transport: {
           read: "Catalog/Titles",
           parameterMap: function(data, type) {
              return {
                 pageIndex: data.page,
                 size: data.pageSize,
                 orderBy: data.sort[0].field
              };
           }
         }
     });

> The `parameterMap` method is often used to encode the parameters in JSON format.

#### Example - sending the data source request as JSON

    var dataSource = new kendo.data.DataSource({
         transport: {
           read: "Catalog/Titles",
           parameterMap: function(data, type) {
              return kendo.stringify(data);
           }
         }
     });

### transport.read `Object|String|Function`

Options for remote read data operation, or the URL of the remote service.

> **Important:** The value of `transport.read` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

#### Example: Specify Read Options

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "/orders/read",
                data: {
                    orderId: $("#input").val() // sends the value of the input as the orderId
                }
            }
        }
    });

#### Example: Specify Read As Function *(Note: transport methods should be consistent - create, update and destroy should be specified as functions too)*

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function(options) {
                // make AJAX request to the remote service

                $.ajax( {
                    url: "/orders/read",
                    data: options.data, // the "data" field contains paging, sorting, filtering and grouping data
                    success: function(result) {
                        // notify the DataSource that the operation is complete

                        options.success(result);
                    }
                });
            }
        }
    });

### transport.read.cache `Boolean`

If set to false, it will force requested pages not to be cached by the browser. Setting cache to false also appends a query string parameter, `"_=[TIMESTAMP]"`, to the URL.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            cache: false
        }
    }

### transport.read.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            contentType: "application/json"
        }
    }

### transport.read.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example: Specify Data As Object
    transport: {
        read: {
            data: {
                id: 42,
                name: "John Doe"
            }
        }
    }

#### Example: Specify Data As Function
    transport: {
        read: {
            data: function() {
                return {
                    id: 42,
                    name: "John Doe"
                };
            }
        }
    }

### transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            dataType: "json"
        }
    }

### transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            type: "POST"
        }
    }

### transport.read.url `String|Function`

The remote url to call when creating a new record.

#### Example
    transport: {
        read: {
            url: "/read"
        }
    }

#### Example: Specify Read URL As Function
    transport: {
        read: {
            url: function(params) {
                //build url
                return "url";
            }
        }
    }

### transport.update `Object|String|Function`

Options for remote update data operation, or the URL of the remote service.

> **Important:** The value of `transport.update` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

#### Example: Specify Update Options

    var dataSource = new kendo.data.DataSource({
        transport: {
            update: {
                url: "/orders/update",
                data: {
                    orderId: $("#input").val() // sends the value of the input as the orderId
                }
            }
        }
    });

#### Example: Specify Update As Function *(Note: transport methods should be consistent - read, create and destroy should be specified as functions too)*

    var dataSource = new kendo.data.DataSource({
        transport: {
            update: function(options) {
                // make AJAX request to the remote service

                $.ajax( {
                    url: "/orders/update",
                    data: options.data, // the "data" field contains paging, sorting, filtering and grouping data
                    success: function(result) {
                        // notify the DataSource that the operation is complete

                        options.success(result);
                    }
                });
            }
        }
    });


### transport.update.cache `Boolean`

If set to false, it will force requested pages not to be cached by the browser. Setting cache to false also appends a query string parameter, `"_=[TIMESTAMP]"`, to the URL.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        update: {
            cache: false
        }
    }

### transport.update.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        update: {
            contentType: "application/json"
        }
    }

### transport.update.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example: Specify Data As Object
    transport: {
        update: {
            data: {
                id: 42,
                name: "John Doe"
            }
        }
    }

#### Example: Specify Data As Function
    transport: {
        update: {
            data: function() {
                return {
                    id: 42,
                    name: "John Doe"
                };
            }
        }
    }

### transport.update.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        update: {
            dataType: "json"
        }
    }

### transport.update.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        update: {
            type: "POST"
        }
    }

### transport.update.url `String|Function`

The remote url to call when creating a new record.

#### Example
    transport: {
        update: {
            url: "/update"
        }
    }

#### Example: Specify Update URL As Function
    transport: {
        update: {
            url: function(params) {
                //build url
                return "url";
            }
        }
    }

### type `String`

Loads transport with preconfigured settings. Currently supports only "odata" (Requires kendo.data.odata.js to be included).

## Methods

### add

Adds a new data item to the DataSource.

#### Example

    var model = kendo.data.Model.extend({
        id: "orderId",
        fields: {
            name: "customerName",
            description: "orderDescription",
            address: "customerAddress"
        }
    });
    // add a new model item to the data source.  If a model has not been declared as above, a new
    // model instance will be created for you.
    dataSource.add({ name: "John Smith", description: "Product Description", address: "123 1st Street" });

#### Parameters

##### model `Object|kendo.data.Model`

Either a [kendo.data.Model](/api/framework/model) instance or JavaScript object containing the field values.

#### Returns

`kendo.data.Model` The instance which has been added.

### aggregate

Get current aggregate descriptors or applies aggregates to the data.

#### Example

    dataSource.aggregate({ field: "orderId", aggregate: "sum" });

#### Parameters

##### val `Object|Array`

Aggregate(s) to be applied to the data.

#### Returns

`Array` Current aggregate descriptors

### aggregates

Get result of aggregates calculation

#### Example

    var aggr = dataSource.aggregates();

#### Returns

`Array` Aggregates result

### at

Returns the data item at the specified index.

#### Example

    // returns the 4th item in the collection
    var order = dataSource.at(3);

#### Parameters

##### index `Number`

The zero-based index of the data item.

#### Returns

`kendo.data.ObservableObject|kendo.data.Model` The type depends on the schema.

### cancelChanges

Cancel the changes made to the DataSource after the last sync. Any changes currently existing in the model
will be discarded.

#### Example: Cancel All Changes

    // we have updated 2 items and deleted 1. All of those changes will be discarded.
    dataSource.cancelChanges();

#### Example: Cancel Model Changes

    var model = dataSource.at(0);

    dataSource.cancelChanges(model);

#### Parameters

##### model `kendo.data.Model`

Optional model instance. If specified only the changes of this model will be discarded. If omitted all changes will be discarded.

### data

Gets or sets the data of the `DataSource`.

#### Parameters

##### value `Array`

An `Array` of items to set as the current data of the `DataSource`. If omitted the current data will be returned.

#### Returns

`kendo.data.ObservableArray` the items of the `DataSource`

#### Example: Getting the Data of a DataSource

    var data = dataSource.data();

    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        // use the dataItem
    }

#### Example: Setting the Data of a DataSource

    var data = [ { name: "John Doe" } ];
    dataSource.data(data);

### fetch

Fetches data using the current filter/sort/group/paging information.
If data is not available and remote operations are enabled data is requested through the transport,
otherwise operations are executed over the available data.

#### Example

    dataSource.fetch();

#### Parameters

##### callback `Function` *(optional)*

Optional callback which will be executed when the data is ready.

### filter

Get current filters or filter the data.

_Supported filter operators/aliases are_:


#### *Equal To*

"eq", "==", "isequalto", "equals", "equalto", "equal"

#### *Not Equal To*

"neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "ne"

#### *Less Then*

"lt", "<", "islessthan", "lessthan", "less"

#### *Less Then or Equal To*

"lte", "<=", "islessthanorequalto", "lessthanequal", "le"

#### *Greater Then*

"gt", ">", "isgreaterthan", "greaterthan", "greater"

#### *Greater Then or Equal To*

"gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"

#### *Starts With*

"startswith"

#### *Ends With*

"endswith"

#### *Contains*

"contains", "substringof"

#### Example

    dataSource.filter({ field: "orderId", operator: "eq", value: 10428 });
    dataSource.filter([
         { field: "orderId", operator: "neq", value: 42 },
         { field: "unitPrice", operator: "ge", value: 3.14 }
    ]);

    // returns data where orderId is equal to 10248 or customerName starts with Paul
    dataSource.filter({
        logic: "or",
        filters: [
          { field: "orderId", operator: "eq", value: 10248 },
          { field: "customerName", operator: "startswith", value: "Paul" }
        ]
    });

#### Parameters

##### filters `Object|Array`

Filter(s) to be applied to the data.

#### Returns

`Array` The current filter descriptors.

### get

Retrieves a model instance by given id.

#### Example

    var order = dataSource.get(1); // retrieves the "order" model item with an id of 1

#### Parameters

##### id `Number|String`

The id of the model to be retrieved. The id of the model is defined via `schema.model.id`.

#### Returns

`kendo.data.Model` the model instance. If not found `undefined` is returned.

### getByUid

Retrieves a data item by its [uid](/api/framework/observableobject#uid) field.

#### Example
    var uid = $("tr").data("uid");

    var order = dataSource.getByUid(uid);
#### Parameters

##### uid `String`

The uid of the item to be retrieved

#### Returns

`kendo.data.ObservableObject` or `kendo.data.Model` (if `schema.model` is set). If not found `undefined` is returned.

### group

Get current group descriptors or group the data.

#### Example

    dataSource.group({ field: "orderId" });

#### Parameters

##### groups `Object|Array`

Group(s) to be applied to the data.

#### Returns

`Array` The current group descriptors.

### hasChanges `Boolean`

Get if DataSource has changes.

#### Returns

`Boolean` True if DataSource records are modified. Otherwise, false.

### indexOf

Get the index of the specified `kendo.data.ObservableObject` or `kendo.data.Model`.

#### Returns

`Number` the index of the specified value.

#### Parameters

##### value `kendo.data.ObservableObject`

#### Example

    var item = dataSource.at(0);

    dataSource.indexOf(item); // returns 0

### insert

Inserts a new data item in the DataSource.

#### Example

    dataSource.insert(0, { name: "John Smith", age: 42 });

#### Parameters

##### index `Number`

The zer-based index at which the data item will be inserted

##### model `Object|kendo.data.Model`

Either a [kendo.data.Model](/api/framework/model) instance or JavaScript object containing the field values.

#### Returns

`kendo.data.Model` The instance which has been inserted.

### page

Get/set the current page index.

#### Example

    dataSource.page(2);

#### Parameters

##### page `Number`

The index of the page to be retrieved

#### Returns

`Number` Current page index

### pageSize

Get/set the current pageSize or request a page with specified number of records.

#### Example

    dataSource.pageSize(25);

#### Parameters

##### size `Number`

The of number of records to be retrieved.

#### Returns

`Number` Current page size

### query

Executes a query over the data. Available operations are paging, sorting, filtering, grouping.
If data is not available or remote operations are enabled, data is requested through the transport.
Otherwise operations are executed over the available data.

#### Example

    // create a view containing at most 20 records, taken from the
    // 5th page and sorted ascending by orderId field.
    dataSource.query({ page: 5, pageSize: 20, sort: { field: "orderId", dir: "asc" } });

    // moves the view to the first page returning at most 20 records
    // but without particular ordering.
    dataSource.query({ page: 1, pageSize: 20 });

#### Parameters

##### options `Object` *(optional)*

Contains the settings for the operations.

### read

Read data into the DataSource using the `transport.read` setting.

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "orders.json";
        }
    });

    // the datasource will not contain any data until read is called

    dataSource.read();

#### Parameters

##### data `Object` *(optional)*

Optional data to pass to the remote service configured via `transport.read`.

### remove

Remove a given `kendo.data.Model` instance from the DataSource.

#### Example

    var first = dataSource.get(1);

    dataSource.remove(first);

#### Parameters

##### model `Object`

The [kendo.data.Model](/api/framework/model) instance to be removed.

### sort

Get current sort descriptors or sorts the data.

#### Example

    dataSource.sort({ field: "orderId", dir: "desc" });
    dataSource.sort([
         { field: "orderId", dir: "desc" },
         { field: "unitPrice", dir: "asc" }
    ]);

#### Parameters

##### sort `Object|Array`

Sort options to be applied to the data

#### Returns

`Array` the current sort descriptors.

### sync

Synchronizes changes through the transport. Any pending CRUD operations will be sent to the server.
If the DataSource is in **batch** mode, only one call will be made for each type of operation (Create, Update, Destroy).
Otherwise, the DataSource will send one request per item change and change type.

#### Example

    // we have deleted 2 items and updated 1. If not in batch mode, this will send three commands to the server - two Destroy and one Update.
    dataSource.sync();

### total

Get the total number of data items.

#### Example

    var total = dataSource.total();

#### Returns

`Number` the number of data items.

### totalPages

Get the number of available pages.

#### Example

    var pages = dataSource.totalPages();

#### Returns

`Number` the available pages.

### view

Returns a the current state of the data items - with applied paging, sorting, filtering and grouping.

To ensure that data is available this method should be use from within `change` event of the DataSource.

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "orders.json"
        }
        change: function(e) {
           // create a template instance
           var template = kendo.template($("#template").html());
           // render a view by passing the data to a template
           kendo.render(template, dataSource.view());
        }
    });

#### Returns

`kendo.data.ObservableArray` the data items.

## Events

### change

Fires when data is changed or read from the transport.

#### Example

    var dataSource = new kendo.data.DataSource({
        change: function(e) {
            // handle event
        }
    });

#### To set after initialization

    dataSource.bind("change", function(e) {
        // handle event
    });

### error

Fires when an error occurs during data read or sync.

> **Important**: If `schema.errors` is specified and the server response contains that field then the `error` event will be raised. The
`errors` field of the event argument will contain the errors returned by the server.

#### Example

    var dataSource = new kendo.data.DataSource({
        error: function(e) {
            // handle event
        }
    });

#### To set after initialization

    dataSource.bind("error", function(e) {
        // handle event
    });

#### Event Data

###### e.xhr `Object`

The jqXHR object

###### e.status

String describing the type of the error

###### e.errorThrown

An optional exception object.

### sync

Fires after changes are synced.

#### Example

    var dataSource = new kendo.data.DataSource({
        sync: function(e) {
            // handle event
        }
    });

#### To set after initialization

    dataSource.bind("sync", function(e) {
        // handle event
    });


### requestStart

Fires when data request is to be made.

#### Example

    var dataSource = new kendo.data.DataSource({
        requestStart: function(e) {
            // handle event
        }
    });

#### To set after initialization

    dataSource.bind("requestStart", function(e) {
        // handle event
    });

#### Event Data

##### e.sender `kendo.data.DataSource`

Reference to the dataSource object instance.

### requestEnd

Fires when a data request is received. Raised after a Create, Read, Update or Destroy request is performed.

#### Example

    var dataSource = new kendo.data.DataSource({
        requestEnd: function(e) {
            // handle event
        }
    });

#### To set after initialization

    dataSource.bind("requestEnd", function(e) {
        // handle event
    });

#### Event Data

##### e.response `Object`

The raw data received from the server.

##### e.type `String`

The type of the request. Set to `"create"`, `"read"`, `"update"`or `"destroy"`.

## Class methods

### create

Creates a DataSource instance from the passed options. Useful for parsing the dataSource configuration option when creating new widgets.

#### Returns

`kendo.data.DataSource` The created DataSource.

#### Parameters

##### options `Object`

A key/value pair of the DataSource options.

#### Example - parsing the dataSource configuration option in a custom widget

    this.dataSource = kendo.data.DataSource.create(this.options.dataSource);

