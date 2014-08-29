#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ API_URL, NODE_ENV, SESSION_SECRET, SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_KEY, COOKIE_DOMAIN, ASSET_PATH} = config = require "../config"

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
stylus = require "stylus"
nib = require "nib"
rupture = require 'rupture'

# Inject some constant data into sharify
sharify.data =
  API_URL: API_URL
  JS_EXT: (if "production" is NODE_ENV then ".min.js" else ".js")
  CSS_EXT: (if "production" is NODE_ENV then ".min.css" else ".css")
  ASSET_PATH: ASSET_PATH

# current user management
CurrentUser = require '../models/current_user'

module.exports = (app) ->

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
        .set('compress', true)
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
    SECURE_ARTSY_URL: API_URL

  app.use arena_pp
  app.use localsMiddleware

  # Mount apps
  app.use require "../apps/root"
  app.use require "../apps/auth"
  app.use require "../apps/user"
  app.use require "../apps/channel"

  require('artsy-error-handler') app,
    template: path.resolve(__dirname, '../components/layout/templates/error.jade')
