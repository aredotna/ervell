_ = require 'underscore'
request = require 'superagent'
express = require 'express'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
{ parse } = require 'url'
{ API_URL } = require '../../config'

opts =
  SECURE_ARENA_URL: API_URL
  loginPath: '/me/sign_in'
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
    'is_exceeding_private_connections_limit'
    'is_confirmed'
    'is_pending_reconfirmation'
    'is_pending_confirmation'
  ]

# Main function that overrides/injects any options, sets up passport, sets up an app to
# handle routing and injecting locals, and returns that app to be mounted as middleware.
module.exports = (options) =>
  module.exports.options = _.extend opts, options
  initPassport()
  initApp()
  app

# Setup the mounted app that routes signup/login and injects necessary locals.
module.exports.app = app = express()

initApp = ->
  app.use passport.initialize()
  app.use passport.session()
  app.post opts.loginPath, localAuth, afterLocalAuth
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
    res.send { success: true, user: req.user }
  else if req.xhr and not req.user?
    res.send { success: false, error: "Missing user." }
  else
    next()

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
  next()

# Setup passport.
initPassport = ->
  passport.serializeUser serializeUser
  passport.deserializeUser deserializeUser

  passport.use new LocalStrategy {
    usernameField: 'email'
    passReqToCallback: true
  }, (req, email, password, done) ->
    request
      .post "#{opts.SECURE_ARENA_URL}/tokens"
      .query {
        email
        password
      }
      .end accessTokenCallback(done)

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

# Serialize user by fetching and caching user data in the session.
serializeUser = (user, done) ->
  if user.get('access_token') isnt 'undefined'
    user.fetch
      data:
        auth_token: user.get('access_token')
      success: ->
        keys = ['access_token'].concat opts.userKeys
        done null, user.pick(keys)
      error: (m, e) ->
        done e.text
  else
    done null, user

deserializeUser = (userData, done) ->
  done null, new opts.CurrentUser(userData)
