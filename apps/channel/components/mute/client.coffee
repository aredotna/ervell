Backbone = require 'backbone'

template =-> require('./index.jade') arguments...

module.exports = class MuteView extends Backbone.View

  events:
    'click a' : 'toggleMute'

  initialize: ->
    @listenTo @model, 'change:is_muted', @render, @

  toggleMute: ->
    @model.toggleMute()

  render: ->
    @$el.html template
      is_muted: @model.get 'is_muted'  