#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run manifest
npm run build

# push to www branch
# src https://stackoverflow.com/questions/48588908/deploying-ignored-dist-folder-to-github-pages
git commit -am "Save uncommited changes (WIP)"
git branch --delete --force www
git checkout --orphan www
git add -f dist
git commit -m "Rebuild GitHub pages"
git filter-branch -f --prune-empty --subdirectory-filter dist && git push -f origin www && git checkout -

git checkout master