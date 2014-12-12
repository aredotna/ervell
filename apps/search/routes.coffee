SearchBlocks = require "../../collections/search_blocks"
sd = require("sharify").data
_ = require 'underscore'
removeDiacritics = require('diacritics').remove

@search = (req, res, next) ->
  blocks = new SearchBlocks()

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  q = removeDiacritics req.params.query
  res.locals.sd.SEARCH = q

  blocks.fetch
    data:
      q: q
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "index", blocks: blocks.models, search: q
    error: (m, err) -> next err

