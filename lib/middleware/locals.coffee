#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

# uuid = require 'node-uuid'
{ parse, format } = require 'url'
_ = require 'underscore'
_.mixin require 'underscore.string'
{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals.sd.ARENA_XAUTH_TOKEN = res.locals.arenaXappToken

  next()