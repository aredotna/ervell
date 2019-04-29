# !/usr/bin/bash

set -e -x

yarn assets
yarn upload-to-s3
