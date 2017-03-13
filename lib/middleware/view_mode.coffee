# Set view mode from cookie
#
module.exports = (req, res, next) ->
  mode = if (req.user?.get('is_pro') is true and req.cookies['view_mode']?) then req.cookies['view_mode'] else 'grid'
  res.locals.view_mode = res.locals.sd.VIEW_MODE = mode
  next()