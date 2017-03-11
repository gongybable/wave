#!/bin/bash

cp $SRC_DIR/etc/nginx.conf /etc/nginx/nginx.conf
cp $SRC_DIR/etc/default.conf /etc/nginx/conf.d/default.conf

cd $SRC_DIR
npm install
echo NPM module installation verified ...
cp -r $SRC_DIR/src $DEST_DIR/
cp -r $SRC_DIR/node_modules $DEST_DIR/src/

exec nginx -g "daemon off;"