#
# Auth routes
#
Backbone = require 'backbone'
sd = require("sharify").data
{ parse } = require 'url'

@logout = (req, res, next) ->
  req.logout()
  next()

@refresh = (req, res, next) ->
  return res.redirect("/") unless req.user
  console.log 'refresh before fetch', req.user.id
  req.user.fetch
    error: res.backboneError
    success: ->
      console.log 'refresh after fetch', req.user.id
      req.login req.user, (error) ->
        if (error)
          next error
        else
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
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect url

@redirect = (req, res, next) ->
  url = req.body['redirect-to'] or req.query['redirect-to']
  res.redirect url