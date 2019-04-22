# !/usr/bin/bash

set -e -x

rm -rf public/assets
mkdir public/assets
NODE_ENV=production webpack
stylus \
  $(find assets -name '*.styl') \
  --compress \
  -o public/assets
