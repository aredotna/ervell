#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
ChannelBlocks = require "../../collections/channel_blocks"
Blocks = require "../../collections/blocks"
User = require "../../models/user"
sd = require("sharify").data
_ = require 'underscore'

@channel = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  blocks = new ChannelBlocks null,
    channel_slug: req.params.channel_slug

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  channel.fetch
    cache: true
    success: ->
      blocks.add channel.get 'contents'

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = blocks.toJSON()
      author = new User channel.get('user')

      res.render "index", channel: channel, blocks: blocks.models, author: author

    error: (m, err) -> next err

@followers = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  author = new User {}

  blocks = new Blocks null
  blocks.url = "#{sd.API_URL}/channels/#{req.params.channel_slug}/followers"

  blocks.parse = (data)-> data.users

  channel.fetch
    success: =>
      res.locals.sd.CHANNEL = channel.toJSON()
      author = new User channel.get('user')
      render()

  blocks.fetch
    cache: true
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWERS = blocks.toJSON()
      render()
    error: (m, err) -> next err


  render = _.after 2, -> res.render "index", channel: channel, blocks: blocks.models, author: author, followers: true


