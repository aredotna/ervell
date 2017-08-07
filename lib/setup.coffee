#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ APP_URL, API_URL, NODE_ENV, SESSION_SECRET,
SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_KEY,
COOKIE_DOMAIN, ASSET_PATH, IMAGE_PATH, REDIS_URL,
PUSHER_KEY, IMAGE_PROXY_URL, GOOGLE_ANALYTICS_ID,
STRIPE_PUBLISHABLE_KEY, BLOG_URL, ADMIN_SLUGS } = config = require "../config"

_ = require 'underscore'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
arenaPassport = require 'arena-passport'
bodyParser = require 'body-parser'
localsMiddleware = require './middleware/locals'
ensureSSL = require './middleware/ensure_ssl'
viewMode = require './middleware/view_mode'
isInverted = require '../components/night_mode/middleware'
splitTestMiddleware = require '../components/split_test/middleware'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
path = require "path"
logger = require "morgan"
multipart = require 'connect-multiparty'
artsyError = require 'artsy-error-handler'
bucketAssets = require 'bucket-assets'
cache = require './cache'
favicon = require 'serve-favicon'
blocker = require 'express-spam-referral-blocker'

# Inject some constant data into sharify
sharify.data =
  NODE_ENV: NODE_ENV
  API_URL: API_URL
  APP_URL: APP_URL
  JS_EXT: (if ("production" is NODE_ENV ) then ".min.js.cgz" else ".js")
  CSS_EXT: (if ("production" is NODE_ENV) then ".min.css.cgz" else ".css")
  ASSET_PATH: ASSET_PATH
  IMAGE_PATH: IMAGE_PATH
  PUSHER_KEY: PUSHER_KEY
  GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID
  IMAGE_PROXY_URL: IMAGE_PROXY_URL
  STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY
  BLOG_URL: BLOG_URL
  ADMIN_SLUGS: ADMIN_SLUGS

# current user management
CurrentUser = require '../models/current_user'

module.exports = (app) ->

  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.cacheClient = cache.client

  # Mount sharify
  app.use sharify

  # Referral spam blocker
  blocker.addToReferrers ['tkpassword.com', 'lifehacĸer.com']
  app.use blocker.send404

  # Development only
  if "development" is NODE_ENV
    nib = require "nib"
    stylus = require "stylus"
    rupture = require 'rupture'
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
      debug: true

  # Test only
  if "test" is NODE_ENV
    # Mount fake API server
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # Assets
  app.use bucketAssets()

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")
  app.use favicon(path.resolve __dirname, '../public/images/favicon.ico')

  # session management
  app.use logger('dev')
  app.use bodyParser.json()
  app.use multipart()
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
      'id'
      'first_name'
      'last_name'
      'email'
      'slug'
      'following_ids'
      'notification_count'
      'username'
      'authentication_token'
      'manifest'
      'announcements'
      'shortcuts_id'
      'avatar_image'
      'registered'
      'receive_email'
      'receive_newsletter'
      'post_address'
      'show_tour'
      'is_premium'
      'channel_count'
      'exclude_from_indexes'
      'following_count'
      'home_path'
      'created_at'
      'private_connections_count'
      'private_connections_limit'
    ]

  app.use artsyError.helpers
  app.use arena_pp
  app.use localsMiddleware
  app.use splitTestMiddleware
  app.use ensureSSL
  app.use isInverted
  app.use viewMode

  app.get "/robots.txt", (req, res) ->
    res.set 'Content-Type', 'text/plain'
    robotsText = """
      User-agent: *
    """
    res.send switch NODE_ENV
      when 'production'
        robotsText
      else
        "User-agent: *\nNoindex: /"

  # Mount apps
  app.use require '../apps/feed'
  app.use require '../apps/home'
  app.use require '../apps/blog'
  app.use require '../apps/registration'
  app.use require '../apps/getting_started'
  app.use require '../apps/tools'
  app.use require '../apps/auth'
  app.use require '../apps/about'
  app.use require '../apps/search'
  app.use require '../apps/manage'
  app.use require '../apps/share'
  app.use require '../apps/marklet'
  app.use require '../apps/import'
  app.use require '../apps/settings'
  app.use require '../apps/onboarding'
  app.use require '../apps/ui'

  # Dev only routes
  if 'development' is NODE_ENV
    app.use require '../apps/statuses'

  # Apps that use dynamic routes
  app.use require '../apps/user'
  app.use require '../apps/block'
  app.use require '../apps/channel'
  app.use require '../apps/rss'

  # Finally 404 and error handling middleware when the request wasn't handled
  # successfully by anything above.
  artsyError.handlers app,
    template: path.resolve(__dirname, '../components/layout/templates/error.jade')
