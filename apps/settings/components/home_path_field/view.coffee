Backbone = require 'backbone'
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

  render: ->
    @$el.html template
      user: @model

    this
