#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"

@channel = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  channel.fetch
    success: ->
      res.locals.sd.USERNAME = req.params.username
      res.locals.sd.CHANNEL = channel.toJSON()
      res.render "index", channel: channel
    error: (m, err) -> next err.text