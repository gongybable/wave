#!/bin/bash
cd $SRC_DIR 
npm install
echo NPM module installation verified ...

rsync -rt $SRC_DIR/ $DEST_DIR/

sleep 10

cd $DEST_DIR && exec npm start