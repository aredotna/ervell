#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
Block = require "../../models/block"
User = require "../../models/user"
markdown = require 'marked'
sd = require("sharify").data
_ = require 'underscore'

@block = (req, res, next) ->
  block = new Block id: req.params.block_id

  block.fetch
    error: res.backboneError
    data:
      auth_token: req.user?.get('authentication_token')
    success: ->
      res.locals.sd.BLOCK = block.toJSON()
      res.render 'index',
        block: block
        md: markdown
