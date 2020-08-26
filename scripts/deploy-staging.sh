# !/usr/bin/bash

set -e -x

export BRANCH=$(git symbolic-ref --short HEAD)
export APP_NAME=ervell-staging
export S3_BUCKET=assets-staging.are.na

yarn predeploy
git push --force https://git.heroku.com/$APP_NAME.git $BRANCH:master
