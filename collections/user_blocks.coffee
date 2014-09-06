#
# Collection for a group of Blocks for a user
#

Base = require("./base.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class UserBlocks extends Base

  model: Block

  url: -> "#{sd.API_URL}/user/#{@slug}/search"

  parse: (data)-> data.blocks

  initialize: (models, options) -> @slug = options.user_slug