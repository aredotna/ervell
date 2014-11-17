#
# Routes file that exports route handlers for ease of testing.
#

Feed = require "../../collections/feed"
Channel = require "../../models/channel"
SearchBlocks = require "../../collections/search_blocks"
Blocks = require "../../collections/blocks"
CurrentUser = require '../../models/current_user'
sd = require("sharify").data

@index = (req, res, next) ->

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.user
    res.render 'feed', path: 'feed'
  else
    channel = new Channel()
    channel.url = "#{sd.API_URL}/channels/arena-front-example-channels"

    channel.parse = (data) ->
      for c_channel in data.contents
        c_channel.contents = new Blocks c_channel.contents

      data

    channel.fetch
      data:
        per: 4
      cache: true
      success: ->
        res.render 'index', example_channel: channel
      error: (m, err) -> next err

@explore = (req, res, next) ->
  blocks = new SearchBlocks
  blocks.url = "#{res.locals.sd.API_URL}/search"

  blocks.fetch
    success: ->
      res.render "explore", blocks: blocks.models, path: 'explore'
    error: (m, err) -> next err

