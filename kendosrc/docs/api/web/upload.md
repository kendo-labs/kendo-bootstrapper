---
title: kendo.ui.Upload
meta_title: Configuration, methods and events of Kendo UI Upload
meta_description: How to configure the ability to upload files in an asynchronous manner in Upload UI widget.
slug: api-web-upload
relatedDocs: gs-web-upload-overview
tags: api,web
publish: true
---

# kendo.ui.Upload

Represents the Kendo UI Upload. Inherits from [Widget](/api/framework/widget).

## Configuration

### async `Object`

Configures the ability to upload a file(s) in an asynchronous manner. Please refer to the
[async mode help topic](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async)
for more details.

### async.autoUpload `Boolean`*(default: true)*

The selected files will be uploaded immediately by default. You can change this behavior by setting
autoUpload to false.

### async.batch `Boolean`*(default: false)*

The selected files will be uploaded in separate requests, if this is supported by the browser.
You can change this behavior by setting batch to true.

### async.removeField `String`*(default: "fileNames")*

The name of the form field submitted to the Remove URL.

### async.removeUrl `String`

The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST
requests containing one or more "fileNames" fields specifying the files to be deleted.

### async.removeVerb `String`*(default: "DELETE")*

The HTTP verb to be used by the remove action.

### async.saveField `String`

The name of the form field submitted to the save URL. The default value is the input name.

### async.saveUrl `String`

The URL of the handler that will receive the submitted files. The handler must accept POST requests
containing one or more fields with the same name as the original input name.

### enabled `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) an **Upload**. A disabled
**Upload** may be re-enabled via enable().

### localization `Object`

Sets the strings rendered by the Upload.

### localization.cancel `String`

Sets the text of the cancel button text.

### localization.dropFilesHere `String`*(default: "drop files here to upload")*

Sets the drop zone hint.

### localization.remove `String`

Sets the text of the remove button text.

### localization.retry `String`

Sets the text of the retry button text.

### localization.select `String`

Sets the "Select..." button text.

### localization.statusFailed `String`

Sets the status message for failed uploads.

### localization.statusUploaded `String`

Sets the status message for uploaded files.

### localization.statusUploading `String`

Sets the status message for files that are being uploaded.

### localization.uploadSelectedFiles `String`

Sets the text of the "Upload files" button.

### multiple `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability to select multiple files.
If **false**, users will be able to select only one file at a time. Note: This option does not
limit the total number of uploaded files in an asynchronous configuration.

### showFileList `Boolean`*(default: true)*

Enables (**true**) or disables (**false**) the ability to display a file listing
for uploading a file(s). Disabling a file listing may be useful you wish to customize the UI; use the
client-side events to build your own UI.

## Methods

### destroy
Prepares the **Upload** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Upload element from DOM.

#### Example

    var upload = $("#upload").data("kendoUpload");

    // detach events
    upload.destroy();

### disable

Disables the upload.

#### Example

    var upload = $("#upload").data("kendoUpload");

    // disables the upload
    upload.disable();

### enable

Enables the upload.

#### Example

    var upload = $("#upload").data("kendoUpload");

    // enables the upload
    upload.enable();

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the upload.

### toggle

Toggles the upload enabled state.

#### Example

    var upload = $("#upload").data("kendoUpload");

    // toggles the upload enabled state
    upload.toggle();

#### Parameters

##### enable `Boolean`

(Optional) The new enabled state.

## Events

### cancel

Fires when the upload has been cancelled while in progress.



Note: The cancel event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        cancel: onCancel
    });

    function onCancel(e) {
        // Array with information about the uploaded files
        var files = e.files;

        // Process the Cancel event
    }

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

### complete

Fires when all active uploads have completed either successfully or with errors.



Note: The complete event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        complete: onComplete
    });

    function onComplete(e) {
        // The upload is now idle
    }

### error

Fires when an upload / remove operation has failed.



Note: The error event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        error: onError
    });

    function onError(e) {
        // Array with information about the uploaded files
        var files = e.files;

        if (e.operation == "upload") {
            alert("Failed to uploaded " + files.length + " files");
        }
    }

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

##### e.operation `String`

- "upload" or "remove".

##### e.XMLHttpRequest `Object`

