# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).

{ parse, format } = require 'url'
_ = require 'underscore'
{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->
  res.locals.sd.CURRENT_URL = req.url
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals._ = _
  res.locals.homeHref = req.user?.homePath() or '/'

  # Respect do not track headers
  res.locals.doNotTrack = res.locals.sd.DO_NOT_TRACK = req.headers.dnt || false

  next()
