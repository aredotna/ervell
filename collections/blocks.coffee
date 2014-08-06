#
# General collection for a group of Blocks
#

Base = require("./base.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class Blocks extends Base

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/contents?per=10"

  initialize: (models, options) ->
    console.log 'options', options
    @slug = options.channel_slug