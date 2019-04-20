KEY = 'is-inverted'

module.exports = (req, res, next) ->
  isInverted = req.cookies[KEY]
  if isInverted is '1'
    res.locals.sd.IS_INVERTED = true
    res.locals.sd.THEME = 'dark'
  else
    res.locals.sd.THEME = 'default'

  next()
