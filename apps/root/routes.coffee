#
# Routes file that exports route handlers for ease of testing.
#

Feed = require "../../collections/feed"
CurrentUser = require '../../models/current_user'

@index = (req, res, next) ->
  if req.user
    res.render 'feed'
  else
    res.render 'index'

