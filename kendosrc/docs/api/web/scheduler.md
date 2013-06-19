---
title: kendo.ui.Scheduler
meta_title: Configuration, methods and events of Kendo UI Scheduler
meta_description: How to configure and control methods in Scheduler UI widget, which events to use to open, close, change, select.
slug: api-web-scheduler
relatedDocs: gs-web-scheduler-overview
tags: api,web
publish: true
---

# kendo.ui.Scheduler

Represents the Kendo UI Scheduler widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### allDayEventTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the "all day" scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* isAllDay `Boolean` - if true the event is "all day"
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

#### Example - set the all day event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      allDayEventTemplate: $("#event-template").html(),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          isAllDay: true,
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### allDaySlot `Boolean` *(default: true)*

If set to `true` the scheduler will display a slot for "all day" events.

#### Example - hide the all day slot
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      allDaySlot: false,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.SchedulerDataSource`

The data source of the widget which contains the scheduler events. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.SchedulerDataSource](/api/framework/schedulerdatasource) instance the widget will use that instance and will **not** initialize a new one.

> The Kendo UI Scheduler widget can be bound *only* to a `kendo.data.SchedulerDataSource`. An exception will be thrown if the `dataSource` option is set to a `kendo.data.DataSource` instance.

#### Example - set dataSource as a JavaScript object

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: {
        batch: true,
        transport: {
          read: {
            url: "http://demos.kendoui.com/service/tasks",
            dataType: "jsonp"
          },
          update: {
            url: "http://demos.kendoui.com/service/tasks/update",
            dataType: "jsonp"
          },
          create: {
            url: "http://demos.kendoui.com/service/tasks/create",
            dataType: "jsonp"
          },
          destroy: {
            url: "http://demos.kendoui.com/service/tasks/destroy",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
              return {models: kendo.stringify(options.models)};
            }
          }
        },
        schema: {
           model: {
             id: "ID",
             fields: {
               ID: { type: "number" },
               title: { field: "Title", defaultValue: "No title", validation: { required: true } },
               start: { type: "date", field: "Start" },
               end: { type: "date", field: "End" },
               description: { field: "Description" },
               recurrence: { field: "Recurrence" },
               ownerId: { field: "OwnerID", defaultValue: 1 },
               isAllDay: { type: "boolean", field: "IsAllDay" }
             }
           }
         }
      }
    });

#### Example - set dataSource as a JavaScript array

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.SchedulerDataSource instance

    <input id="autocomplete" />
    <script>
    var dataSource = new kendo.data.SchedulerDataSource({
      transport: {
        read: {
          url: "http://demos.kendoui.com/service/tasks",
          dataType: "jsonp"
        }
      }
    });
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: dataSource
    });
    </script>

### date `Date`

The current date of the scheduler. Used to determine the period which is displayed by the widget.

#### Example - set the date of the scheduler

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ]
    });
    </script>

### dateHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the date header cells.

By default the scheduler renders the date using the current culture date format.

The fields which can be used in the template are:

* date - represents the major tick date.

#### Example - set the date header template
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable `Boolean|Object` *(default: true)*

If set to `true` the user would be able to create new scheduler events and modify or delete existing ones.

#### Example - disable editing
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Breakfast"
        }
      ],
      editable: false
    });
    </script>

### editable.confirmation `Boolean|String` *(default: true)*

If set to `true` the scheduler will display a confirmation dialog when the user clicks the "destroy" button.

Can be set to a string which will be used as the confirmation text.

#### Example - disable delete confirmation
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        confirmation: false
      },
      views: [
        {
          type: "day"
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - set delete confirmation text

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        confirmation: "Are you sure you want to delete this meeting?"
      },
      views: [
        {
          type: "day"
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.create `Boolean` *(default: true)*

If set to `true` the user can create new events. Creating is enabled by default.

#### Example - disable event creating
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        create: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.

#### Example - disable event deleting
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        destroy: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use [MVVM](/getting-started/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/getting-started/data-attribute-initialization) for more info.

#### Example - customize the popup editor

    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input name="title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" name="start" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" name="end" /></label>
       </p>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        template: $("#editor").html()
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

#### Example - using MVVM in the popup editor template
    <script id="editor" type="text/x-kendo-template">
       <h3>Edit meeting</h3>
       <p>
           <label>Title: <input data-bind="value: title" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" data-bind="value: start" /></label>
       </p>
       <p>
           <label>Start: <input data-role="datetimepicker" data-bind="value: end" /></label>
       </p>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        template: $("#editor").html()
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `true` the user can update events. Updating is enabled by default.

#### Example - disable event updating
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      editable: {
        update: false
      },
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### eventTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

#### Example - set the event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      eventTemplate: $("#event-template").html(),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### height `Number|String`

The height of the widget. Numeric values are treated as pixels.

#### Example - set the height of the scheduler
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      height: 500,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### majorTick `Number` *(default: 60)*

The number of minutes represented by a major tick.

#### Example - set the major tick

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      majorTick: 120, // a major tick represents 120 minutes (2 hours)
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### majorTimeHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the major ticks.

By default the scheduler renders the time using the current culture time format.

The fields which can be used in the template are:

* date - represents the major tick date.

#### Example - set the major time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      majorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'h')#</strong><sup>00</sup>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### minorTickCount `Number` *(default:2)*

The number of time slots to display per major tick.

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      minorTickCount: 1, // display one time slot per major tick
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### minorTimeHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the minor ticks.

By default the scheduler renders a `"&nbsp;"`.

The fields which can be used in the template are:

* date - represents the major tick date.

#### Example - set the minor time header template
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      minorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 't')#</strong>"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### resources `Array`

The configuration of the scheduler resource(s). A scheduler resource is optional metadata that can be associated
with a scheduler event.

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.

#### Example - set the resource data color field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataColorField: "key",
          dataSource: [
            { text: "Small meeting room", value: 1, key: "#aabbcc" },
            { text: "Big meeting room", value: 2, key: "green" }
          ]
        }
      ]
    });
    </script>

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/framework/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/framework/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/framework/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set the resource data source

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.

#### Example - set the resource data text field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataTextField: "room",
          dataSource: [
            { room: "Small meeting room", value: 1 },
            { room: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.dataValueField `String` *(default: "value")*

The field of the resource data item which represents the resource value. The resource value is used to link a scheduler event with a resource.

#### Example - set the resource data value field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose roomId is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose roomId is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataValueField: "roomId"
          dataSource: [
            { text: "Small meeting room", roomId: 1 },
            { text: "Big meeting room", roomId: 2 }
          ]
        }
      ]
    });
    </script>

### resources.field `String`

The field of the scheduler event which contains the resource id.

#### Example - specify the resource field

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.multiple `Boolean` *(default: false)*

If set to `true` the scheduler event can be assigned multiple instances of the resource. The scheduler event field specified via the [field](#configuration-resources.field) option will contain an array of resources.
By default only one resource instance can be assigned to an event.

#### Example - multiple resources

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1,
          atendees: [2, 3] // the resource instances with value 2 and 3 (Bob and Charlie)
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2,
          atendees: [1, 2] // the resource instances with value 1 and 2 (Alex and Bob)
        }
      ],
      resources: [
        {
          field: "roomId",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        },
        {
          field: "atendees",
          multiple: true,
          dataSource: [
            { text: "Alex", value: 1 },
            { text: "Bob", value: 2 },
            { text: "Charlie", value: 3 }
          ]
        }
      ]
    });
    </script>

### resources.title `String`

The user friendly title of the resource displayed in the scheduler edit form. If not set the value of the [field](#configuration-resources.field) option is used.

#### Example - set the resource title

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          roomId: 1 // the event is held in "Small meeting room" whose value is 1
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          roomId: 2 // the event is held in "Big meeting room" whose value is 2
        }
      ],
      resources: [
        {
          field: "roomId",
          title: "Room",
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### resources.valuePrimitive `Boolean` *(default: true)*

Set to `false` if the scheduler event field specified via the [field](#configuration-resources.field) option contains a resource data item.
By default the scheduler expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via `dataValueField`).

#### Example - set valuePrimitive to false

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          room: { value: 1 } // the resource field is an object instead of a primitive value
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting",
          room: { value: 2 } // the resource field is an object instead of a primitive value
        }
      ],
      resources: [
        {
          field: "room",
          valuePrimitive: false,
          dataSource: [
            { text: "Small meeting room", value: 1 },
            { text: "Big meeting room", value: 2 }
          ]
        }
      ]
    });
    </script>

### views `Array`

The views displayed by the scheduler and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
By default the Kendo UI Scheduler widget displays "day" and "week" view.

#### Example - set views as array of strings

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ], // day and month views
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

#### Example - set views as array of objects

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "day" },
        { type: "month" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });
    </script>

### views.allDayEventTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the "all day" scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

> The `allDayEventTemplate` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the all day event template
    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          allDayEventTemplate: $("#event-template").html()
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          isAllDay: true,
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### views.allDaySlot `Boolean` *(default: true)*

If set to `true` the scheduler will display a slot for "all day" events.

> The `allDaySlot` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - hide the all day slot
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          allDaySlot: false
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.dateHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the date header cells.

By default the scheduler renders the date using the current culture date format.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `dateHeaderTemplate` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the date header template
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.dayTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the day slots in month view.

The fields which can be used in the template are:

* date `Date` - represents the current day

> The `dayTemplate` option is supported when [views.type](#configuration-views.type) is set to "month".

#### Example - set the day template in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          dayTemplate: kendo.template("<strong>#= kendo.toString(date, 'ddd') #</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable `Boolean|Object` *(default: true)*

If set to `true` the user would be able to create new scheduler events and modify or delete existing ones.

Overrides the [editable](#configuration-editable) option of the scheduler.

#### Example - disable view editing

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: false
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.create `Boolean` *(default: true)*

If set to `true` the user can create new events. Creating is enabled by default.

#### Example - disable event creating
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            create: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.

#### Example - disable event deleting
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            destroy: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.editable.update `Boolean` *(default: true)*

If set to `true` the user can update events. Updating is enabled by default.

#### Example - disable event updating
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          editable: {
            update: false
          }
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.endTime `Date`

The end time of the view. The scheduler will display events ending before the `endTime`.

#### Example - set the end time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          startTime: new Date("2013/6/6 08:00"),
          endTime: new Date("2013/6/6 18:00")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.eventDateTemplate

The [template](/api/framework/kendo#methods-template) used by the agenda view to render the date of the scheduler events.

The fields which can be used in the template are:

* date `Date` - represents the event date.

> The `eventDateTemplate` option is supported when [views.type](#configuration-views.type) is set to "agenda".

#### Example - set the event date template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "agenda",
          eventDateTemplate: kendo.template("<strong>#= kendo.toString(date, 'dd-MM-yyyy')#</strong>")
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.eventHeight `Number` *(default: 25)*

The height of the scheduler event rendered in month view.

> The `eventHeight` option is supported when [views.type](#configuration-views.type) is set to "month".

#### Example - set the event height in month view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "month",
          eventHeight: 40
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      height: 1000
    });
    </script>

### views.eventTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used by the view to render the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

#### Example - set the event template

    <script id="event-template" type="text/x-kendo-template">
      <div>Title: #: title #</div>
      <div>Atendees:
          # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
          # } #
      </div>
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          eventTemplate: $("#event-template").html()
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
           { value: 1, text: "Alex" },
           { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
    </script>

### views.eventTimeTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used by the agenda view to render the time of the scheduler events.

The fields which can be used in the template are:

* description `String` - the event description
* end `Date` - the event end date
* isAllDay `Boolean` - if true the event is "all day"
* resources `Array` - the event resources
* start `Date` - the event start date
* title `String` - the event title

> The `eventTimeTemplate` option is supported when [views.type](#configuration-views.type) is set to "agenda".

#### Example - set the event time template
    <script id="event-time-template" type="text/x-kendo-template">
      # if (isAllDay) { #
         All day
      # } else { #
         #= kendo.toString(start, "t") # - #= kendo.toString(end, "t") #
      # }  #
    </script>
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "agenda",
          eventTimeTemplate: $("#event-time-template").html(),
        }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.majorTick `Number` *(default: 60)*

The number of minutes represented by a major tick.

> The `majorTick` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the major tick

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          majorTick: 120 // a major tick represents 120 minutes (2 hours)
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.majorTimeHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the major ticks.

By default the scheduler renders the time using the current culture time format.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `majorTimeHeaderTemplate` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the major time header template

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          majorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'h')#</strong><sup>00</sup>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.minorTickCount `Number` *(default:2)*

The number of time slots to display per major tick.

> The `minorTickCount` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the number of time slots

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          minorTickCount: 1 // display one time slot per major tick
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.minorTimeHeaderTemplate `String|Function`

The [template](/api/framework/kendo#methods-template) used to render the minor ticks.

By default the scheduler renders a `"&nbsp;"`.

The fields which can be used in the template are:

* date - represents the major tick date.

> The `minorTimeHeaderTemplate` option is supported when [views.type](#configuration-views.type) is set to "day" or "week".

#### Example - set the minor time header template
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          minorTimeHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 't')#</strong>")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.selectedDateFormat `String`

The format used to display the selected date. Uses [kendo.format](/api/framework/kendo#methods-format).

Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.

#### Example - set the selectedDateFormat
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          selectedDateFormat: "{0:dd-MM-yyyy}"
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.startTime `Date`

The start time of the view. The scheduler will display events starting after the `startTime`.

#### Example - set the start time

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          startTime: new Date("2013/6/6 08:00"),
          endTime: new Date("2013/6/6 18:00")
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.title `String`

The user-friendly title of the view displayed by the scheduler.

#### Example - set the view title
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        {
          type: "day",
          title: "Today",
        },
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### views.type `String`

The type of the view. The built-in views are: "day", "week", "month" and "agenda".

#### Example - set the view type

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [
        { type: "day" }
      ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

### width `Number|String`

The width of the widget. Numeric values are treated as pixels.

#### Example - set the width of the scheduler
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      width: 500,
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    </script>

## Fields

### dataSource `kendo.data.SchedulerDataSource`

The [data source](/api/framework/schedulerdatasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.dataSource.add( {
      start: new Date("2013/6/6 08:00 AM"),
      end: new Date("2013/6/6 09:00 AM"),
      title: "Interview"
    });
    </script>

#### Example - update a data item in the data source
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var event = scheduler.dataSource.at(0);
    event.set("end", new Date("2013/6/6 10:00 AM"));
    </script>

#### Example - remove a data item from the data source
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var event = scheduler.dataSource.at(0);
    scheduler.dataSource.remove(event);
    </script>

## Methods

### addEvent

Adds a new scheduler event and opens the edit form.

#### Parameters

##### data `Object`

The object containing the scheduler event fields.

#### Example - add a new event
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.addEvent({ title: "(No title)" });
    </script>

### cancelEvent

Cancels the scheduler event editing. Closes the edit form.

#### Example - cancel editing
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.addEvent({ title: "(No title)" });
    scheduler.cancelEvent();
    </script>

### date

Gets or sets the current scheduler date.

#### Parameters

##### value `Date` *(optional)*

The new date to set.

#### Returns

`Date` the current date.

#### Example - set the current date

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.date(new Date("2013/6/6"));
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.destroy();
    </script>

### editEvent

Opens the specified scheduler event in the edit form.

#### Parameters

##### event `String|kendo.data.SchedulerEvent`

The event which should be put in edit mode. Also accepts a string which is the `uid` of the event which should be edited.

#### Example - edit an event
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var event = scheduler.dataSource.at(0);
    scheduler.editEvent(event);
    </script>

### removeEvent

Removes the specified scheduler event.

#### Parameters

##### event `String|kendo.data.SchedulerEvent`

The event which should be removed. Also accepts a string which is the `uid` of the event which should be removed.

#### Example - remove an event
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var event = scheduler.dataSource.at(0);
    scheduler.removeEvent(event);
    </script>

### saveEvent

Saves the scheduler event which is open in the edit form and closes it.

#### Example - save an new event
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.addEvent({ title: "(No title)" });
    scheduler.saveEvent();
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.SchedulerDataSource`

