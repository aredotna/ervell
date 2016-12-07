Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
analytics = require '../../../lib/analytics.coffee'

template = -> require('../templates/channel_visibility.jade') arguments...

copyMap = 
  public: 'Everyone can view the channel and anyone logged-in can add to it.'
  closed: 'Everyone can view the channel but only you and your collaborators can add to it.'
  private: 'Only you and your collaborators can view and add to the channel.'

module.exports = class ChannelVisibilityView extends Backbone.View
  defaults:
    autoRender: true
    autoSync: false

  events:
    'click .metadata--selector__option' : 'toggleVisibility'

  initialize: (options) ->
    { @autoRender, @autoSync } = _.defaults options, @defaults

    @render() if @autoRender

    @listenTo @model, 'change:status', @render, @

  render: ->
    @$el.html template 
      channel: @model
      description: copyMap[@model.get('status')]

  toggleVisibility: (e) =>
    e.stopPropagation()
    e.preventDefault()

    $selection = $(e.currentTarget)

    analytics.track.click "Channel visibility changed to #{$selection.data('value')}"

    @model.set 'status', $selection.data('value')
    @model.url = "#{sd.API_URL}/channels/#{@model.id}"
    @model.save() if @autoSync


