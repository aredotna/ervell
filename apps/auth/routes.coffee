#
# Auth routes
#

{ parse } = require 'url'

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
          res.json req.user.attributes

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