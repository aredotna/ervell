KEY = 'is-inverted'

module.exports = (req, res, next) ->
  isInverted = req.cookies[KEY]
  res.locals.sd.IS_INVERTED = true if isInverted is '1'
  next()
