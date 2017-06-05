{ delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click a': => delay (=> @render()), 250

  initialize: ->
    @listenTo @collection, 'sync', @render

    @$el
      .one 'mouseenter', => @collection.markRead()
      .one 'mouseleave', => delay (=> @render()), 250

  render: ->
    @$el.html template
      feed: @collection

    this
