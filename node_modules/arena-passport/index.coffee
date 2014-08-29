#
# Uses [passport.js](http://passportjs.org/) to setup authentication for Arena

_ = require 'underscore'
request = require 'superagent'
express = require 'express'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
qs = require 'querystring'
crypto = require 'crypto'
{ parse } = require 'url'

arenaXappToken = null

# Default options
opts =
  SECURE_ARENA_URL: 'http://staging.are.na'
  loginPath: '/me/sign_in'
  signupPath: '/me/invitation/accept'
  userKeys: ['id', 'first_name', 'last_name', 'email', 'slug', 'following_ids', 'notification_count', 'username', 'authentication_token']

#
# Main function that overrides/injects any options, sets up passport, sets up an app to
# handle routing and injecting locals, and returns that app to be mounted as middleware.
#
module.exports = (options) =>
  module.exports.options = _.extend opts, options
  initPassport()
  initApp()
  app

#
# Setup the mounted app that routes signup/login and injects necessary locals.
#
module.exports.app = app = express()

initApp = ->
  app.use passport.initialize()
  app.use passport.session()
  app.post opts.loginPath, localAuth, afterLocalAuth
  app.post opts.signupPath, signup, passport.authenticate('local'), afterLocalAuth
  app.use headerLogin
  app.use addLocals

localAuth = (req, res, next) ->
  passport.authenticate('local', (err, user, info) ->
    return req.login(user, next) if user

    res.authError = info; next()
  )(req, res, next)

afterLocalAuth = (req, res, next) ->
  if res.authError
    res.send 403, { success: false, error: res.authError }
  else if req.xhr and req.user?
    res.send { success: true }
  else if req.xhr and not req.user?
    res.send { success: false, error: "Missing user." }
  else
    next()

signup = (req, res, next) ->
  request.put(opts.SECURE_ARENA_URL + '/v2/accounts/invitation').send(
    name: req.body.name
    email: req.body.email
    password: req.body.password
    xapp_token: res.locals.artsyXappToken
  ).end onCreateUser(next)

onCreateUser = (next) ->
  (err, res) ->
    if res.status isnt 201
      errMsg = res.body.message
    else
      errMsg = err?.text
    if errMsg then next(errMsg) else next()

addLocals = (req, res, next) ->
  if req.user
    res.locals.user = req.user
    res.locals.sd?.CURRENT_USER = req.user.toJSON()
    res.locals.sd?.XAuthToken = req.user.get('authentication_token')
  next()

headerLogin = (req, res, next) ->
  if token = req.get('X-AUTH-TOKEN') or req.query.access_token
    req.login new opts.CurrentUser(accessToken: token), next
  else
    next()

#
# Setup passport.
#
initPassport = ->
  passport.serializeUser serializeUser
  passport.deserializeUser deserializeUser
  passport.use new LocalStrategy { usernameField: 'email' }, arenaCallback

#
# Passport callbacks
#
arenaCallback = (username, password, done) ->
  request.post("#{opts.SECURE_ARENA_URL}/v2/tokens").query(
    email: username
    password: password
  ).end accessTokenCallback(done)

accessTokenCallback = (done, params) ->
  return (e, res) ->
    # Catch the various forms of error Arena could encounter
    err = null
    try
      err = JSON.parse(res.text).error_description
      err ?= JSON.parse(res.text).error
    err ?= "Arena returned a generic #{res.status}" if res.status > 400
    err ?= "Arena returned no access token and no error" unless res.body.token?
    err ?= e

    # If there are no errors create the user from the access token
    unless err
      return done(null, new opts.CurrentUser(access_token: res.body.token))

    # Invalid email or password
    else if err.match?('invalid email or password')
      done null, false, err

    # Other errors
    else
      console.warn "Error requesting an access token from Arena: " + res.text
      done err

#
# Serialize user by fetching and caching user data in the session.
#
serializeUser = (user, done) ->
  user.fetch
    success: ->
      keys = ['accessToken'].concat opts.userKeys
      done null, user.pick(keys)
    error: (m, e) -> done e.text

deserializeUser = (userData, done) ->
  done null, new opts.CurrentUser(userData)
