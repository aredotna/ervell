Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  initialize: ->
    @listenTo @collection, 'sync', @render

    @$el.one 'mouseout', =>
      @collection.markRead()
      @render()

  render: ->
    @$el.html template
      feed: @collection

    this
