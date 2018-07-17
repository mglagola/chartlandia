#! /usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

APP_VERSION="$(exptool app:version $DIR)"
APP_BUILD="$(exptool app:build $DIR)"

if [ -z "$APP_VERSION" ]; then
    echo "APP_VERSION not set"
    exit 1;
fi

if [ -z "$APP_BUILD" ]; then
    echo "APP_BUILD not set"
    exit 1;
fi

git tag -a "v$APP_VERSION-b$APP_BUILD" -m "v$APP_VERSION-b$APP_BUILD Release"
git push --tag