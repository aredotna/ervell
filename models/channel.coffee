#
# Model for Channel, takes a username and channel_slug as params
#

Block = require "./block.coffee"
sd = require("sharify").data
params = require 'query-params'
mediator = require '../lib/mediator.coffee'

module.exports = class Channel extends Block
  defaultOptions:
    direction: 'desc'
    sort: 'position'

  url: -> "#{sd.API_URL}/channels/#{@slugOrId()}/thumb?#{params.encode(@options)}"

  href: -> "/#{@get('user').slug}/#{@slugOrId()}"

  sync: (method, model, options) ->
    switch method
      when 'update', 'delete'
        options.url = "#{sd.API_URL}/channels/#{@id}"
    super

  slugOrId: ->
    @slug || @id

  href: ->
    "/#{@get('user')?.slug}/#{@get('slug')}"

  initialize: (options) ->
    super
    if options and options.channel_slug
      @slug = options.channel_slug
      @username = options.username

  shareHref: ->
    "#{sd.APP_URL}/share/#{@get('share_link')}"

  generateShareLink: ->
    mediator.trigger 'sharelink:created'

    $.post "#{sd.API_URL}/channels/#{@slugOrId()}/share", (response) =>
      @set 'share_link', response.share_link

  removeShareLink: ->
    mediator.trigger 'sharelink:removed'

    $.ajax
      type: "DELETE"
      url: "#{sd.API_URL}/channels/#{@slugOrId()}/share"
      success: =>
        @unset 'share_link'