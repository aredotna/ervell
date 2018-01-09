Promise = require 'bluebird-q'
{ extend } = require 'underscore'
params = require 'query-params'
{ API_URL, APP_URL } = require('sharify').data
mediator = require '../lib/mediator.coffee'
Block = require './block.coffee'
User = require './user.coffee'
ChannelFollowers = require '../collections/channel_followers.coffee'
ChannelBlocks = require '../collections/channel_blocks.coffee'

module.exports = class Channel extends Block
  defaultOptions:
    direction: 'desc'
    sort: 'position'
    per: 6
    page: 1

  url: ->
    "#{API_URL}/channels/#{@slugOrId()}/skeleton?#{params.encode(@options)}"

  urlRoot: ->
    "#{API_URL}/channels/#{@slugOrId()}"

  href: ->
    "/#{@get('user')?.slug}/#{@get('slug')}"

  sync: (method, model, options) ->
    switch method
      when 'update', 'delete'
        options.url = "#{API_URL}/channels/#{@id}"
    super

  slugOrId: ->
    @id or @get('slug')

  shareHref: ->
    "#{APP_URL}/share/#{@get('share_link')}"

  checkIfMuted: ->
    $.get "#{API_URL}/channels/#{@slugOrId()}/is_muted", (response) =>
      @set response

  toggleMute: ->
    if @get('is_muted') is false then @muteChannel() else @unmuteChannel()

  muteChannel: ->
    $.post "#{API_URL}/channels/#{@slugOrId()}/mute", (response) =>
      @set 'is_muted', true

  unmuteChannel: ->
    $.ajax
      type: "DELETE"
      url: "#{API_URL}/channels/#{@slugOrId()}/mute"
      success: =>
        @set 'is_muted', false

  generateShareLink: ->
    mediator.trigger 'sharelink:created'

    Promise $.post "#{API_URL}/channels/#{@slugOrId()}/share", (response) =>
      @set 'share_link', response.share_link

  removeShareLink: ->
    mediator.trigger 'sharelink:removed'

    Promise $.ajax
      type: "DELETE"
      url: "#{API_URL}/channels/#{@slugOrId()}/share"
      success: =>
        @unset 'share_link'

  related: ->
    @__related__ ?=
      followers: new ChannelFollowers null, id: @slugOrId()

    extend {}, @__related__,
      author: new User @get('user')
      blocks: new ChannelBlocks @get('contents'), channel_slug: @get('slug')
