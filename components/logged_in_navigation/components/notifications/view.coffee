{ delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click a': -> delay (=> @render()), 250

  initialize: ({ @count }) ->
    @listenTo @collection, 'sync', @render
    @listenTo @count, 'change:unread_count', @render

    @$el
      .one 'mouseenter', =>
        @collection.fetch()
        @collection.markRead()

        delay (=> @count.set('unread_count', 0)), 250

      .one 'mouseleave', => delay (=> @render()), 250

  render: ->
    @$el.html template
      feed: @collection
      unread_count: @count.get('unread_count')

    this
