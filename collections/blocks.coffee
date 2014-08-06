#
# General collection for a group of Blocks
#

Backbone = require("backbone")
sd = require("sharify").data
Commit = require("../models/block.coffee")

module.exports = class Blocks extends Backbone.Collection

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/contents"

  initialize: (models, options) ->
    @slug = options.slug