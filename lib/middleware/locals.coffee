#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

# uuid = require 'node-uuid'
{ parse, format } = require 'url'
_ = require 'underscore'
_.mixin require 'underscore.string'
{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->
  # Pass the user agent into locals for data-useragent device detection
  res.locals.userAgent = req.get('user-agent')

  # Inject some project-wide sharify data such as the session id, the current path
  # and the xapp token.
  # res.locals.sd.SESSION_ID = req.session?.id ?= uuid.v1()
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals.sd.ARENA_XAUTH_TOKEN = res.locals.arenaXappToken

  next()