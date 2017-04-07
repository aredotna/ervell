module.exports = (req, res, next) ->
  return res.redirect('/log_in') unless req.user
  next()
