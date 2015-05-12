sd = require("sharify").data
Authentication = require '../../models/authentication.coffee'

@tools = (req, res, next) ->
  res.redirect("/#log_in") unless req.user
  res.redirect("/tools/bookmarklet") unless req.params.tab

  tab = res.locals.sd.TAB = req.params.tab

  res.render "index",
    tab: tab

@callback = (req, res, next) ->
  auth = new Authentication req.query
  auth.save {},
    headers:
      'X-AUTH-TOKEN': req.user.get('authentication_token')
    success: (model, response)->
      res.redirect("/tools/find-friends")
    error: (model, response, error)->
      res.redirect("/tools/find-friends")
