---
title: kendo.data.Node
meta_title: API Reference for Kendo Data Node
meta_description: Documentation how to get started with the Node, the extended type of DataModel. Find examples and guidelines for methods, fields and events of kendo.data.Node.
slug: api-framework-node
tags: api,framework
publish: true
---

# kendo.data.Node

The `Node` is an extended type of [Model](/api/framework/model) that works with hierarchical data.
The [HierarchicalDataSource](/api/framework/hierarchicaldatasource) contains only instances of `Node`.

## Fields

See the [Model fields](/api/framework/model#fields) for all inherited fields.

### children

The child HierarchicalDataSource of the Node. This field is initialized lazily, if the `hasChildren` field is set,
or when the load or append methods have been called.

## Methods

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### append

Appends a new item to the children datasource, and initializes the datasource, if necessary.

#### Parameters

##### model `Object`

The data for the new item

### level

Gets the current nesting level of the Node within the HierarchicalDataSource.

    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1, text: "Root", items: [
                { id: 2, text: "Child" }
            ] }
        ]
    });

    dataSource.read();

    var root = dataSource.get(1);
    equals(root.level(), 0);

    root.load(); // Load child nodes

    var child = dataSource.get(2);
    equals(child.level(), 1);

### load

Loads the child nodes in the child datasource, supplying the `id` of the Node to the request.

### loaded

Gets or sets the loaded flag of the Node. Setting the loaded flag to `false` allows reloading of child items.

#### Reloading child items of a node

    var dataSource = new HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.kendoui.com/service/Employees",
                dataType: "json"
            }
        }
    });

    var ceo = dataSource.view()[0];

    ceo.load();

    ceo.loaded(false); // clear the loaded flag

    ceo.load(); // loads the data again

### parentNode

Gets the parent node of the Node, if any.

## Events

See the [Model events](/api/framework/model#events) for all inherited events.
