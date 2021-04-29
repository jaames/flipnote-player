#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run manifest
npm run build

# navigate into the build output directory
cd dist

# push to gh-pages branch
git init
git add -A
git commit -m 'deploy to web'
git push -f git@github.com:jaames/flipnote-player.git master:www

cd -