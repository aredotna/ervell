#
# Routes file that exports route handlers for ease of testing.
#

Feed = require "../../collections/feed"
CurrentUser = require '../../models/current_user'

@index = (req, res, next) ->
  if req.user
    feed = new Feed type: 'primary'
    feed.fetch
      success: ->
        console.log 'feed', feed
        res.render 'feed'
  else
    res.render 'index'

