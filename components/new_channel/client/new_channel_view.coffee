Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'
mediator = require '../../../lib/mediator.coffee'

newChannelTemplate = -> require('../templates/new_channel.jade') arguments...

module.exports = class NewChannelView extends Backbone.View

  events:
    'keyup .grid__block__editable-title' : 'onKeyUp'
    'click .metadata--selector__option' : 'toggleVisibility'
    'click .new-channel__done-button'   : 'createChannel'

  initialize: (options)->
    @model = new Channel
      class: 'Channel'
      status: 'public'
      user: mediator.shared.current_user.attributes
      length: 0

    @render()

  onKeyUp: (e)->
    console.log '@$input.val()?.trim()', @$input.val()?.trim()
    @model.set 'title', @$input.val()?.trim()

  toggleVisibility: (e)->
    e.stopPropagation()
    e.preventDefault()

    $selection = $(e.currentTarget)

    @$(".grid__block__inner").
      attr('class', 'grid__block__inner').
      addClass "grid__block__inner--privacy-#{$selection.data('value')}"

    @$('.metadata--selector__option.is-active').removeClass 'is-active'
    $selection.addClass 'is-active'

    @model.set 'status', $selection.data('value')

    @$input.focus()

  render: ->
    @$el.html newChannelTemplate(block: @model)
    @$input = $('.grid__block__editable-title')

  createChannel: (e) ->
    return if @saving
    @saving = true

    @$('.grid__block').addClass 'grid__block--loading'
    @model.unset 'user'

    @model.url = "#{sd.API_URL}/channels/"

    @model.save null,
      success: =>
        @$('.grid__block').removeClass 'grid__block--loading'
        console.log 'saved channel'
        document.location.href = "/#{@model.get('user').username}/#{@model.get('slug')}"

