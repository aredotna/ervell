{ delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  initialize: ->
    @listenTo @collection, 'sync', @render

    @$el.one 'mouseleave', => delay =>
      @collection.markRead()
      @render()
    , 250

  render: ->
    @$el.html template
      feed: @collection

    this
