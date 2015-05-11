sd = require("sharify").data

@tools = (req, res, next) ->
  res.redirect("/#log_in") unless req.user
  res.redirect("/tools/bookmarklet") unless req.params.tab
  res.render "index",
    tab: req.params.tab