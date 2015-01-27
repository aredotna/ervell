#
# Auth routes
#

{ parse } = require 'url'

@logout = (req, res, next) ->
  req.logout()
  next()

@redirectBack = (req, res, next) ->
  url = req.body['redirect-to'] or
        req.query['redirect-to'] or
        req.param('redirect_uri') or
        parse(req.get('Referrer') or '').path or
        '/'
  res.redirect url