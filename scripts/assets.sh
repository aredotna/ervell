# !/usr/bin/bash

set -e -x

yarn clean
rm -rf .cache
rm -f manifest.json
rm -rf public
mkdir -p public/assets
NODE_ENV=production yarn build
yarn build:server
yarn build:bookmarklet:prod
stylus \
$(find src/assets -name '*.styl') \
--compress \
-o public/assets
