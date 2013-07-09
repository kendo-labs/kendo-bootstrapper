kendo-bootstrapper
==================

TODO: CLEAN UP README BEFORE 7/17 (bsatrom)

## Running it:

    git clone git@github.com:kendo-labs/kendo-bootstrapper.git
    cd kendo-bootstrapper
    npm install
    node bin/start.js

Pass `-n` flag to `start.js` to prevent it from starting the browser;
in this case you can use your favorite browser instance and point it
to `http://localhost:7569/`.  (If you're wondering why 7569, 75 and 69
are the respective ASCII codes of `K` and `E`.)

## Quick info

The layout is split into a list of projects, a pane for quick access
to Kendo UI documentation and a content area which displays the
project files and allows various operations on them.

Clicking on New in the Projects section will bring up a dialog to bootstrap
a new project.  You have to specify a project name, the target directory
(default base dir is wherever kendo-bootstrapper is installed + "PROJECTS/",
but you can put projects wherever you want, assuming `write` permission).
The project ID is only used internally, I should probably remove it from
this dialog.

After you create a project it gets displayed in the Projects section.
Selecting it will fill the other areas.  I thought we should support two
categories of files:

- libraries
- project files

Libraries are files that are already built (for example jquery.min.js and
kendo-web.min.js).  The end-user doesn't have a choice to edit or rebuild
them (but of course, he does have the choice of adding whatever file he
wants as a project file).

Project files are the files that implement the user's application.
Supported here are:

- html (no build action available)
- css (build action through `cssmin`)
- less (built through `less | cssmin`)
- js (built through `uglify-js`)
- coffee (builds with CoffeeScript, minifies with UglifyJS)

Initially the files won't be built, so you can see in red "not built"
besides them.  If you click the "rebuild all" button they will be
minified/less-ified and CoffeeScript compiled into minified JS.

If you click the "Preview" button in the project section (or just click the
main `.html` file), a new window will open and you can preview the project.
A special handler on the server part will know to serve files from the
directory of the specific project that is selected.

You can add new files using the "add file" button (upper-right in the
content div), or "New file" in the files section.  You need to type a
file name (relative to the project directory) and can optionally
submit the content (otherwise an empty file will be created).  You can
also specify whether it is a "library file" or a "page" file.  Pages
are treated specially (see below the section about dependencies).

You can edit project files using the "edit" links.  On Linux this will
open `gedit`, since it seems to be available on most systems.  On
Windows it tries a few popular editors (Nodepad++, GVim, WordPad and
finally notepad.exe).  I can't figure out how to focus the editor on
the first launch, but assuming it's already started Notepad++ gets on
top on a subsequent click on "edit" (which is why it's on the top of
the list; seems to behave better than the others).  Finally, WordPad
is preferred to plain notepad.exe because it does well with the focus
and it seamlessly supports Unix-style newlines.

The content div is refreshed whenever the Chrome window is focused, so if
when you save the file you were editing and come back, you'll see an
"outdated" label next to the build file name (assuming there is a build for
that file), meaning you should click "rebuild all" to get the minified
version updated.  "Rebuild all" will actually check the timestamps of
minified files vs. original files, and will only rebuild the "dirty" ones.

## File dependencies

We now have file dependency support, to facilitate auto-loading files
in the pages.  Dependencies are extended to any kind of files, not
just JS.  For example in the default project template, we have the
following dependencies:

- index.html → app.js
- app.js → kendo.web.min.js, app.less
- kendo.web.min.js → jquery.min.js, kendo.default.min.css
- kendo.default.min.css → kendo.common.min.css

Web pages (normally HTML files) are treated specially.  The files that
they depend on are included in the document head, inside a section
marked:

    <!--KENDO_BOOTSTRAPPER:FILES--><!--/KENDO_BOOTSTRAPPER:FILES-->

The above is telling the server to auto-load `app.js` when serving
`index.html`.  However, `app.js` depends on `kendo.web.min.js` and
`app.less`.  `kendo.web.min.js` in turn depends on jquery and on the
Kendo UI default CSS theme.  The server is recursively diving into
them and loads all dependencies, before finally listing `app.js`.

Again, two kinds of files are treated specially: LESS and
CoffeeScript.  During development, when such files are found the
server will automatically load `less.js` and `coffeescript.js`, so the
user can seamlessly work with these files and test.  When a production
build is requested, however, these files will be compiled and minified
into plain CSS or JS, and their interpreters (`less.js` /
`coffeescript.js`) will not be loaded.

To edit the dependencies, click on the "Dependencies" button in the
toolbar.  It pops up a dialog with all the project files on the left.
Select the file whose dependency list you want to edit, and on the
right side select one or more files that it depends on (use CTRL+click
for multiple selection; this should better be replaced with a list of
checkboxes).

## Build Kendo

The default project template ships with the full `kendo.web.min.js`,
to make sure it works for most cases.  When you click "Build Kendo" in
the toolbar, the server will analyze the JS and HTML project files
trying to auto-detect what Kendo widgets are in use.  For example on
the default project template it will detect that the Window widget is
in use, and therefore auto-select that one in the dialog that pops up.

    NOTE: we can't (yet?) analyze CoffeeScript files.

Only widget that are directly used need to be selected; when building
Kendo, the server will fill in any dependencies (for example you never
need to select "Core framework" manually, though it's no harm if you
do).

For the case when the server fails to detect some widget usage, one
can manually select them in the "Build Kendo" dialog.  The manual
selection will be remembered and used next time you need to build
Kendo (although it will still re-scan files and add any new widgets
that have appeared since last time).  One example for this case is the
"Effects framework"—the server cannot detect that it's used, because
it's never mentioned directly.  So if you want animation effects in
the build, you'd just select that manually and it shall be remembered.

NOTE: in order to provide this feature, we need to distribute the
individual minified Kendo UI sources along with the bootstrapper
project (but they are not included in the project templates).

## TODO

- The layout is a bit ugly, as you can see.  I didn't manage to get rid of
  the scrollbars, also the Projects and Files sections are not properly
  resized.

## Tech notes

- Google Chrome is started by the NodeJS server script.  It runs with
  `--app`, which is why you don't see any toolbars, and the profile
  directory is a temporary one (so this particular instance of Chrome won't
  know anything about your bookmarks, history or cookies).  This directory
  is removed on server shutdown.  The server shuts down automatically when
  this Chrome process ends (on closing the window, for example).

- Communication between server and Chrome is via WebSockets, which is pretty
  nice and fast.  The server could watch a project directory for example and
  automaically update the client when some file is modified, or when a new
  file is dropped into the directory.  Not sure it's worth the trouble, but
  that could be done.

- Data about available projects is stored in a `bootstrapper.json` file in
  the `kendo-bootstrapper` directory.

- Per-project data is stored in a `bootstrapper.json` file inside each
  project directory.
