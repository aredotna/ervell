# !/usr/bin/bash

set -e -x

BRANCH=$(git symbolic-ref --short HEAD)
APP_NAME=ervell-staging
S3_BUCKET=ervell-staging

# predeploy
yarn assets
gzip -S .cgz $(find public/assets -name '*.css')
gzip -S .jgz $(find public/assets -name '*.js')
bucket-assets --bucket $S3_BUCKET
heroku config:set ASSET_MANIFEST=$(cat manifest.json) --app=$APP_NAME

# deploy
git push --force https://git.heroku.com/$APP_NAME.git $BRANCH:master
