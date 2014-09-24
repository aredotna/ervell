#
# Collection for a group of Blocks (could be users and channels as well) fetched by a search
#

Blocks = require("./blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")

module.exports = class SearchBlocks extends Blocks

  model: Block

  url: -> "#{sd.API_URL}/search"

  parse: (data)->
    _.flatten _.values _.pick(data, ['contents', 'followers', 'users', 'channels', 'following', 'blocks'])