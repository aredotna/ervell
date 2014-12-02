#
# Model for Channel, takes a username and channel_slug as params
#

Block = require "./block.coffee"
sd = require("sharify").data
params = require 'query-params'

module.exports = class Channel extends Block
  defaultOptions:
    direction: 'desc'
    sort: 'position'

  url: -> "#{sd.API_URL}/channels/#{@slug}/thumb?#{params.encode(@options)}"

  initialize: (options) ->
    super
    if options
      @slug = options.channel_slug
      @username = options.username