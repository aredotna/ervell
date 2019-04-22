cache = require '../../lib/cache'
{ NODE_ENV } = require '../../config'

@redirect = (req, res) ->
  res.redirect req.body['redirect-to'] or req.query['redirect-to']

@flushall = (req, res, next) ->
  return @next() unless req.user?.id is 15
  cache.flushall()
  res.redirect '/'

@robots = (req, res) ->
  res
    .set 'Content-Type', 'text/plain'
    .send switch NODE_ENV
      when 'production'
        'User-agent: *'
      else
        'User-agent: *\nNoindex: /'
