#
# Model for a single block
#

Backbone = require "backbone"
sd = require("sharify").data

module.exports = class Block extends Backbone.Model

  url: -> "#{sd.API_URL}/blocks/#{@id}"

  initialize: (options) ->
    @id = options.channel_slug