SearchBlocks = require "../../collections/search_blocks"
sd = require("sharify").data
_ = require 'underscore'
removeDiacritics = require('diacritics').remove

@search = (req, res, next) ->
  blocks = new SearchBlocks()

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.query.subject
    _.extend blocks.options, subject: req.query.subject
    res.locals.sd.SUBJECT = req.query.subject

  q = removeDiacritics req.params.query
  res.locals.sd.SEARCH = q

  request = blocks.fetch
    data:
      q: q
      auth_token: req.user?.get('authentication_token')
    success: (blocks, response, options)->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "index", blocks: blocks.models, search: q
    error: (m, err) -> next err
