#! /bin/sh

SCRIPT=`readlink -f $0`
DIR=`dirname $SCRIPT`
KENDO_SRC=$DIR/../../kendo
KENDO_DEST=$DIR/../docroot/kendo

mkdir -p $KENDO_DEST/js
cp $KENDO_SRC/src/jquery.min.js $KENDO_DEST/js
cp $KENDO_SRC/src/kendo.web.min.js $KENDO_DEST/js

mkdir -p $KENDO_DEST/css
cp -r $KENDO_SRC/styles/web/* $KENDO_DEST/css
cp -r $KENDO_SRC/styles/dataviz/* $KENDO_DEST/css
