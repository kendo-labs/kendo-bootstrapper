---
title: kendo.ui.Editor
meta_title: Configuration, methods and events of Kendo UI Editor
meta_description: Help guide for proper configuration of Editor UI widget, and how to use methods and events.
slug: api-web-editor
relatedDocs: gs-web-editor-overview
tags: api,web
publish: true
---

# kendo.ui.Editor

Represents the Kendo UI Editor widget. Inherits from [Widget](/api/framework/widget).

## Configuration

### encoded `Boolean` *(default: true)*

 Indicates whether the Editor should submit encoded HTML tags.

#### Example

    $("#editor").kendoEditor({
         encoded: false
     });

### messages `Object`

Defines the text of the labels that are shown within the editor. Used primarily for localization.

#### Example

    $("#editor").kendoEditor({
        messages: {
            bold: "Bold",
            italic: "Italic",
            underline: "Underline",
            strikethrough: "Strikethrough",
            superscript: "Superscript",
            subscript: "Subscript",
            justifyCenter: "Center text",
            justifyLeft: "Align text left",
            justifyRight: "Align text right",
            justifyFull: "Justify",
            insertUnorderedList: "Insert unordered list",
            insertOrderedList: "Insert ordered list",
            indent: "Indent",
            outdent: "Outdent",
            createLink: "Insert hyperlink",
            unlink: "Remove hyperlink",
            insertImage: "Insert image",
            insertHtml: "Insert HTML",
            fontName: "Select font family",
            fontNameInherit: "(inherited font)",
            fontSize: "Select font size",
            fontSizeInherit: "(inherited size)",
            formatBlock: "Format",
            style: "Styles",
            emptyFolder: "Empty Folder",
            uploadFile: "Upload",
            orderBy: "Arrange by:",
            orderBySize: "Size",
            orderByName: "Name",
            invalidFileType: "The selected file \"{0}\" is not valid. Supported file types are {1}.",
            deleteFile: "Are you sure you want to delete \"{0}\"?",
            overwriteFile: "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
            directoryNotFound: "A directory with this name was not found.",
            imageWebAddress: "Web address",
            imageAltText: "Alternate text",
            linkWebAddress: "Web address",
            linkText: "Text",
            linkToolTip: "ToolTip",
            linkOpenInNewWindow: "Open link in new window",
            dialogInsert: "Insert",
            dialogButtonSeparator: "or",
            dialogCancel: "Cancel"
        }
    });

### stylesheets `Array`

Allows custom stylesheets to be included within the editing area.

#### Example

    $("#editor").kendoEditor({
         stylesheets: [
             "common-styles.css",
             "green-theme.css",
         ]
     });

### tools `Array`

A collection of tools that should render a button, combobox, etc, to interact with the Editor. Custom tools are defined
as a collection of required properties, while the insertHtml tool requires a collection of text-value pairs. A separator may be included multiple times.

#### Example

    $("#editor").kendoEditor({
         tools: [
             "bold",
             "italic",
             "underline",
			 "separator",
             "strikethrough",
             "fontName",
             "fontSize",
             "foreColor",
             "backColor",
             "justifyLeft",
             "justifyCenter",
             "justifyRight",
             "justifyFull",
             "insertUnorderedList",
             "insertOrderedList",
             "indent",
             "outdent",
             "formatBlock",
             "createLink",
             "unlink",
             "insertImage",
             "insertHtml",
             "viewHtml",
             {
                 name: "customTool",
                 tooltip: "Custom Tool",
                 exec: function(e) {
                     var editor = $(this).data("kendoEditor");
                     // ...
                 }
             }
         ],
         insertHtml: [
             { text: "label 1", value: "<p>snippet 1</p>" },
             { text: "label 2", value: "<p>snippet 2</p>" }
         ]
     });

### tools.name `String`

The mandatory name of the tool. The built-in tools are "bold", "italic", "underline", "strikethrough", "fontName", "fontSize", "foreColor", "backColor", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "formatBlock", "createLink", "unlink", "insertImage", "insertHtml", "viewHtml".

### tools.tooltip `String`

The text which will be displayed when the end-user hovers the tool button with the mouse.

### tools.exec `Function`

The JavaScript function which will be executed when the end-user clicks the tool button.

### tools.items `Array`

For tools that display a list of items (fontName, fontSize, formatBlock), this option specifies the items in the shown list.

### tools.items.text `String`

The string that the popup item will show.

### tools.items.value `String`

The value that will be applied by the tool when this item is selected.

### tools.template `String`

The kendo template that will be used for rendering the given tool.

