Backbone = require 'backbone'
analytics = require '../../../../lib/analytics.coffee'
template = -> require('./index.jade') arguments...

module.exports = class HomePathFieldView extends Backbone.View
  className: 'Fieldset'

  events:
    'change select': 'select'

  initialize: ->
    @listenTo @model, 'change:home_path', @render

  select: (e) ->
    $target = $(e.currentTarget)
    @model.set 'home_path', $target.val()

    analytics.track.submit 'User switched home path', 
      label: 'Home path'
      value: $target.text()

  render: ->
    @$el.html template
      user: @model

    this
