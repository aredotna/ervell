# !/usr/bin/bash

set -e -x

yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
gzip -S .jgz $(find public/assets -name '*.js')
bucket-assets --bucket $S3_BUCKET
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=$APP_NAME
