# !/usr/bin/bash

set -e -x

trap "exit" INT

# yarn assets # Not needed yet
yarn mocha $(find test -name '*.coffee' -not -path 'test/helpers/*')
# yarn mocha $(find test -name '*.js' -not -path 'test/helpers/*') # Not needed yet
