Authentication = require '../../models/authentication'
bookmarklet = require '../../lib/bookmarklet'

@tools = (req, res, next) ->
  return res.redirect('/tools/bookmarklet') unless req.params.tab
  return res.redirect('/log_in') unless req.user
  return res.redirect('/manage') if req.params.tab is 'manage'
  return res.redirect('/pricing') if req.params.tab is 'premium'

  tab = res.locals.sd.TAB = req.params.tab

  auth = new Authentication provider: 'twitter'

  res.render 'index',
    tab: tab
    auth: auth
    bookmarklet: bookmarklet

@findFriends = (req, res, next) ->
  tab = res.locals.sd.TAB = 'find-friends'
  res.render 'index',
    tab: tab
    auth: new Authentication provider: 'twitter'

@findFriendsCallback = (req, res, next) ->
  auth = new Authentication req.query
  auth.save {},
    headers:
      'X-AUTH-TOKEN': req.user.get 'authentication_token'
    complete: ->
      res.redirect '/tools/find-friends'
