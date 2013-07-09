kendo-bootstrapper
==================

TODO: CLEAN UP README BEFORE 7/17 (bsatrom)

## Install notes

The Kendo Bootstrapper is a local application that depends on
[NodeJS](http://nodejs.org/) and [Google
Chrome](http://google.com/chrome).  You need to install these first.
Please use a recent version of NodeJS (at least v0.10).

Additionally if you are running Linux you might need to install the
image optimization tools (see below in section "Image optimization").

### Install from ZIP

To download the latest code you can use this URL:
https://github.com/kendo-labs/kendo-bootstrapper/archive/master.zip

Unpack somewhere, then enter the `kendo-bootstrapper` directory and
run:

    npm install
    node bin/start.js

### Install from Git

    git clone git@github.com:kendo-labs/kendo-bootstrapper.git
    cd kendo-bootstrapper
    npm install
    node bin/start.js

Pass `-n` flag to `start.js` to prevent it from starting the browser;
in this case you can use your favorite browser instance and point it
to `http://localhost:7569/`.  (If you're wondering why 7569, 75 and 69
are the respective ASCII codes of `K` and `E`.)


## Overview

The layout is split into a list of projects, a pane for quick access
to Kendo UI documentation and a content area which displays the
project files and allows various operations on them.

Clicking on New in the Projects section will bring up a dialog to bootstrap
a new project.  You have to specify a project name, the target directory
(default base dir is wherever kendo-bootstrapper is installed + "PROJECTS/",
but you can put projects wherever you want, assuming `write` permission).
The project ID is only used internally.

When you select a project from the left side, the main area is filled
with information about the project files, and you can use the buttons
in the toolbar to preview, lint, build, create a bundle of that
project etc.

### Files

You can add new files using the "add file" button (upper-right in the
content div).  There are two types of files in a project:

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

Click the "preview" icon on the left to open your project in a new
window.  A special handler on the server part will know to serve files
from the directory of the specific project that is selected.  This is
useful for static projects.

In case your application uses some server-side code as well (such as
Rails, ASP.NET etc.), just paste the URL to your project in the
preview window.  As long as the bootstrapper is running, any assets
needed by the page are seamlessly included and the page will
automatically refresh as you update the files.

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
- `kendo.web.min.js` → `jquery.min.js`, `kendo.default.min.css`
- `kendo.default.min.css` → `kendo.common.min.css`

The above dependency list is telling the server to auto-load
`kendo.default.min.css` and `app.js` when serving `index.html`.
However, `app.js` depends on `kendo.web.min.js` and `app.less`.
`kendo.web.min.js` in turn depends on jquery, and
`kendo.default.min.css` depends on `kendo.common.min.css`.  The server
is recursively diving into them and loads all dependencies.

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


## JSHint, Kendo Lint

Use these buttons to find potential errors in your code.  If there are
any warnings, a dialog box will popup and you can click the links to
quickly open files at the location of the warnings.  As you save the
files, the list of warnings will be automatically updated.


## Build Kendo

When you click "Build Kendo" in the toolbar, the server will analyze
the JS and HTML project files trying to auto-detect what Kendo widgets
are in use.  For example on the default project template it will
detect that the Window widget is in use, and therefore auto-select
that one in the dialog that pops up.

    NOTE: we can't (yet?) analyze CoffeeScript files.

For the case when the server fails to detect some components, you can
manually select them in the "Build Kendo" dialog.  The manual
selection will be remembered and used next time you need to build
Kendo (although it will still re-scan files and add any new widgets
that have appeared since last time).  One example for this case is the
"Effects framework"—the server cannot detect that it's used, because
it's never mentioned directly.  So if you want animation effects in
the build, you'd just select that manually and it shall be remembered.


## Image optimization

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
