Channel = require "../../models/channel"
ChannelBlocks = require "../../collections/channel_blocks"
Blocks = require "../../collections/blocks"
User = require "../../models/user"
sd = require("sharify").data
_ = require 'underscore'
Q = require 'q'

@channel = (req, res, next) ->
  channel = new Channel
  skeletonUrl = channel.url
  channel.url = "#{sd.API_URL}/channels/by_share_link/#{req.params.share_token}"

  blocks = new ChannelBlocks null, channel_slug: req.params.share_token

  Q.resolve channel.fetch()

  .then ->
    channel.url = skeletonUrl
    channel.fetch
      headers: 'X-SHARE-TOKEN': req.params.share_token

  .then ->
    blocks.add channel.get 'contents'
    blocks.slug = channel.get('slug')

    res.locals.sd.SHARE_TOKEN = req.params.share_token
    res.locals.sd.CHANNEL = channel.toJSON()
    res.locals.sd.BLOCKS = blocks.toJSON()

    author = new User channel.get('user')

    res.render "index",
      channel: channel
      blocks: blocks.models
      author: author

  .catch (err) ->
    console.log err.stack
    next(err)