### imageBrowser `Object`

Configuration for image browser dialog.

#### Example

    $("#editor").kendoEditor({
         imageBrowser: {
            transport: {
                read: "imagebrowser/read",
                destroy: "imagebrowser/destroy",
                create: "imagebrowser/createDirectory",
                uploadUrl: "imagebrowser/upload",
                thumbnailUrl: "imagebrowser/thumbnail"
                imageUrl: "/content/images/{0}",
            },
            path: "/myInitialPath/"
         }
     });

### imageBrowser.fileTypes `String` *(default: "*.png,*.gif,*.jpg,*.jpeg")*

Defines the allowed file extensions.

### imageBrowser.path `String` *(default: "/")*

Defines the initial folder to display, relative to the root.

### imageBrowser.transport `Object`

Specifies the settings for loading and saving data.

### imageBrowser.transport.read `Object|String`

Options or URL for remote image retrieval.

> **Important:** The value of `transport.remote` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

### imageBrowser.transport.read.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            contentType: "application/json"
        }
    }

### imageBrowser.transport.read.data `Object|String|Function`

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

### imageBrowser.transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            dataType: "json"
        }
    }

### imageBrowser.transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        read: {
            type: "POST"
        }
    }

### imageBrowser.transport.read.url `String|Function`

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

### imageBrowser.transport.thumbnailUrl `String|Function`

The URL for retrieving the thumbnail version of the image. If not specified a default image icon will be shown.
If function is assign, the current path and image name will be provided.

### imageBrowser.transport.uploadUrl `String`

The URL which will handle the upload of the new images. If not specified the Upload button will not be displayed.

### imageBrowser.transport.imageUrl `String|Function`

The URL responsible for serving the original image. A file name placeholder should be specifed.

#### Example

    $("#editor").kendoEditor({
         imageBrowser: {
            transport: {
                imageUrl: `/content/images/{0}` //the placeholder will be replaced with the current virtual path and selected file name
            }
         }
     });

### imageBrowser.transport.destroy `Object|String`

Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

### imageBrowser.transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            contentType: "application/json"
        }
    }

### imageBrowser.transport.destroy.data `Object|String|Function`

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

### imageBrowser.transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            dataType: "json"
        }
    }

### imageBrowser.transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        destroy: {
            type: "POST"
        }
    }

### imageBrowser.transport.destroy.url `String|Function`

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

### imageBrowser.transport.create `Object|String`

Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](http://api.jquery.com/jQuery.ajax).

### imageBrowser.transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            contentType: "application/json"
        }
    }

### imageBrowser.transport.create.data `Object|String|Function`

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

### imageBrowser.transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            dataType: "json"
        }
    }

### imageBrowser.transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "GET".
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example
    transport: {
        create: {
            type: "POST"
        }
    }

### imageBrowser.transport.create.url `String|Function`

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


### imageBrowser.schema `Object`

Set the object responsible for describing the image raw data format.

### imageBrowser.schema.model `Object`

Set the object which describes the image/directory entry fields. Note that a name, type and size fields should be set.

### imageBrowser.schema.model.id `String`

The name of the field which acts as an identifier.

### imageBrowser.schema.model.fields `Object`

### imageBrowser.schema.model.fields.name `Object|String`

The field which contains the name of the image/directory

### imageBrowser.schema.model.fields.name.field `String`

The name of the field.

### imageBrowser.schema.model.fields.name.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.schema.model.fields.type `Object|String`

The field which contains the type of the entry. Either *f* for image or *d* for directory.

### imageBrowser.schema.model.fields.type.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.schema.model.fields.type.field `String`

The name of the field.

### imageBrowser.schema.model.fields.size `Object|String`

The field which contains the size of image.

### imageBrowser.schema.model.fields.size.field `String`

The name of the field.

### imageBrowser.schema.model.fields.size.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

### imageBrowser.messages `Object`

Defines texts shown within the pager.

### imageBrowser.messages.uploadFile `String`*(default: "Upload")*

Defines text for upload button.

### imageBrowser.messages.orderBy `String`*(default: "Arrange by")*

Defines text for order by label.

### imageBrowser.messages.orderByName `String`*(default: "Name")*

Defines text for Name item of order by drop down list.

### imageBrowser.messages.orderBySize `String`*(default: "Size")*

Defines text for Size item of order by drop down list.

### imageBrowser.messages.directoryNotFound `String`*(default: "A directory with this name was not found.")*

Defines text for dialog shown when the directory not found error occurs.

### imageBrowser.messages.emptyFolder `String`*(default: "Empty Folder")*

