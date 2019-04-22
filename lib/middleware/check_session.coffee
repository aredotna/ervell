module.exports = (req, res, next) ->
  unless req.user?.id
    res.locals.user = null
    req.user = null
  next()
