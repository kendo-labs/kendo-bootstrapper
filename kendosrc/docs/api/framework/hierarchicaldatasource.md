---
title: kendo.data.HierarchicalDataSource
meta_title: API Reference for Kendo UI Hierarchical DataSource
meta_description: Learn more about the configuration of Kendo UI DataSource, methods and events.
slug: api-framework-hierachicaldatasource
tags: api,framework
publish: true
---

# kendo.data.HierarchicalDataSource

## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration.

### schema `Object

The schema configuration of the HierarchicalDataSource.

### schema.model `Object`

The model configuration of the HierarchicalDataSource.

### schema.model.hasChildren `Boolean | String | Function` *(default: false)*

Specifies whether the model might have children and might be loaded. Applicable when the rendering of a
widget needs to have different states for items that have no children (e.g. the toggle button of the TreeView).

### schema.model.children `String | Object` *(default: "items")*

DataSource object or configuration for fetching child nodes. Through examples of that can be found
in the **Getting started** section above.

For static HierarchicalDataSource (local data), this field may be a `String`,
indicating which field holds the nested data.

#### Example

    var localDataSource = new kendo.data.HierarchicalDataSource({
        data: [ {
              categoryName: "SciFi",
              movies: [
                { title: "Star Wars: A New Hope", year: 1977 },
                { title: "Star Wars: The Empire Strikes Back", year: 1980 },
                { title: "Star Wars: Return of the Jedi", year: 1983 }
              ]
          }, {
              categoryName: "Drama",
              movies: [
                { title: "The Shawshenk Redemption", year: 1994 },
                { title: "Fight Club", year: 1999 },
                { title: "The Usual Suspects", year: 1995 }
              ]
          }
        ],
        schema: {
            model: {
                children: "movies"
            }
        }
    });

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

The **remove** and **getByUid** methods are overridden and work with the hierarchical data
(they will act on all child datasources that have been read).

## Events

See the [DataSource events](/api/framework/datasource#events) for all inherited events.

### change

Fires when data is changed. In addition to the [standard change event](/api/framework/datasource#change),
the HierarchicalDataSource includes additional data when the event has been triggered from a child
DataSource.

#### Event Data

##### e.node `kendo.data.Node`

If the event was triggered by a child datasource, this field holds a reference to the parent node.

