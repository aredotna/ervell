module.exports = (req, res, next) ->
  return res.redirect('/') if req.user?.id
  next()
