Backbone = require 'backbone'
Backbone.$ = $

template = -> require('../templates/channel_visibility.jade') arguments...

module.exports = class ChannelVisibilityView extends Backbone.View
  autoRender: true
  autoSync: false

  events:
    'click .metadata--selector__option' : 'toggleVisibility'

  initialize: (options) ->
    @autoRender = options.autoRender || @autoRender
    @autoSync = options.autoSync || @autoSync

    @render() if @autoRender

  render: ->
    @$el.html template()

  toggleVisibility: (e) =>
    e.stopPropagation()
    e.preventDefault()

    $selection = $(e.currentTarget)

    @$('.metadata--selector__option.is-active').removeClass 'is-active'
    $selection.addClass 'is-active'

    @model.set 'status', $selection.data('value')
    @model.url = "#{sd.API_URL}/channels/"
    @model.save() if @autoSync


