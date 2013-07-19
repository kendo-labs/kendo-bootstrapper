# Kendo UI Bootstrapper

## About the Kendo UI Bootstrapper

The Kendo UI Bootstrapper is a free and open source tool designed to enhance your development workflow with Kendo UI by taking care of code linting, static analysis, minification, bundling and easy access to documentation. It is not an IDE. It is not intended for you to use to edit code. It exists to augment your current IDE by taking care of many of the more advanced and manual tasks of application development that your IDE may not handle out of the box.

## Compatibility and Requirements

The Kendo UI Bootstrapper is a client-based NodeJS application, with the following dependencies:

- [NodeJS](http://www.nodejs.org) v0.10+
- [NPM](http://www.npmjs.org) v1+
- [Google Chrome](http://www.chrome.com)

> Note: If you are running Linux you might need to install the
image optimization tools (see below in section "Image optimization").

Running `npm install` once you clone the repository should install the required project dependencies. If you run into any problems installing or running the bootstrapper, be sure to check your node and npm versions by running `node -v` and `npm -v` and ensuring your current version is equal to or greater than the versions listed above.

The Kendo UI Bootstrapper has not been tested against any other versions of these libraries. You may find that versions other than these are compatible with The Kendo UI Bootstrapper, but we make no claims to support those version, nor can we troubleshoot issues that arise when using those versions.

## Getting Started

Note: a complete getting started guide can be found in the [Kendo UI Docs](http://docs.kendoui.com/getting-started/bootstrapper)

### 1. Install from ZIP

To download the latest code you can use this URL:
https://github.com/kendo-labs/kendo-bootstrapper/archive/master.zip

Unpack somewhere, then enter the `kendo-bootstrapper` directory and
run:

    npm install
    node bin/start.js

### 1. Install from Git

Additionally, you can install the bootstrapper by cloning the git repo:

    git clone https://github.com/kendo-labs/kendo-bootstrapper.git
    cd kendo-bootstrapper
    npm install
    node bin/start.js

Pass `-n` flag to `start.js` to prevent it from starting the browser:

    node bin/start.js -n

In this case you can use an existing Chrome instance and point it
to `http://localhost:7569/`.  

### 2. Select Kendo UI directory

On first startup, the bootstrapper will ask you for the path to your
commerical or trial Kendo UI sources. If you don't already have Kendo UI you can download it from here:
[www.kendoui.com/download](http://www.kendoui.com/download.aspx). Once downloaded, 
unpack it somewhere and navigate to the appropriate folder in the bootstrapper dialog.

### 3. Get to Bootstrappin'

That's it! Once you've pointed the bootstrapper to your Kendo UI bits, you're ready to go. Click the 'New Project' button to get started, or read on for more information.

## Bootstrapper Overview

The bootstrapper layout is split into a list of projects (top left), a pane for quick access
to Kendo UI documentation (bottom left) and a content area which allows you to work with, add and manage all of the assets and resources in your Kendo UI apps.

Clicking on New in the Projects section will bring up a dialog to bootstrap
a new project.  You have to specify a project name, the target directory
(default base dir is wherever kendo-bootstrapper is installed + "PROJECTS/",
but you can put projects you have write permissions to on your OS).
The project ID is only used internally.

When you select a project from the left side, the main area is filled
with information about that project's files, and you can use the buttons
in the toolbar to preview, lint, build, create a bundle of that
project, etc.

### Files

You can add new files using the "add file" button (top-right of the main content area).  There are two types of files in a project:

- project files are those files that you are working on;
- library files are any third-party libraries you might need to use.

Libraries are usually already built (for example jquery.min.js and
kendo-web.min.js).  You don't normally need to rebuild them or edit
them, so there is no such option directly exposed in the bootstrapper.

Project files are the files that implement your application.
Supported types are:

- html (no build action available)
- css (build action through `cssmin`)
- less (built through `less | cssmin`)
- js (built through `uglify-js`)
- coffee (builds with CoffeeScript, minifies with UglifyJS)

### Preview

Click the "preview" icon on the top left of the project pane to open your project in a new
window.  A special handler inside the bootstrapper will serve files
from the directory of the specific project that is selected.  This is
useful for static projects.

In case your application uses some server-side code as well (such as
Rails, ASP.NET etc.), just paste the URL to your project in the
preview window.  As long as the bootstrapper is running, any assets
needed by the page are seamlessly included and the page will
automatically refresh as you update the files. Additional server-side support will be coming in the bootstrapper before RTM.

### "Transpilers" (LESS and CoffeeScript)

Two kinds of files are treated specially during preview: LESS and
CoffeeScript.  In development, when such files are needed in the page
the server will automatically load `less.js` and `coffeescript.js`, so
you can develop and test directly in these languages, instead of
recompiling after each change.

When a production build is requested, these files will be compiled and
minified into plain CSS or JS, and their interpreters (`less.js` /
`coffeescript.js`) will not be loaded.

### File dependencies

The bootstrapper's dependency system facilitates auto-loading the
files that your pages need.  Dependencies are extended to any kind of
files, not just JS.  For example, in the default project template we
the following dependencies are defined:

- `index.html` → `kendo.default.min.css`, `app.js`
- `app.js` → `kendo.web.min.js`, `app.less`
- `kendo.web.min.js` → `jquery.min.js`
- `kendo.default.min.css` → `kendo.common.min.css`

The above dependency list is telling the server to auto-load
`kendo.default.min.css` and `app.js` when serving `index.html`.
However, `app.js` depends on `kendo.web.min.js` and `app.less`.
`kendo.web.min.js` in turn depends on jquery, and
`kendo.default.min.css` depends on `kendo.common.min.css`.  The server will manage and load all of these dependencies.

During development, Web pages (i.e. index.html) contain a single
`<script>` tag, included in a special section, that will take care of
loading the dependencies (stylesheets and scripts) that the page
depends on.  That section is replaced when the bundle is built with
the actual HTML to load the dependencies.

### Ordering dependencies

A correct configuration of dependencies defines the ordering too.  For
example, if you have `foo.js` and `bar.js` and need to load them in
the page in this specific order, the proper way to configure it would
be like this:

- `index.html` → `bar.js`
- `bar.js` → `foo.js`

However, if you prefer it you can list both under `index.html` and
define the ordering manually.

### Editing dependencies

There are two ways to configure dependencies.

- click the "Dependencies" button in the toolbar to get a dialog which
  lists all files and their dependencies.  Select a file on the left,
  and on the right you get a list of checkboxes where you can mark
  which other files it depends on.

- click the "file dependencies" icon next to any file to edit the
  dependencies of that file alone.

## Build and Deploy Tools

The bottom section of the main bootstrapper content window contains a series of build and deploy options that you can use for your projects.

### JSHint, Kendo Lint

Use these buttons to find potential errors in your code.  If there are
any warnings, a dialog box will popup and you can click the links to
quickly open files at the location of the warnings.  As you save the
files, the list of warnings will be automatically updated.

### Build Kendo

When you click "Build Kendo" in the toolbar, the server will analyze
the JS and HTML project files trying to auto-detect what Kendo widgets
are in use.  For example on the default project template it will
detect that the Window widget is in use, and therefore auto-select
that one in the dialog that pops up.

For the case when the server fails to detect some components, you can
manually select them in the "Build Kendo" dialog.  The manual
selection will be remembered and used next time you need to build
Kendo (although it will still re-scan files and add any new widgets
that have appeared since last time).  One example for this case is the
"Effects framework"—the server cannot detect that it's used, because
it's never mentioned directly.  So if you want animation effects in
the build, you'd just select that manually and it shall be remembered.

### Image optimization

On Windows and Mac platforms, the Kendo Bootstrapper includes binaries
for [optipng](http://optipng.sourceforge.net/) and
[jpegtran](http://jpegclub.org/jpegtran/) — two neat tools that can
seriously reduce the size of PNG and JPG images.  If you're on Linux,
chances are that these tools are already installed, or easily
accessible in your Linux distribution.  For example to install them on
Ubuntu Linux:

    apt-get install optipng libjpeg-turbo-progs

You don't need to explicitly include image files in the project file
list.  When you click "Optimize images", the bootstrapper will scan
your project folder and each and every image found is optimized in
place (both jpegtran and optipng do lossless optimization, hence there
is no point in storing the original images).  Normally you only need
to do this once, but just in case you added new images this step is
automatically done when you request a project bundle.

## Getting Help

The Kendo UI Bootstrapper is currently in BETA and, is not an official part of any Kendo UI SKU (Web, DataViz, Mobile or Complete). As such, this project is not a supported part of Kendo UI, and is not covered under the support agreements for Kendo UI license holders. Please do not create support requests for this project, as these will be immediately closed and you'll be directed to post your question on a community forum. 

The Kendo UI Bootstrapper will enter into the standard Kendo UI Licenses upon it's RTM release in the fall of 2013. Until that time, please enter feedback and requests as Issues in the Kendo UI Bootstrapper repo.

## Release Notes

For change logs and release notes, see the [changelog](CHANGELONG.MD) file.

## License

The Kendo UI Bootstrapper is available under a [GPLv3 License](LICENSE.md)
