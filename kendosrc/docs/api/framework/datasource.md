---
title: kendo.data.DataSource
meta_title: Configuration of DataSource component in Kendo UI framework
meta_description: Easy to follow steps for DataSource component configuration, examples of supported methods and executed events.
slug: api-framework-datasource
tags: api,framework
publish: true
---

# kendo.data.DataSource

## Configuration

### aggregate `Array | Object`*(default: undefined)*

 Sets fields on which initial aggregates should be calculated

### aggregate.field `String`

 Specifies the field on which the aggregate will be calculated.

### aggregate.aggregate `String`

 Specifies the aggregate function. Possible values are: "min", "max", "count", "sum", "average"

#### Example

    // calculates total sum of unitPrice field's values.
    [{ field: "unitPrice", aggregate: "sum" }]

### autoSync `Boolean` *(default: false)*

Enables (*true*) or disables (*false*) the automatic invocation of the sync() method for each change made.

### batch `Boolean` *(default: false)*

Enables (*true*) or disables (*false*) batch mode.

### data `Array`

Specifies the local JavaScript object to use for the data source.

#### Example: Bind the DataSource to a JavaScript Array

    var orders = [ { orderId: 10248, customerName: "Paul Smith" }, { orderId: 10249, customerName: "Jane Jones" }];
    var dataSource = new kendo.data.DataSource({
         data: orders
    });

### filter `Array | Object`*(default: undefined)*

 Sets the initial filter.

### filter.operator `String`

 Specifies the filter operator. One of the following values "eq", "neq", "lt", "lte", "gt", "gte", "startswith", "endswith", "contains".

### filter.field `String`

 Specifies the field to filter by.

### filter.value `Object`

 Specifies the value to filter for.

#### Example

    // returns only data where orderId is equal to 10248
    filter: { field: "orderId", operator: "eq", value: 10248 }

    // returns only data where orderId is equal to 10248 and customerName starts with Paul
    filter: [ { field: "orderId", operator: "eq", value: 10248 },
              { field: "customerName", operator: "startswith", value: "Paul" } ]

    // returns data where orderId is equal to 10248 or customerName starts with Paul
    filter: {
        logic: "or",
        filters: [
          { field: "orderId", operator: "eq", value: 10248 },
          { field: "customerName", operator: "startswith", value: "Paul" }
        ]
    }

### group `Array | Object`*(default: undefined)*

 Sets initial grouping

### group.field `String`

 Specifies the field to group by.

### group.dir `String`

 Specifies the order of the groupped items.

### group.aggregates `Array`

 Specifies the aggregate function for this group.

### group.aggregates.field `String`

 Specifies the field on which the aggregate will be calculated.

### group.aggregates.aggregate `String`

 Specifies the aggregate function. Possible values are: "min", "max", "count", "sum", "average"

#### Example

    // groups data by orderId field
    group: { field: "orderId" }

    // groups data by orderId and customerName fields
    group: [ { field: "orderId", dir: "desc" }, { field: "customerName", dir: "asc" } ]

### page `Number`*(default: undefined)*

 Sets the index of the displayed page of data.

#### Example

    var dataSource = new kendo.data.DataSource({
        page: 2 // displays the second page of data in the bound widget
    });

### pageSize `Number`*(default: undefined)*

 Sets the number of records which contains a given page of data.

#### Example

    var dataSource = new kendo.data.DataSource({
        pageSize: 5 // 5 records per page of data
    });

### schema `Object`

Set the object responsible for describing the raw data format.

#### Example

    var dataSource = new kendo.data.DataSource({
         transport: {
             read: "Catalog/Titles",
         },
         schema: {
             errors: function(response) {
                return response.errors;
             },
             aggregates: function(response) {
                response.aggregates;
             },
             data: function(response) {
                 return response.data;
             },
             total: function(response) {
                 return response.totalCount;
             },
             parse: function(response) {
                 return response.data;
             }
         }
    });

### schema.aggregates `Function|String`

Specifies the field from the response which contains the aggregate results. If set to a function - the function will be called to
return the aggregate results for the current response.

