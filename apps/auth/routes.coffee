#
# Auth routes
#
Backbone = require 'backbone'
sd = require("sharify").data
User = require "../../models/user"
cache = require "../../lib/cache.coffee"
sanitizeRedirect = require '../../components/sanitize_redirect/index'
{ parse } = require 'url'

clearCache = (user) ->
  user = new User user.attributes
  cache.del "#{user.url()}{}"

@logIn = (req, res, next) ->
  return res.redirect('/') if req.user?.id
  res.locals.sd.REDIRECT_TO = req.session.redirectTo || req.query['redirect-to']
  res.locals.sd.MODE = 'login'
  res.render 'log_in'

@signUp = (req, res, next) ->
  return res.redirect('/') if req.user?.id
  res.locals.sd.MODE = 'signup'
  res.render 'sign_up'

@logout = (req, res, next) ->
  req.logout()
  next()

@refresh = (req, res, next) ->
  return res.redirect("/") unless req.user
  req.user.fetch
    error: res.backboneError
    success: ->
      req.login req.user, (error) ->
        if (error)
          next error
        else
          clearCache req.user
          res.json req.user.attributes

@resetPassword = (req, res, next) ->
  return next() if req.user
  res.locals.sd.TOKEN = req.params.token
  res.render 'reset_password'

@settings = (req, res, next) ->
  return next() unless req.user
  res.render 'settings'

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.param('redirect_uri') or
        req.session.redirectTo or
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect url

@redirect = (req, res, next) ->
  url = req.body['redirect-to'] or req.query['redirect-to']
  res.redirect url
