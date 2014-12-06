Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'
mediator = require '../../../lib/mediator.coffee'

newChannelTemplate = -> require('../templates/new_channel.jade') arguments...

module.exports = class NewChannelView extends Backbone.View

  events:
    'click .metadata--selector__option' : 'toggleVisibility'

  initialize: (options)->
    @model = new Channel
      class: 'Channel'
      status: 'public'
      user: mediator.shared.current_user.attributes
      length: 0

    @render()

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

    @$('#layout-header__search__input').focus()

  render: ->
    @$el.html newChannelTemplate(block: @model)
