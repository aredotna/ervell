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
  STRIPE_PUBLISHABLE_KEY
  BLOG_URL
  ADMIN_SLUGS
  IOS_APP_ID
  ITUNES_LINK
  ANDROID_LINK
  HOMEPAGE_EXPLORE_USER_IDS
  X_APP_TOKEN
  GRAPHQL_ENDPOINT
  AIRBRAKE_PROJECT_ID
  AIRBRAKE_API_KEY
  CLIENT_GRAPHQL_ENDPOINT
  CLIENT_CONTENTFUL_GRAPHQL_ENDPOINT
  BACKBONE_SUPER_SYNC_TIMEOUT
  RECAPTCHA_SITE_KEY,
  IP_DENYLIST,
  USE_CSP,
  CSP_SRCS,
} = require '../config'

_ = require 'underscore'
express = require 'express'
Backbone = require 'backbone'
sharify = require 'sharify'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
path = require 'path'
logger = require 'morgan'
multipart = require 'connect-multiparty'
favicon = require 'serve-favicon'
blocker = require 'express-spam-referral-blocker'
{ createReloadable } = require '@artsy/express-reloadable'
glob = require 'glob'
AirbrakeClient = require 'airbrake-js'
makeErrorHandler = require 'airbrake-js/dist/instrumentation/express'
stylus = require 'stylus'
{ IpFilter: ipfilter } = require "express-ipfilter"
proxyaddr = require('proxy-addr')

localsMiddleware = require './middleware/locals'
ensureSSLMiddleware = require './middleware/ensure_ssl'
viewModeMiddleware = require './middleware/view_mode'
checkSessionMiddleware = require './middleware/check_session'
isInverted = require '../components/night_mode/middleware'
{ default: assetMiddleware } = require "./middleware/asset"
{ default: isSpiderMiddleware } = require './middleware/isSpider'
{ default: ensureWWWMiddleware } = require './middleware/ensureWWW'
{ default: rateLimiterMiddleware } = require './middleware/rateLimit'

cache = require './cache'
arenaPassport = require './passport'

sharify.data = {
  NODE_ENV
  API_URL
  APP_URL
  ASSET_PATH
  IMAGE_PATH
  PUSHER_KEY
  IMAGE_PROXY_URL
  STRIPE_PUBLISHABLE_KEY
  BLOG_URL
  ADMIN_SLUGS
  IOS_APP_ID
  ANDROID_LINK
  ITUNES_LINK
  HOMEPAGE_EXPLORE_USER_IDS
  X_APP_TOKEN
  GRAPHQL_ENDPOINT
  CLIENT_GRAPHQL_ENDPOINT
  CLIENT_CONTENTFUL_GRAPHQL_ENDPOINT
  RECAPTCHA_SITE_KEY
  USE_CSP
  CSP_SRCS
  JS_EXT: if 'production' is NODE_ENV then '.min.js.cgz' else '.js'
  CSS_EXT: if 'production' is NODE_ENV then '.min.css.cgz' else '.css'
}

CurrentUser = require '../models/current_user'

airbrake = new AirbrakeClient({
  projectId: AIRBRAKE_PROJECT_ID,
  projectKey: AIRBRAKE_API_KEY,
})

airbrake.addFilter (notice) ->
  return null if (
    # Ignores 404s
    (notice.errors[0].message is 'Not found') or
    # Ignores 401s
    (notice.errors[0].message is 'Access denied') or
    # Ignores 400s
    (notice.errors[0].message is 'Bad request')
  )

  notice

module.exports = (app) ->
  console.log "Setting up... NODE_ENV=#{NODE_ENV}"

  Backbone.sync = require 'backbone-super-sync'
  Backbone.sync.timeout = parseInt(BACKBONE_SUPER_SYNC_TIMEOUT, 10)
  Backbone.sync.cacheClient = cache.client

  console.log 'Mounting middleware...'

  app.use sharify

  blocker.addToReferrers [
    'tkpassword.com'
    'lifehacĸer.com'
  ]

  #  Denied IPs
  ipFilterMiddleware = ipfilter(IP_DENYLIST.split(","), {
    allowedHeaders: ["x-forwarded-for"],
    mode: "deny",
    log: false,
    detectIp: (req) ->
      ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      return ip
  })

  app.use blocker.send404

  switch NODE_ENV
    when 'development'
      app
        .use(require('./webpack-dev-server'))

        .use (stylus).middleware
          src: path.resolve(__dirname, '../')
          dest: path.resolve(__dirname, '../../public')
          compile: (str, path) ->
            stylus(str)
              .set('filename', path)
              .use(require('rupture')())
              .use(require('nib')())

  app
    .use assetMiddleware()
    .use ipFilterMiddleware
    .use express.static(path.resolve __dirname, '../../public')
    .use favicon(path.resolve __dirname, '../../public/images/favicon.ico')
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
    .use arenaPassport({ CurrentUser })
    .use checkSessionMiddleware
    .use localsMiddleware
    .use ensureSSLMiddleware
    .use ensureWWWMiddleware
    .use isInverted
    .use viewModeMiddleware
    .use isSpiderMiddleware
    .use rateLimiterMiddleware

  console.log 'Mounting apps...'

  if NODE_ENV is 'development'
    console.log 'Watching for changes...'
    mountAndReload = createReloadable(app, require)
    modules = _.flatten([
      glob.sync('./src/v2/**/*.{js,jsx,ts,tsx}'),
      glob.sync('./src/models/**/*.coffee'),
      glob.sync('./src/collections/**/*.coffee'),
      glob.sync('./src/components/**/*.coffee')
    ]).map (name) -> path.resolve(name)

    app.use mountAndReload path.join(__dirname, '..', 'apps'), {
      watchModules: modules
    }
  else
    app.use require '../apps'

  # Convert the GraphQL error messages into some kind of matching status code
  app.use require('./middleware/errorStatus.js').default
  app.use(makeErrorHandler(airbrake))
  app.use(require('../apps/errors').default)

  console.log 'Completed set up.'