Result should have the following format:

    {
      FIEL1DNAME: {
          FUNCTON1NAME: FUNCTION1VALUE,
          FUNCTON2NAME: FUNCTION2VALUE
      },
      FIELD2NAME: {
          FUNCTON1NAME: FUNCTION1VALUE
      }
    }

i.e.

    {
      unitPrice: {
          max: 100,
          min: 1
      },
      productName: {
          count: 42
      }
    }

#### Example: Aggregates As a String

    schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
    }

#### Example: Aggregates As a Function

    schema: {
        aggregates: function(response) {
            return response.aggregates;
        }
    }

### schema.data `Function|String`

Specifies the field from the response which contains the data items. If set to a function - the function will be called to
return the data items for the current response.

#### Returns

`Array` The data items from the response.

#### Example: Data As a String

    schema: {
        data: "items" // data items are returned in the "items" field of the response
    }

#### Example: Data As a Function

    schema: {
        data: function(response) {
            return response.items;
        }
    }

### schema.errors `Function|String` *(default: "errors")*

Specifies the field from the response which contains any errors. If set to a function - the function will be called to
return the errors for the current response (if present). If there are any errors the `error` event of the DataSource will be raised.

#### Example: Errors As a String

    schema: {
        errors: "exceptions" // errors are returned in the "exceptions" field of the response
    }

#### Example: Errors As a Function

    schema: {
        errors: function(response) {
            return response.errors;
        }
    }

### schema.groups `Function|String`

Specifies the field from the response which contains the groups. If set to a function - the function will be called to
return the groups for the current response.

Used instead of the `schema.data` setting if remote grouping operation is executed.

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
      field: FIELDNAME, // the field name on which is grouped
      hasSubgroups: true, // false if there are not sub group items and this is the top most group
      items: [
      // either the inner group items (if hasSubgroups is true) or the data records
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
      value: VALUE // value of the field on which is grouped
    }
    // group2, group3, etc.
    ]

#### Example: Groups As a String

    schema: {
        groups: "groups" // groups are returned in the "groups" field of the response
    }

#### Example: Groups As a Function

    schema: {
        groups: function(response) {
            return response.groups;
        }
    }

### schema.model `Object|kendo.data.Model`

Describes the `Model` of the `DataSource`. If set to `Object` the `Model.define` method will be used to create the model. Check the documentation of
 [Model.define](/api/framework/model#model.define) for the available configuration options.

#### Example: Specify Model Definition In-line

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
                             validation: { //set validation rules
                                 required: true
                             }
                         },
                         UnitPrice: {
                           //data type of the field {Number|String|Boolean|Date} default is String
                           type: "number",
                           // used when new model is created
                           defaultValue: 42,
                           validation: {
                               required: true,
                               min: 1
                           }
                       }
                   }
               }
           }
       });

#### Example: Specify Existing Model

    var Product = kendo.data.Model.define({
        id: "ProductID",
        fields: {
             ProductID: {
                //this field will not be editable (default value is true)
                editable: false,
                // a defaultValue will not be assigned (default value is false)
                nullable: true
             },
             ProductName: {
                 validation: { //set validation rules
                     required: true
                 }
             },
             UnitPrice: {
               //data type of the field {Number|String|Boolean|Date} default is String
               type: "number",
               // used when new model is created
               defaultValue: 42,
               validation: {
                   required: true,
                   min: 1
               }
           }
       }
    });

    var dataSource = new kendo.data.DataSource({
        schema: {
            model: Product // Use the existing Product model
        }
    });

### schema.parse `Function`

Executed before the server response is used. Appropriate for preprocessing or parsing of the server response.

#### Example: Specify Parse Function

    schema: {
        parse: function(response) {
            // perform some processing over the response

            return processResponse(response);
        }
    }

#### Example: One-way data projection

    parse: function(response) {
        for (var i = 0; i < response.length; i++) {
            response[i].lowerFoo = response[i].foo.toLowerCase();
        }

        return response;
    }

### schema.total `Function|String`

Specifies the field from the response which contains the total number of data items. If set to a function - the function will be called to
return the total number of data items for the current response.

#### Returns

`Number` The total number of data items.

