#
# Collection for a group of Blocks for a user
#

SearchBlocks = require("./search_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class UserBlocks extends SearchBlocks
  url: -> "#{sd.API_URL}/user/#{@slug}/search?#{params.encode(@options)}"

  initialize: (models, options) ->
    super
    @slug = options.user_slug