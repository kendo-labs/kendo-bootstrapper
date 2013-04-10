---
title: kendo.mobile.ui.ListView
meta_title: Configuration, methods and events of Kendo UI Mobile ListView
meta_description: How to display flat or grouped list of items with Kendo UI Mobile ListView widget and use events to handle button clicks and access dataItem.
slug: api-mobile-listview
relatedDocs: gs-mobile-listview
tags: api,mobile
publish: true
---

# kendo.mobile.ui.ListView

Represents the Kendo UI Mobile ListView widget. Inherits from [kendo.mobile.ui.Widget](/api/framework/mobilewidget).

## Configuration

### appendOnRefresh `Boolean`*(default: false)*

 Used in combination with pullToRefresh. If set to true, newly loaded data will be appended on top when refershing.

### autoBind `Boolean`*(default: true)*

 Indicates whether the listview will call read on the DataSource initially.

### dataSource `kendo.data.DataSource | Object`

Instance of DataSource or the data that the mobile ListView will be bound to.

### endlessScroll `Boolean`*(default: false)*

 If set to true, the listview gets the next page of data when the user scrolls near the bottom of the view.

### endlessScrollParameters `Function`

 A callback function used when the 'endlessScroll' option is enabled. The result of the function will be send as additional parameters to the DataSource's next method.

#### Example

    $("#pull-with-endless").kendoMobileListView({
        dataSource: dataSource,
        endlessScroll: true,
        endlessScrollParameters: function(firstItem, lastItem) {
            if (firstItem) {
                //additional parameters
                return {
                    max_id: firstItem.id_str
                };
            }
        }
    });

#### Parameters

##### firstItem `Object`

First dataItem of the first loaded page of the ListView. It will not change, even if 'pull-to-refresh' is used.

##### lastItem  `Object`

Last dataItem of the first loaded page of the ListView.

### fixedHeaders `Boolean`*(default: false)*

 If set to true, the group headers will persist their position when the user scrolls through the listview. Applicable only when the type is set to group, or when binding to grouped datasource.

### headerTemplate `String`*(default: "#:value#")*

 The header item template (applicable when the type is set to group).

### loadMore `Boolean`*(default: false)*

 If set to true, a button is rendered at the bottom of the listview, which fetch the next page of data when tapped.

### loadMoreText `String`*(default: "Press to load more")*

 The text of the rendered load-more button (applies only if loadMore is set to true).

### loadMoreParameters `Function`

 Check the 'endlessScrollParameters' option.

### pullTemplate `String`*(default: "Pull to refresh")*

 The message template displayed when the user pulls the listView. Applicable only when pullToRefresh is set to true.

### pullToRefresh `Boolean`*(default: false)*

 If set to true, the listview will reload its data when the user pulls the view over the top limit.

### pullParameters `Function`

 A callback function used when the 'pullToRefresh' option is enabled. The result of the function will be send as additional parameters to the DataSource's next method.

#### Example

    $("#pull-with-endless").kendoMobileListView({
        dataSource: dataSource,
        appendOnRefresh: true,
        pullToRefresh: true,
        pullParameters: function(item) {
            //additional parameters
            return {
                since_id: item.id_str,
                page: 1
            };
        }
    });

#### Parameters

##### item `Object`

First dataItem of the ListView // => listView.dataSource.get(0);

### refreshTemplate `String`*(default: "Refreshing")*

 The message template displayed during the refresh. Applicable only when pullToRefresh is set to true.

### releaseTemplate `String`*(default: "Release to refresh")*

 The message template indicating that pullToRefresh will occur. Applicable only when pullToRefresh is set to true.

### scrollTreshold `String`*(default: 30)*

 The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.

### style `String`

The style of the control. Can be either empty string(""), or inset.

### template `String`*(default: "#:data#")*

 The item template.

