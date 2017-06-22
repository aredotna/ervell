Authentication = require '../../models/authentication'

@index = (_req, res) ->
  res.render 'index'

@findFriendsCallback = (req, res) ->
  { query, user } = req

  authentication = new Authentication query
  authentication.save {},
    headers:
      'X-AUTH-TOKEN': user.get('authentication_token')
    complete: ->
      res.redirect('/welcome/find-friends')
