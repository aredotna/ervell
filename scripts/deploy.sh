# !/usr/bin/bash

set -e -x

yarn predeploy
if [ -z "$BRANCH_NAME" ]; then
  git push --force https://git.heroku.com/$APP_NAME.git master
else
  git push --force https://git.heroku.com/$APP_NAME.git $BRANCH_NAME:master
fi
