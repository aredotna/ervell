axios = require 'axios'
express = require 'express'
passport = require 'passport'
LocalStrategy = require('passport-local').Strategy
{ extend } = require 'underscore'
{ API_URL } = require '../../config'
redirectTo = require '../middleware/redirect_to'

CONFIG =
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

app = express()

authenticate = (req, res, next) ->
  passport.authenticate('local', (err, user) ->
    return next(err) if err
    return req.login(user, next) if user
    next()
  )(req, res, next)

respond = (req, res) ->
  res.send
    code: 200
    user: req.user.toJSON()

error = (err, req, res, next) ->
  console.error(err.stack)

  # Pass on to next error handler
  # if this is not an XHR request
  next(err) unless req.xhr

  # Propagate the error response to the client
  res
    .status err.response.status
    .send err.response.data

addLocals = (req, res, next) ->
  if req.user
    res.locals.user = req.user
    res.locals.sd.CURRENT_USER = req.user.toJSON()

  next()

strategy = new LocalStrategy {
  usernameField: 'email'
  passReqToCallback: true
}, (_req, email, password, done) ->
  axios
    .post "#{API_URL}/tokens", { email, password }
    .then ({ data: { token } }) ->
      done null, new CONFIG.CurrentUser(access_token: token)
    .catch done

serializeUser = (user, done) ->
  user
    .fetch data: auth_token: user.get('access_token')
    .then ->
      keys = ['access_token'].concat CONFIG.userKeys
      done null, user.pick(keys)
    .catch done

deserializeUser = (attributes, done) ->
  done null, new CONFIG.CurrentUser(attributes)

module.exports = (options = {}) ->
  extend CONFIG, options

  passport.serializeUser serializeUser
  passport.deserializeUser deserializeUser
  passport.use strategy

  app
    .use passport.initialize()
    .use passport.session()
    .post '/me/sign_in', authenticate, respond, redirectTo, error
    .use addLocals

  app