This is either the original XHR used for the operation or a stub containing:


*   responseText
*   status
*   statusText
Verify that this is an actual XHR before accessing any other fields.

### progress

Fires when upload progress data is available.


Note: The progress event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        progress: onProgress
    });

    function onProgress(e) {
        // Array with information about the uploaded files
        var files = e.files;

        console.log(e.percentComplete);
    }

#### Event Data

##### e.files `Array`

List of the files that are being uploaded. Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

##### percentComplete `Number`

Upload progress (0 - 100)

### remove

Fires when an uploaded file is about to be removed.
Cancelling the event will prevent the remove.

#### Example

    $("#photos").kendoUpload({
        // ...
        remove: onRemove
    });

    function onRemove(e) {
        // Array with information about the removed files
        var files = e.files;

        // Process the Remove event
        // Optionally cancel the remove operation by calling
        // e.preventDefault()
    }

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

##### data `Object`

Optional object that will be
sent to the save handler in the form of key/value pairs.

### select

Triggered when a file(s) is selected. Note: Cancelling this event will prevent the selection from
occurring.

#### Wire-up an event handler that triggered when a user selects a file(s)

    var onSelect = function(e) {
        $.each(e.files, function(index, value) {
            console.log("Name: " + value.name);
            console.log("Size: " + value.size + " bytes");
            console.log("Extension: " + value.extension);
        });
    };

    // initialize and configure an Upload widget with a select event handler
    $("#photos").kendoUpload({
        // ...
        select: onSelect
    });

#### Event Data

##### e `Object`

A custom event object. The event can be cancelled just like when using a standard jQuery event object via `e.preventDefault();`

##### e.files `Array`

An array of the selected files.

*   name - the name of a selected file, including its extension
*   extension - the file extension of a selected file, including the leading dot (i.e. ".jpg")
*   size - the size (in bytes) of a selected file (null, if unavailable)
*   rawFile - an in-memory representation of a selected file

### success

Fires when an upload / remove operation has been completed successfully.



Note: The success event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        success: onSuccess
    });

    function onSuccess(e) {
        // Array with information about the uploaded files
        var files = e.files;

        if (e.operation == "upload") {
            alert("Successfully uploaded " + files.length + " files");
        }
    }

#### Event Data

##### e.files `Array`

List of the files that were uploaded or removed . Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

##### e.operation `String`

"upload" or "remove".

##### e.response `String`

the response object returned by the server.

##### e.XMLHttpRequest `Object`

This is either the original XHR used for the operation or a stub containing:


*   responseText
*   status
*   statusText
Verify that this is an actual XHR before accessing any other fields.

### upload

Fires when one or more files are about to be uploaded.
Cancelling the event will prevent the upload.

Note: The upload event fires only when the upload is in
[async mode](http://www.kendoui.com/documentation/ui-widgets/upload/modes.aspx#async).

#### Example

    $("#photos").kendoUpload({
        // ...
        upload: onUpload
    });

    function onUpload(e) {
        // Array with information about the uploaded files
        var files = e.files;

        // Check the extension of each file and abort the upload if it is not .jpg
        $.each(files, function() {
            if (this.extension != ".jpg") {
                alert("Only .jpg files can be uploaded")
                e.preventDefault();
            }
        });
    }

#### Event Data

##### e.files `Array`

List of the files that will be uploaded. Each file has:


*   name
*   extension - the file extension
        inlcuding the leading dot - ".jpg", ".png", etc.
*   size - the file size in bytes (null if not available)

##### data `Object`

Optional object that will be
sent to the save handler in the form of key/value pairs.

##### e.XMLHttpRequest `Object`

Note: Will be *undefined* if the browser does not support File API.

The XMLHttpRequest instance that will be used to carry out the upload.
The request will be in UNSENT state.

#### Example

    $("#photos").kendoUpload({
        // ...
        upload: onUpload
    });

    function onUpload(e) {
        var xhr = e.XMLHttpRequest;
        if (xhr) {
            xhr.addEventListener("readystatechange", function(e) {
                if (xhr.readyState == 1 /* OPENED */) {
                    xhr.setRequestHeader("X-Foo", "Bar");
                }
            });
        }
    }

