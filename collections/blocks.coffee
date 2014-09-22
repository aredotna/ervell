#
# General collection for a group of Blocks
#

Base = require("./base.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class Blocks extends Base

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/skeleton"

  parse: (data)-> data.contents

  initialize: (models, options) -> @slug = options.channel_slug