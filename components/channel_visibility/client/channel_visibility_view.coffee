Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
analytics = require '../../../lib/analytics.coffee'

template = -> require('../templates/channel_visibility.jade') arguments...

module.exports = class ChannelVisibilityView extends Backbone.View
  defaults:
    autoRender: true
    autoSync: false

  events:
    'click .metadata--selector__option' : 'toggleVisibility'

  initialize: (options) ->
    { @autoRender, @autoSync } = _.defaults options, @defaults

    @render() if @autoRender

  render: ->
    @$el.html template channel: @model

  toggleVisibility: (e) =>
    e.stopPropagation()
    e.preventDefault()

    $selection = $(e.currentTarget)

    @$('.metadata--selector__option.is-active').removeClass 'is-active'
    $selection.addClass 'is-active'

    analytics.track.click "Channel visibility changed to #{$selection.data('value')}"

    @model.set 'status', $selection.data('value')
    @model.url = "#{sd.API_URL}/channels/#{@model.id}"
    @model.save() if @autoSync


