KEY = 'is-inverted'

module.exports = (req, res, next) ->
  isInverted = req.cookies[KEY]
  darkModeActive = req.user?.get('dark_mode')

  if isInverted is '1' or darkModeActive
    res.locals.sd.IS_INVERTED = true
    res.locals.sd.THEME = 'dark'
  else
    res.locals.sd.THEME = 'default'

  next()