Defines text displayed when folder does not contain items.

### imageBrowser.messages.deleteFile `String`*(default: "Are you sure you want to delete {0}?")*

Defines text for dialog shown when the file or directory is deleted.

### imageBrowser.messages.invalidFileType `String`*(default: "The selected file '{0}' is not valid. Supported file types are {1}.")*

Defines text for dialog shown when an invalid file is set for upload.

### imageBrowser.messages.overwriteFile `String`*(default: "A file with name '{0}' already exists in the current directory. Do you want to overwrite it?")*

Defines text for dialog shown when an already existing file is set for upload.

### imageBrowser.messages.search `String`*(default: "Search")*

Defines text for search box pleaceholder.

## Methods

### createRange

Creates a W3C-compatible **Range** object.

#### Example

    var editor = $("#editor").data("kendoEditor");

    var range = editor.createRange();

#### Parameters

##### document `Document` *(optional)*

The document that the range is associated with. If ommited, the document of the editor editing area will be used.

#### Returns

`Range` The created **Range** object.

### destroy
Prepares the **Editor** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Editor element from DOM.

#### Example

    var editor = $("#editor").data("kendoEditor");

    // detach events
    editor.destroy();

### encodedValue

Gets the HTML encoded value of the editor.

### exec

Executes an editor command on the currently selected text.

#### Example

    var editor = $("#editor").data("kendoEditor");

    editor.exec("bold");

    editor.exec("undo");

    editor.exec("foreColor", { value: "#ff0000" });

#### Parameters

##### name `String`

The name of the command to be executed.

##### params `String|Object` *(optional)*

The parameters for the executed command.

##### params.value `Object`

### focus

Focuses the editable area.

### getRange

Gets a **Range** object form the editable area.

#### Example

    var editor = $("#editor").data("kendoEditor");

    var range = editor.getRange();

#### Returns

`Range` A W3C-compatible **Range** object that represents the currently selected text in the editor area.

### getSelection

Gets a W3C-compatible **Selection** object form the editable area.

#### Returns

`Selection` a W3C-compatible **Selection** object form the editable area.

### paste

Pastes HTML into the editable area.

#### Example

    var editor = $("#editor").data("kendoEditor");

    editor.paste("<p>new content</p>");

#### Parameters

##### html `String`

The HTML to be pasted.

### selectedHtml

Serializes the currently selected text to a XHTML string.

#### Returns

`String` The selectied text as valid XHTML.

### selectRange

Focuses the editable area and selects the range described by the range parameter.

#### Example

    var editor = $("#editor").data("kendoEditor"),
        range = editor.createRange();

    range.selectNodeContents(editor.body);

    editor.selectRange(range);

#### Parameters

##### range `Range`

The **Range** object that describes the new selection.

### update

Serializes the current state of the editable area to the `<textarea>` element.
This method should be called after modifying the editor content through the DOM.

### value

Gets or sets the editor value.

#### Example

    var editor = $("#editor").data("kendoEditor");

    // set value
    editor.value("<p>new content</p>");

    // get value
    var htmlValue = editor.value();

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the Editor as HTML string.

## Events

### change

Fires when Editor is blurred and its content has changed.

#### Example

    function onChange(e) {
        // handle event
    }

### execute

Fires when an Editor command is executed.

#### Example

     $("#editor").kendoEditor({
         execute: function(e) {
             // handle event
     });

#### To set after initialization

     // get a reference to the Editor
     var editor = $("#editor").data("kendoEditor");

     // bind to the execute event
     editor.bind("execute", function(e) {
         // handle event
     }

#### Event Data

##### e.name `String`

The name of the command

##### e.command `Object`

The command instance

### keydown

Fires when the user depresses a keyboard key. Triggered multiple times if the user holds the key down.

### keyup

Fires when the user releases a keyboard key.

### paste

Fires before when content is pasted in the Editor.

#### Example

     $("#editor").kendoEditor({
         paste: function(e) {
             // handle event
     });

#### To set after initialization

     // get a reference to the Editor
     var editor = $("#editor").data("kendoEditor");

     // bind to the paste event
     editor.bind("paste", function(e) {
         // handle event
     }

#### Event Data

##### e.html `Object`

The pasted content

### select

Fires when the Editor selection has changed.

#### Example

     $("#editor").kendoEditor({
         select: function(e) {
             // handle event
         }
     });

#### To set after initialization

     // get a reference to the Editor
     var editor = $("#editor").data("kendoEditor");

     // bind to the select event
     editor.bind("select", function(e) {
         // handle event
     }
