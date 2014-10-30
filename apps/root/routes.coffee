#
# Routes file that exports route handlers for ease of testing.
#

Feed = require "../../collections/feed"
SearchBlocks = require "../../collections/search_blocks"
CurrentUser = require '../../models/current_user'

@index = (req, res, next) ->

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.user
    res.render 'feed'
  else
    res.render 'index'



@explore = (req, res, next) ->
  blocks = new SearchBlocks
  blocks.url = "#{res.locals.sd.API_URL}/search"

  blocks.fetch
    success: ->
      res.render "explore", blocks: blocks.models

