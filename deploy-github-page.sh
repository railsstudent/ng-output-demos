#!/bin/sh

if [ $# -lt 1 ]; then
    echo "Usage: $0 <app folder name>"
    exit 1
fi

echo "delete docs/$1"
rm -rf docs/$1
echo "build project $1 starts"
# ng build --output-path docs/
ng build --project=$1 --output-path docs/$1
# cp ./docs/browser/index.html  ./docs/browser/404.html
# cp ./docs/browser/*  ./docs
# rm -rf ./docs/browser
echo 'build project finishes'
