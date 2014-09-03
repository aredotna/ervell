#
# Routes file that exports route handlers for ease of testing.
#

Feed = require "../../collections/feed"
CurrentUser = require '../../models/current_user'

@index = (req, res, next) ->
  if req.user
    feed = new Feed type: 'primary', user: req.user
    feed.fetch
      success: ->
        res.render 'feed', feed: feed.models
  else
    res.render 'index'

