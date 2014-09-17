#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
Blocks = require "../../collections/blocks"
User = require "../../models/user"

@channel = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  blocks = new Blocks null,
    channel_slug: req.params.channel_slug

  channel.fetch
    cache: true
    success: ->
      blocks.add channel.contents

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = blocks.toJSON()
      author = new User channel.get('user')

      res.render "index", channel: channel, blocks: blocks.models, author: author

    error: (m, err) -> next err

