cache = require '../../lib/cache'

@redirect = (req, res) ->
  res.redirect req.body['redirect-to'] or req.query['redirect-to']

@flushall = (req, res, next) ->
  return @next() unless req.user?.id is 15
  cache.flushall()
  res.redirect '/'
