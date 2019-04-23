# !/usr/bin/bash

set -e -x

rm -rf public/assets
mkdir public/assets
NODE_ENV=production yarn build
yarn build:server
stylus \
  $(find src/assets -name '*.styl') \
  --compress \
  -o public/assets
