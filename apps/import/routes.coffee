sd = require("sharify").data
Authentication = require '../../models/authentication.coffee'

@import = (req, res, next) ->
  return res.redirect("/log_in") unless req.user

  tab = res.locals.sd.TAB = req.params.tab

  res.render "index", tab: tab