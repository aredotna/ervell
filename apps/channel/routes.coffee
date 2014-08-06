#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
Blocks = require "../../collections/blocks"

@channel = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  blocks = new Blocks null,
    channel_slug: req.params.channel_slug

  channel.fetch
    success: ->
      blocks.fetch
        success: ->
          res.locals.sd.USERNAME = req.params.username
          res.locals.sd.CHANNEL = channel.toJSON()
          res.locals.sd.BLOCKS = blocks.toJSON()

          console.log 'blocks', blocks

          res.render "index", channel: channel, blocks: blocks.models
    error: (m, err) -> next err.text