kendo-bootstrapper
==================

This is only tested on Linux so far.  Requirements:

- NodeJS
- Google Chrome
- gedit (for editing files)

## Running it:

    git clone git@github.com:telerik/kendo-bootstrapper.git
    cd kendo-bootstrapper
    npm install
    node bin/start.js

## Quick info

The layout is split into a list of projects, a tree of project files
(created when some project is selected) and a content div which lists more
info about the files.

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

Initially the files won't be built, so you can see in red "not built"
besides them.  If you click the "rebuild all" button they will be
minified/less-ified.

If you click the "Preview" button in the project section (or just click the
main `.html` file), a new window will open and you can preview the project.
A special handler on the server part will know to serve files from the
directory of the specific project that is selected.

You can add new files using the "add file" button (upper-right in the
content div), or "New file" in the files section.  You need to type a file
name (relative to the project directory) and can optionally submit the
content (otherwise an empty file will be created).  You can also specify
whether it is a "library file".

You can edit project files using the "edit" links.  On Linux this will open
`gedit`, since it seems to be available on most systems.  On Windows it will
open `notepad.exe` — but in the end, we should make the editor command
configurable.

The content div is refreshed whenever the Chrome window is focused, so if
when you save the file you were editing and come back, you'll see an
"outdated" label next to the build file name (assuming there is a build for
that file), meaning you should click "rebuild all" to get the minified
version updated.  "Rebuild all" will actually check the timestamps of
minified files vs. original files, and will only rebuild the "dirty" ones.

## TODO

- At this point I'm not handling various errors that can occur during
  "rebuild all".  For example a parse error in some JS file will bring down
  the server, which isn't exactly elegant.  Will have a nice dialog
  displaying the errors and allowing the user to quickly jump to the error
  location via the external editor.

- It would be nice if the "add file" function will modify the `index.html`
  to load the new `<script>`, or `<link>` for CSS files.

- Currently, though we can build the minified files, we have no option to
  actually modify the `index.html` to use them.  This is a bit tricky
  because we want to list the original sources there during development, but
  list the minified files for a production build.  Perhaps we should have a
  "make production build" button that would modify the `index.html` to
  include minified files, and builds everything in some `.zip` archive?

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
  project directory.  Currently we only list the project name and files, but
  I expect we should complicate the structure a bit—for example we should
  probably have per-file minification options, or support for bundling
  multiple JS files in a single `.min.js` output.
