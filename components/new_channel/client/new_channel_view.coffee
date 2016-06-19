_ = require 'underscore'
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
DropdownView = require '../../dropdown/client/dropdown_view.coffee'
ChannelVisibilityView = require '../../channel_visibility/client/channel_visibility_view.coffee'

template = -> require('../templates/new_channel.jade') arguments...

module.exports = class NewChannelView extends DropdownView

  events:
    'click .new-channel__done-button' : 'createChannel'
    'keyup .grid__block__editable-title' : 'onKeyUp'
    'click .metadata--selector__option' : 'toggleVisibility'

  initialize: (options)->
    @model = new Channel
      base_class: 'Channel'
      class: 'Channel'
      status: 'closed'
      user: mediator.shared.current_user.attributes
      length: 0

    @listenTo @model, 'change:status', @toggleVisibility

    @render()

    mediator.on 'search:loaded', @closeDropdown, @
    mediator.on 'body:click', @onBodyClick, @

    if $('body').hasClass 'is-mobile'
      @$el.on 'tap .js-dropdown-trigger', @toggleDropdown
    else
      @$el.on 'mouseover', @onMouseOver
      @$el.on 'mouseout', @onMouseOut

  onKeyUp: (e)->
    @model.set 'title', @$input.val()?.trim()

  createChannel: (e) ->
    @saving = true

    @$('.grid__block').addClass 'grid__block--loading'
    @model.unset 'user'

    @model.url = "#{sd.API_URL}/channels/"

    @model.save null,
      success: =>
        analytics.track.click "New Channel created"
        @$('.grid__block').removeClass 'grid__block--loading'
        document.location.href = "/#{@model.get('user').slug}/#{@model.get('slug')}"

  toggleVisibility: (model)->
    @$(".grid__block__inner").
      attr('class', 'grid__block__inner').
      addClass "grid__block__inner--privacy-#{@model.get('status')}"

    @$input.focus()

  render: ->
    @$('.new-channel-dropdown__container').html template block: @model
    @$input = $('.grid__block__editable-title')

    @renderChannelVisibility()

  renderChannelVisibility: ->
    new ChannelVisibilityView
      el: @$('.grid__block__privacy--setting__inner')
      model: @model
