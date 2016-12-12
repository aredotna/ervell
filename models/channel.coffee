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
    per: 6
    page: 1

  url: -> "#{sd.API_URL}/channels/#{@slugOrId()}/skeleton?#{params.encode(@options)}"

  urlRoot: -> "#{sd.API_URL}/channels/#{@slugOrId()}"

  href: -> "#{sd.APP_URL}/#{@get('user').slug}/#{@slugOrId()}"

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

  checkIfMuted: ->
    $.get "#{sd.API_URL}/channels/#{@slugOrId()}/is_muted", (response) =>
      @set response

  toggleMute: ->
    if @get('is_muted') is false then @muteChannel() else @unmuteChannel()

  muteChannel: ->
    $.post "#{sd.API_URL}/channels/#{@slugOrId()}/mute", (response) =>
      @set 'is_muted', true

  unmuteChannel: ->
    $.ajax
      type: "DELETE"
      url: "#{sd.API_URL}/channels/#{@slugOrId()}/mute"
      success: =>
        @set 'is_muted', false

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