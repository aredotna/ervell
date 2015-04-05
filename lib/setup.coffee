#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ APP_URL, API_URL, NODE_ENV, SESSION_SECRET,
SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_KEY,
COOKIE_DOMAIN, ASSET_PATH, IMAGE_PATH, REDIS_URL,
PUSHER_KEY, GOOGLE_ANALYTICS_ID } = config = require "../config"

_ = require 'underscore'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
arenaPassport = require 'arena-passport'
bodyParser = require 'body-parser'
localsMiddleware = require './middleware/locals'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
path = require "path"
logger = require "morgan"
stylus = require "stylus"
nib = require "nib"
rupture = require 'rupture'
artsyError = require 'artsy-error-handler'
cache = require './cache'

# Inject some constant data into sharify
sharify.data =
  NODE_ENV: NODE_ENV
  API_URL: API_URL
  APP_URL: APP_URL
  JS_EXT: (if ("production" is NODE_ENV ) then ".min.js.cgz" else ".js")
  CSS_EXT: (if ("production" is NODE_ENV) then ".min.css.cgz" else ".css")
  ASSET_PATH: ASSET_PATH
  IMAGE_PATH: IMAGE_PATH
  REDIS_URL: REDIS_URL
  PUSHER_KEY: PUSHER_KEY
  GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID

# current user management
CurrentUser = require '../models/current_user'

module.exports = (app) ->

  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.cacheClient = cache.client

  # Mount sharify
  app.use sharify

  # Development only
  if "development" is NODE_ENV
    # Compile assets on request in development
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
      compile: (str, path) ->
        stylus(str)
        .set('filename', path)
        .use(rupture())
        .use(require("nib")())

    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify"), require('caching-coffeeify')]

  # Test only
  if "test" is NODE_ENV
    # Mount fake API server
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")

  # session management
  app.use logger('dev')
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use cookieParser()
  app.use session
    secret: SESSION_SECRET
    domain: COOKIE_DOMAIN
    key: SESSION_COOKIE_KEY
    maxage: SESSION_COOKIE_MAX_AGE

  arena_pp = arenaPassport _.extend config,
    CurrentUser: CurrentUser
    SECURE_ARENA_URL: API_URL
    userKeys: [
      'id',
      'first_name',
      'last_name',
      'email',
      'slug',
      'following_ids',
      'notification_count',
      'username',
      'authentication_token',
      'manifest',
      'announcements',
      'shortcuts_id',
      'avatar_image',
      'registered'
    ]

  app.use artsyError.helpers
  app.use arena_pp
  app.use localsMiddleware

  # Mount apps
  app.use require "../apps/root"
  app.use require "../apps/auth"
  app.use require "../apps/about"
  app.use require "../apps/search"
  app.use require "../apps/manage"
  app.use require "../apps/share"
  app.use require "../apps/user"
  app.use require "../apps/channel"

  # Finally 404 and error handling middleware when the request wasn't handled
  # successfully by anything above.
  artsyError.handlers app,
    template: path.resolve(__dirname, '../components/layout/templates/error.jade')
