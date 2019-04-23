# !/usr/bin/bash

set -e -x

rm -rf public/assets
mkdir public/assets
NODE_ENV=production yarn build
stylus \
  $(find src/assets -name '*.styl') \
  --compress \
  -o public/assets
