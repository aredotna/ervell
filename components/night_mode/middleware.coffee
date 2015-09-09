Cookies = require "cookies"
key = 'is-inverted'

module.exports = (req, res, next) ->
  cookies = new Cookies req, res
  isInverted = cookies.get key
  res.locals.sd.IS_INVERTED = true if isInverted is '1'
  next()