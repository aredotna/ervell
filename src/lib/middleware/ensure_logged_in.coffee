module.exports = (req, res, next) ->
  unless req.user
    res.locals.sd.REDIRECT_TO = req.originalUrl
    return res.redirect("/log_in?redirect-to=#{encodeURIComponent(req.originalUrl)}")

  next()
