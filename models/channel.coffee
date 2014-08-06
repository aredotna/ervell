#
# Model for Channel, takes a username and channel_slug as params
#

Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class Channel extends Base

  url: -> "#{sd.API_URL}/channels/#{@slug}"

  initialize: (options) ->
    console.log 'base', @
  	@slug = options.channel_slug
  	@username = options.username