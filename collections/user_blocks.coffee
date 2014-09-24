#
# Collection for a group of Blocks for a user
#

SearchBlocks = require("./search_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")

module.exports = class UserBlocks extends SearchBlocks

  url: -> "#{sd.API_URL}/user/#{@slug}/search"

  initialize: (models, options) -> @slug = options.user_slug