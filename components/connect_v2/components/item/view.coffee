Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class ConnectItemView extends Backbone.View
  className: 'Connect__item'

  events:
    click: 'toggle'

  initialize: ->
    @listenTo @model, 'change:selected', @render

  toggle: (e) ->
    e.preventDefault()

    @model.set 'selected', not @model.get('selected')

  render: ->
    @$el.html template
      channel: @model.toJSON()

    this