#### Example: Total As a String

    schema: {
        total: "count" // total number of data items is returned in the "count" field of the response
    }

#### Example: Data As a Function

    schema: {
        total: function(response) {
            return response.items.length;
        }
    }

> **Note:** If `schema.total` is not specified the `length` of the `Array` returned by `schema.data` will be used.

### schema.type `String` *(default: "json")*

Specify the type of the response - XML or JSON. The only supported values are `"xml"` and `"json"`.

#### Example: Specify XML Type
    schema: {
        type: "xml"
    }

### serverAggregates `Boolean`*(default: false)*

Determines if aggregates are calculated on the server or not. By default aggregates are calculated client-side.

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "/orders"
        },
        serverAggregates: true,
        aggregate: { field: "orderId", operator: "eq", value: 10248 } // return only data where orderId equals 10248
    });

> **Important:** When `serverAggregates` is set to `true` the developer is responsible for calculating the aggregate results.

### serverFiltering `Boolean`*(default: false)*

Determines if filtering of the data is handled on the server. By default filtering is performed client-side.

> **Important:** When `serverFiltering` is set to `true` the developer is responsible for filtering the data.

By default, a filter object is sent to the server with the query string in the following form:

*   filter[logic]: and
*   filter[filters][0][field]: orderId
*   filter[filters][0][operator]: desc
*   filter[filters][0][value]: 10248

Possible values for **operator** include:

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

"contains"

It is possible to modify these parameters by using the `parameterMap` function found in the [transport](#transport-object).

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "/orders"
        },
        serverFiltering: true,
        filter: { field: "orderId", operator: "eq", value: 10248 } // return only data where orderId equals 10248
    });

### serverGrouping `Boolean`*(default: false)*

Determines if grouping of the data is handled on the server. By default grouping is performed client-side.

> **Important:** When `serverGrouping` is set to `true` the developer is responsible for grouping the data.

By default, a group object is sent to the server with the query string in the following form:

*   group[0][field]: orderId
*   group[0][dir]: desc


It is possible to modify these parameters by using the `parameterMap` function found on the [transport](#transport-object).

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "/orders"
        },
        serverGrouping: true,
        sort: { field: "orderId", dir: "asc" } // group by orderId descending
    });

### serverPaging `Boolean`*(default: false)*

Determines if paging of the data is on the server. By default paging is performed client-side. If `serverPaging` is enabled the
total number of data items should also be returned in the response. Use the `schema.total` setting to customize that.

> **Important:** When `serverPaging` is set to `true` the developer is responsible for paging the data.

The following options are sent to the server as part of the query string by default:

#### *take*

contains the number of records to retreive

#### *skip*

how many records from the front of the dataset to begin reading

#### *page*

the index of the current page of data

#### *pageSize*

the number of records per page

It is possible to modify these parameters by using the `parameterMap` function found on the [transport](#transport-object).

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "/orders"
        },
        serverPaging: true,
        pageSize: 5 // 5 records per page
    });

### serverSorting `Boolean`*(default: false)*

Determines if sorting of the data should is handled on the server. By default sorting is performed client-side.

> **Important:** When `serverSorting` is set to `true` the developer is responsible for sorting the data.

By default, a sort object is sent to the server with the query string in the following form:

*   sort[0][field]: orderId
*   sort[0][dir]: asc

It is possible to modify these parameters by using the `parameterMap` function found on the [transport](#transport-object).

#### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: "/orders"
        },
        serverSorting: true,
        sort: { field: "orderId", dir: "asc" }
    });

### sort `Array | Object`*(default: undefined)*

 Sets initial sort order

### sort.field `String`

 Sets the field to sort on.

### sort.dir `String`

 Sets the sort direction. Possible values are: "asc", "desc", null. If null is set, the sort expression is removed.

#### Example

    // sorts data ascending by orderId field
    sort: { field: "orderId", dir: "asc" }

    // sorts data ascending by orderId field and then descending by shipmentDate
    sort: [ { field: "orderId", dir: "asc" }, { field: "shipmentDate", dir: "desc" } ]

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

`kendo.data.ObservableObject | kendo.data.Model` The type depends on the schema.

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

##### sort `Object | Array`

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

