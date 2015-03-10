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

  url: -> "#{sd.API_URL}/channels/#{@slugOrId()}/thumb?#{params.encode(@options)}"

  slugOrId: ->
    @slug || @id

  href: ->
    "#{@get('user')?.slug}/#{@get('slug')}"

  initialize: (options) ->
    super
    if options and options.channel_slug
      @slug = options.channel_slug
      @username = options.username

  generateShareLink: ->
    mediator.publish 'sharelink:created'

    $.post "#{sd.API_URL}/channels/#{@slugOrId()}/share", (response) =>
      @set 'share_link', response.share_link

  removeShareLink: ->
    mediator.publish 'sharelink:removed'

    $.ajax
      type: "DELETE"
      url: "#{sd.API_URL}/channels/#{@slugOrId()}/share"
      success: =>
        @unset 'share_link'