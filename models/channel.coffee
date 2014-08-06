#
# Model for Channel, takes a username and channel_slug as params
#

Backbone = require "backbone"
sd = require("sharify").data

module.exports = class Channel extends Backbone.Model

  url: -> "#{sd.API_URL}/channels/#{@slug}"

  initialize: (options) ->
  	@slug = options.channel_slug
  	@username = options.username