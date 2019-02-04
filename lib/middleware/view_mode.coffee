module.exports = (req, res, next) ->
  res.locals.view_mode = res.locals.sd.VIEW_MODE = 'grid'
  next()
