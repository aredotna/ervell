module.exports = (req, res, next) ->
  unless req.user
    return res.redirect("/log_in?redirect-to=#{encodeURIComponent(req.originalUrl)}")

  next()
