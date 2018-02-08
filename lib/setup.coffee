{
  APP_URL
  API_URL
  NODE_ENV
  SESSION_SECRET
  SESSION_COOKIE_MAX_AGE
  SESSION_COOKIE_KEY
  COOKIE_DOMAIN
  ASSET_PATH
  IMAGE_PATH
  REDIS_URL
  PUSHER_KEY
  IMAGE_PROXY_URL
  GOOGLE_ANALYTICS_ID
  STRIPE_PUBLISHABLE_KEY
  BLOG_URL
  ADMIN_SLUGS
  IOS_APP_ID
  ITUNES_LINK
  HOMEPAGE_EXPLORE_USER_IDS
  GRAPHQL_ENDPOINT
  X_APP_TOKEN
} = require '../config'

express = require 'express'
Backbone = require 'backbone'
sharify = require 'sharify'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
path = require 'path'
logger = require 'morgan'
multipart = require 'connect-multiparty'
artsyError = require 'artsy-error-handler'
bucketAssets = require 'bucket-assets'
favicon = require 'serve-favicon'
blocker = require 'express-spam-referral-blocker'
{ createReloadable } = require '@artsy/express-reloadable'

localsMiddleware = require './middleware/locals'
ensureSSL = require './middleware/ensure_ssl'
viewMode = require './middleware/view_mode'
checkSession = require './middleware/check_session'
isInverted = require '../components/night_mode/middleware'
splitTestMiddleware = require '../components/split_test/middleware'
cache = require './cache'
arenaPassport = require './passport'

sharify.data = {
  NODE_ENV
  API_URL
  APP_URL
  ASSET_PATH
  IMAGE_PATH
  PUSHER_KEY
  GOOGLE_ANALYTICS_ID
  IMAGE_PROXY_URL
  STRIPE_PUBLISHABLE_KEY
  BLOG_URL
  ADMIN_SLUGS
  IOS_APP_ID
  ITUNES_LINK
  HOMEPAGE_EXPLORE_USER_IDS
  GRAPHQL_ENDPOINT
  X_APP_TOKEN
  JS_EXT: if 'production' is NODE_ENV then '.min.js.cgz' else '.js'
  CSS_EXT: if 'production' is NODE_ENV then '.min.css.cgz' else '.css'
}

CurrentUser = require '../models/current_user'

module.exports = (app) ->
  console.log "Setting up... NODE_ENV=#{NODE_ENV}"

  Backbone.sync = require 'backbone-super-sync'
  Backbone.sync.cacheClient = cache.client

  console.log 'Mounting middleware...'

  app.use sharify

  blocker.addToReferrers [
    'tkpassword.com'
    'lifehacĸer.com'
  ]

  app.use blocker.send404

  switch NODE_ENV
    when 'development'
      app
        .use(require('./webpack-dev-server'))

        .use (stylus = require 'stylus').middleware
          src: path.resolve(__dirname, '../')
          dest: path.resolve(__dirname, '../public')
          compile: (str, path) ->
            stylus(str)
              .set('filename', path)
              .use(require('rupture')())
              .use(require('nib')())

  app
    .use bucketAssets()
    .use express.static(path.resolve __dirname, '../public')
    .use favicon(path.resolve __dirname, '../public/images/favicon.ico')
    .use logger('dev')
    .use bodyParser.json()
    .use multipart()
    .use bodyParser.urlencoded(extended: true)
    .use cookieParser()
    .use session
      secret: SESSION_SECRET
      domain: COOKIE_DOMAIN
      key: SESSION_COOKIE_KEY
      maxAge: SESSION_COOKIE_MAX_AGE
    .use artsyError.helpers
    .use arenaPassport({ CurrentUser })
    .use checkSession
    .use localsMiddleware
    .use splitTestMiddleware
    .use ensureSSL
    .use isInverted
    .use viewMode

  console.log 'Mounting apps...'

  switch NODE_ENV
    when 'development'
      reloadAndMount = createReloadable(app, require)
      app.use reloadAndMount path.join(__dirname, '..', 'apps')
    else
      app.use require '../apps'

  # Convert the GraphQL error messages into some kind of matching status code
  app.use require('./middleware/error_status')

  # Drop down to error handling middleware if nothing else catches it
  # TODO: Kill this/replace with something that's not a Node module
  artsyError.handlers app,
    template: path.resolve(__dirname, '../components/layout/templates/error.jade')

  console.log 'Completed set up.'
