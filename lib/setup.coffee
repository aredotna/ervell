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
  X_APP_TOKEN
  GRAPHQL_ENDPOINT
  AIRBRAKE_PROJECT_ID
  AIRBRAKE_API_KEY
  CLIENT_GRAPHQL_ENDPOINT
  BACKBONE_SUPER_SYNC_TIMEOUT
  RECAPTCHA_SITE_KEY
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
bucketAssets = require 'bucket-assets'
favicon = require 'serve-favicon'
blocker = require 'express-spam-referral-blocker'
{ createReloadable } = require '@artsy/express-reloadable'
glob = require 'glob'
AirbrakeClient = require 'airbrake-js'
makeErrorHandler = require 'airbrake-js/dist/instrumentation/express'

localsMiddleware = require './middleware/locals'
ensureSSLMiddleware = require './middleware/ensure_ssl'
viewModeMiddleware = require './middleware/view_mode'
checkSessionMiddleware = require './middleware/check_session'
isInverted = require '../components/night_mode/middleware'
splitTestMiddleware = require '../components/split_test/middleware'
{ default: ensureWWWMiddleware } = require './middleware/ensureWWW'
{ default: isSpiderMiddleware } = require './middleware/isSpider'

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
  X_APP_TOKEN
  GRAPHQL_ENDPOINT
  CLIENT_GRAPHQL_ENDPOINT
  RECAPTCHA_SITE_KEY
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
    .use arenaPassport({ CurrentUser })
    .use checkSessionMiddleware
    .use localsMiddleware
    .use splitTestMiddleware
    .use ensureSSLMiddleware
    .use ensureWWWMiddleware
    .use isInverted
    .use viewModeMiddleware
    .use isSpiderMiddleware

  console.log 'Mounting apps...'

  if NODE_ENV is 'development'
    console.log 'Watching for changes...'
    mountAndReload = createReloadable(app, require)
    modules = _.flatten([
      glob.sync('./react/**/*.js'),
      glob.sync('./models/**/*.coffee'),
      glob.sync('./collections/**/*.coffee'),
      glob.sync('./components/**/*.coffee')
    ]).map (name) => path.resolve(name)

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
