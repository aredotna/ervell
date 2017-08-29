express = require 'express'
{ NODE_ENV } = require '../config'

app = module.exports = express()

app
  # Normal routing
  .use require '../apps/feed'
  .use require '../apps/home'
  .use require '../apps/blog'
  .use require '../apps/authentication'
  .use require '../apps/getting_started'
  .use require '../apps/tools'
  .use require '../apps/util'
  .use require '../apps/about'
  .use require '../apps/search'
  .use require '../apps/manage'
  .use require '../apps/share'
  .use require '../apps/marklet'
  .use require '../apps/import'
  .use require '../apps/settings'
  .use require '../apps/onboarding'
  .use require '../apps/ui'

  # Dynamic routing (in order)
  .use require '../apps/user'
  .use require '../apps/block'
  .use require '../apps/channel'
  .use require '../apps/rss'

# Ennvironment specific
switch NODE_ENV
  when 'development'
    app.use require '../apps/statuses'