The data source to which the widget should be bound.

#### Example - set the data source
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6")
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    var dataSource = new kendo.data.SchedulerDataSource({
      data: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    scheduler.setDataSource(dataSource);
    </script>

### view

Gets or sets the current scheduler view.

#### Parameters

##### type `String` *(optional)*

The view type to select.

#### Returns

`kendo.ui.SchedulerView` the current scheduler view.

#### Example - set the current view

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.view("month");
    </script>

## Events

### remove

Fired when the user clicks the "destroy" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.event `kendo.data.SchedulerEvent`

The event which is being removed.

##### e.preventDefault `Function`

If invoked prevents the remove action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      remove: function(e) {
        console.log("Removing", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_remove(e) {
      console.log("Removing", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("remove", scheduler_remove);
    </script>

### edit

Fired when the user opens a scheduler event in edit mode by or creates a new event.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is being edited.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      edit: function(e) {
        console.log("Editing", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_edit(e) {
      console.log("Editing", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("edit", scheduler_edit);
    </script>

### cancel

Fired when the user cancels editing by clicking the "cancel" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is no longer in edit mode.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The scheduler event remains in edit mode.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      cancel: function(e) {
        console.log("Cancelling", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_cancel(e) {
      console.log("Cancelling", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("cancel", scheduler_cancel);
    </script>

### save

Fired when the user saves a scheduler event by clicking the "save" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object representing the container element. That element contains the editing UI.

##### e.event `kendo.data.SchedulerEvent`

The event which is saved.

##### e.preventDefault `Function`

If invoked prevents the save action.

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "save" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      save: function(e) {
        console.log("Saving", e.event.title);
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_save(e) {
      console.log("Saving", e.event.title);
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("save", scheduler_save);
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "dataBinding" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      dataBinding: function(e) {
        console.log("dataBinding"));
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_dataBinding(e) {
        console.log("dataBinding"));
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("dataBinding", scheduler_dataBinding);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Scheduler`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ],
      dataBound: function(e) {
        console.log("dataBound"));
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="scheduler"></div>
    <script>
    function scheduler_dataBound(e) {
        console.log("dataBound"));
    }
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      views: [ "day", "month" ],
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        }
      ]
    });
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.bind("dataBound", scheduler_dataBound);
    </script>

