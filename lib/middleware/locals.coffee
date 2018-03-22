#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

# uuid = require 'node-uuid'
{ parse, format } = require 'url'
_ = require 'underscore'
{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals._ = _
  res.locals.homeHref = req.user?.homePath() or '/'

  # TODO: remove after campaign
  # only show if the user is logged in and confirmed
  # and hasn't closed the CTA
  res.locals.showInvestCTA = (!req.cookies['invest_cta']? and req.user and req.user.get('is_confirmed'))

  next()
