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
  JS_EXT: if 'production' is NODE_ENV then '.min.js.cgz' else '.js'
  CSS_EXT: if 'production' is NODE_ENV then '.min.css.cgz' else '.css'
}

CurrentUser = require '../models/current_user'

module.exports = (app) ->
  console.log "Setting up... NODE_ENV=#{NODE_ENV}"

  Backbone.sync = require 'backbone-super-sync'
  Backbone.sync.cacheClient = cache.client

  console.log 'Mounting middleware...'

  app.use (req, res, next) ->
    console.log 'Passing through middleware'
    next()

  app.use sharify

  blocker.addToReferrers [
    'tkpassword.com'
    'lifehacĸer.com'
  ]

  app.use blocker.send404

  switch NODE_ENV
    when 'development'
      app
        .use (stylus = require 'stylus').middleware
          src: path.resolve(__dirname, '../')
          dest: path.resolve(__dirname, '../public')
          compile: (str, path) ->
            stylus(str)
              .set('filename', path)
              .use(require('rupture')())
              .use(require('nib')())

        .use require('browserify-dev-middleware')
          src: path.resolve(__dirname, '../')
          transforms: [require('jadeify'), require('caching-coffeeify')]
          debug: true

    when 'test' # lol
      app.use '/__api', require('../test/helpers/integration.coffee').api

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

  app.use (req, res, next) ->
    console.log 'Passing through routes'
    next()

  app
    # Normal routing: In order
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
    # Dynamic routing: In order
    .use require '../apps/user'
    .use require '../apps/block'
    .use require '../apps/channel'
    .use require '../apps/rss'

  switch NODE_ENV
    when 'development'
      app.use require '../apps/statuses'

  # Drop down to error handling middleware if nothing else catches it
  # TODO: Kill this/replace with something that's not a Node module
  artsyError.handlers app,
    template: path.resolve(__dirname, '../components/layout/templates/error.jade')

  console.log 'Completed set up.'
