#
# Routes file that exports route handlers for ease of testing.
#

User = require "../../models/user"
UserBlocks = require "../../collections/user_blocks"
_ = require 'underscore'

@user = (req, res, next) ->

  user = new User
    id: req.params.username

  blocks = new UserBlocks null,
    user_slug: req.params.username

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  user.fetch
    success: ->
      res.locals.sd.USER = user.toJSON()
      render()
    error: (m, err) -> next err

  blocks.fetch
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      render()
    error: (m, err) -> next err

  render = _.after 2, ->
    res.render "index", author: user, blocks: blocks.models

