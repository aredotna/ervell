#
# Collection for a group of Blocks fetched via a channel
#

Blocks = require("./blocks.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class ChannelBlocks extends Blocks

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/skeleton"

  parse: (data)-> data.contents

  initialize: (models, options) -> @slug = options?.channel_slug