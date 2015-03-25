Channel = require "../../models/channel"
ChannelBlocks = require "../../collections/channel_blocks"
Blocks = require "../../collections/blocks"
User = require "../../models/user"
sd = require("sharify").data
_ = require 'underscore'

@channel = (req, res, next) ->
  channel = new Channel
  channel.url = "#{sd.API_URL}/channels/by_share_link/#{req.params.share_token}"

  blocks = new ChannelBlocks null,
    channel_slug: req.params.share_token

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  channel.fetch
    success: ->
      blocks.add channel.get 'contents'
      blocks.slug = channel.get('slug')

      res.locals.sd.SHARE_TOKEN = req.params.share_token
      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = blocks.toJSON()
      author = new User channel.get('user')

      res.render "index", channel: channel, blocks: blocks.models, author: author

    error: (m, err) -> next err