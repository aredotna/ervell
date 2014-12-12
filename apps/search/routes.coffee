SearchBlocks = require "../../collections/user_blocks"
sd = require("sharify").data
_ = require 'underscore'
removeDiacritics = require('diacritics').remove

@search = (req, res, next) ->
  blocks = new SearchBlocks()
  block.url = "#{sd.API_URL}/search"

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  blocks.fetch
    data: removeDiacritics query
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "index", author: user, blocks: blocks.models
    error: (m, err) -> next err

