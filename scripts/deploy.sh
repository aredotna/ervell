# !/usr/bin/bash

set -e -x

yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
gzip -S .jgz $(find public/assets -name '*.js')
bucket-assets --bucket ervell-staging
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=ervell-staging # TODO
git push --force git@heroku.com:ervell-staging.git master # TODO
