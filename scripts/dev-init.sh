#!/bin/bash

if node --version
then
    echo 'Found Node'
else
    echo "Unable to locate Node installation. Please check read me for directions on installation"
    exit 100
fi

BASEDIR=$(dirname "$0")
npm install
echo "$(node $BASEDIR/node/deploy.js $@)"