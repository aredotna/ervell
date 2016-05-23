# Set view mode from cookie
#
module.exports = (req, res, next) ->
  res.locals.view_mode = if (mode = req.cookies['view_mode']) then mode else 'grid'
  res.locals.sd.VIEW_MODE = mode
  next()