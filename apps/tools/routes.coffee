sd = require("sharify").data
Authentication = require '../../models/authentication.coffee'

@tools = (req, res, next) ->
  res.redirect("/tools/bookmarklet") unless req.params.tab
  res.redirect("/#log_in") unless req.user
  res.redirect("/manage") if req.params.tab is 'manage'

  tab = res.locals.sd.TAB = req.params.tab
  coupon = res.locals.sd.COUPON = req.query.coupon

  res.render "index", tab: tab, coupon: coupon

@callback = (req, res, next) ->
  auth = new Authentication req.query
  auth.save {},
    headers:
      'X-AUTH-TOKEN': req.user.get('authentication_token')
    success: (model, response)->
      res.redirect("/tools/find-friends")
    error: (model, response, error)->
      res.redirect("/tools/find-friends")
