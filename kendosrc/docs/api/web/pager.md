---
title: kendo.ui.Pager
meta_title: Configuration, methods and events of Kendo UI Pager
meta_description: Configuration steps for the Pager widget and methods for different actions: return number of pages, page size, specified page, update all values.
slug: api-web-pager
relatedDocs: gs-web-pager-overview
tags: api,web
publish: true
---

# kendo.ui.Pager

Represents the Kendo UI Pager widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### autoBind `Boolean`*(default: true)*
Indicates whether the pager refresh method will be called within its initialization.

### buttonCount `Number`*(default: 10)*
Defines the number of buttons displayed in the numeric pager.

### dataSource `Object|kendo.data.DataSource`
Instance of kendo DataSource. See the [**kendo.data.DataSource**](http://docs.kendoui.com/api/framework/datasource).

This option is mandatory because the Pager is tightly connected with DataSource. The pager is UI widget for managing paging over the DataSource. The Pager gets values like page size or total count of items from DataSource.

#### Example - standalone pager
    $("#pager").kendoPager({
        dataSource: new kendo.data.DataSource({
            data: [
                {title: "Star Wars: A New Hope", year: 1977},
                {title: "Star Wars: The Empire Strikes Back", year: 1980}
            ],
            pageSize: 25
        });
        pageSizes: [10, 25, 50]
    });

If the Pager is used with another widget then we usually specify this Pager like object of options for given widget. In that case the DataSource is automaticaly injected to the Pager from the widget. See example for a Grid below.

#### Example - grid pager
    $("#grid").kendoGrid({
        dataSource: sharedDataSource,
        columns: [
            {field: "name", title: "Name"},
            {field: "year", title: "Birth Date"}
        ],
        pageable: {
            // we don't set any DataSource here
            pageSizes: [10, 25, 50]
        }
    });

### selectTemplate `String`
The template for selectbox with predefined page sizes.

#### Example
    $("#pager").kendoPager({
        dataSource: sharedDataSource,
        selectTemplate: '<li><span class="k-state-selected">#=text#</span></li>'
    });

### linkTemplate `String`
The template for page number links.

#### Example
    $("#pager").kendoPager({
        dataSource: sharedDataSource,
        linkTemplate: '<li><a href="\\#" class="k-link" data-#=ns#page="#=idx#">#=text#</a></li>'
    });

### info `Boolean`*(default: true)*
Defines if a label showing current paging information will be displayed.

### input `Boolean`*(default: false)*
Defines if an input element which allows the user to navigate to given page will be displayed.

### numeric `Boolean`*(default: true)*
Defines if numeric portion of the pager will be shown.

### pageSizes `Boolean|Array` *(default: false)*
Displays a list with predefined page sizes. An array of values to be displayed can be provided. If pageSize option is provided for DataSource then this pageSize value will be automaticaly selected in created selectbox.

### previousNext `Boolean`*(default: true)*
Defines if buttons for navigating to the first, last, previous and next pages will be shown.

### refresh `Boolean`*(default: false)*
Defines if a refresh button will be displayed. Click on that button will call DataSource read() method to get actual data.

### messages `Object`
Defines texts shown within the pager.

#### Example
    $("#pager").kendoPager({
        dataSource: sharedDataSource,
        messages: {
            display: "{0} - {1} of {2} items",
            empty: "No items to display",
            page: "Page",
            of: "of {0}",
            itemsPerPage: "items per page",
            first: "Go to the first page",
            previous: "Go to the previous page",
            next: "Go to the next page",
            last: "Go to the last page",
            refresh: "Refresh"
        }
    });

### messages.display `String`*(default: "{0} - {1} of {2} items")*
Defines the info text.

### messages.empty `String`*(default: "No items to display")*,
Defines the info text shown when there are no records to be displayed.

### messages.page `String`*(default: "Page")*,
Defines the first part of the text of the input option.

### messages.of `String`*(default: "of {0}")*,
Defines the last part of the text of the input option.

### messages.itemsPerPage `String`*(default: "items per page")*,
Defines the text displayed after the select element of the pageSizes mode.

### messages.first `String`*(default: "Go to the first page")*,
Defines the text of the first page button tooltip.

### messages.previous `String`*(default: "Go to the previous page")*,
Defines the text of the previous page button tooltip.

### messages.next `String`*(default: "Go to the next page")*,
Defines the text of the next page button tooltip.

### messages.last `String`*(default: "Go to the last page")*,
Defines the text of the last page button tooltip.

### messages.refresh `String`*(default: "Refresh")*,
Defines the text of the refresh button tooltip.

## Methods

### totalPages
Returns the number of pages.

### pageSize
Returns the page size - maximum number of items allowed on one page.

### page
Set the specified page as a current page. If called without arguments - returns the current page.

#### Example - get current page
    var currentPage = pager.page();

#### Example - set current page
    pager.page(2);

### refresh
Updates all values of pager elements so that these values fit the values of DataSource. This method is automaticaly called after DataSource change event is fired.

### destroy
Unbinds all callbacks created within pager initialization. This method doesn't remove pager element from DOM.


## Events

### change
Fires when the current page has changed.