#### Example:

    <div id="foo" data-role="view">
        <ul id="list" data-role="listview" data-source="dataSource" data-template="tmp"></ul>
    </div>

    <script id="tmp" type="text/x-kendo-template">
        <p>#: name # <span>Age: #: age #</span></p>
    </script>
    
    <script>
        var app = new kendo.mobile.Application();
        var dataSource = new kendo.data.DataSource({
            data: [
                { name: "Jane Doe", age: 30 },
                { name: "John Doe", age: 33 }
            ]
        });
    </script>

> The ListView automatically wraps the template content in `<li>` tag. Putting a `<li>` tag inside the template creates invalid nesting of elements.

### type `String`

The type of the control. Can be either `flat` (default) or group. Determined automatically in databound mode.

### filterable `Boolean | Object`*(default: false)*

Indicates whether the filter input must be visible or not. 

### filterable.placeholder `String`*(default: "Search...")*

Placeholder text for search input.

### filterable.autoFilter `Boolean`*(default: true)*

Indicates whether filtering should be performed on every key up event or not.

### filterable.field `String`

Specifies the field which will be used in the filter expression.

### filterable.ignoreCase `Boolean`*(default: false)*

Specifies whether the filter expression must be case sensitive or not.

### filterable.operator `String`*(default: "startsWith")*

Specifies the comparison operator used in the filter expression.

## Methods

### destroy
Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

#### Example

    var listView = $("#listView").data("kendoMobileListView");

    // detach events
    listView.destroy();

### items

Get the listview DOM element items

#### Returns

`jQuery` The listview DOM element items

### refresh

repaints the listview (works only in databound mode).

#### example

    // get a reference to the mobile listview widget
    var listview = $("#listview").data("kendomobilelistview");
    // refreshes the listview
    listview.refresh();

### setDataSource

Sets the dataSource of an existing ListView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    var dataSource = new kendo.data.DataSource({
        //dataSource configuration
    });

    $("#listview").data("kendoMobileListView").setDataSource(dataSource);

### stopEndlessScrolling

Stops the 'endless scroll' of the ListView.

#### example

    // get a reference to the mobile listview widget
    var listview = $("#listview").data("kendomobilelistview");
    // stop endless scroll
    listview.stopEndlessScrolling();

### stopLoadMore

Stops the 'load more' functionality of the ListView.

#### example

    // get a reference to the mobile listview widget
    var listview = $("#listview").data("kendomobilelistview");
    // stop endless scroll
    listview.stopLoadMore();

## Events

### click

Fires when item is tapped.

#### Example

    <ul data-role="listview" id="foo" data-click="listViewClick">
        <li>Item 1</li>
		<li>Item 2</li>
    </ul>

    <script>
     function listViewClick(e) {
         console.log(e.item); // The clicked item as a jQuery object
     }
    </script>

#### Accessing dataItem in event

    <ul id="foo"></ul>

    <script>
     $("#foo").kendoMobileListView({
        dataSource: new kendo.data.DataSource({
             data:   [{title: "foo"}, {title: "bar"}]
        }),

        click: function(e) {
             console.log(e.dataItem.title);
        }
     });
    </script>

#### Event Data

##### e.item `jQuery`

The selected list item.

##### e.target `jQuery`

The tapped DOM element.

##### e.dataItem `Object`

The corresponding dataItem associated with the item (available in databound mode only).
Note: The dataItem must be from a non-primitive type (Object).

##### e.button `kendo.mobile.ui.Button`

The tapped Kendo mobile Button (if present).

### dataBound

Fires when the ListView has received data from the data source.

#### Example

     $("#listview").kendoMobileListView({
         dataBound: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the grid
     var listview = $("#listview").data("kendoMobileListView");
     // bind to the dataBound event
     listview.bind("dataBound", function(e) {
         // handle event
     });

### dataBinding

Fires when the ListView is about to be rendered.

#### Example

     $("#listview").kendoMobileListView({
         dataBinding: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the ListView
     var listview = $("#listview").data("kendoMobileListView");
     // bind to the dataBound event
     listview.bind("dataBinding", function(e) {
         // handle event
     });

### lastPageReached

Fires when the last page of the ListView is reached. Event will be raised only if the 'endless scroll' or 'load more' option is enabled.
