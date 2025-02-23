#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run manifest
npm run build

# push to www branch
git init
git add dist
git commit -m 'deploy to web'
git subtree push --prefix dist origin www

cd -