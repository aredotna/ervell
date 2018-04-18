Promise = require 'bluebird-q'
{ delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click a': -> delay (=> @render()), 250

  initialize: ({ @state }) ->
    @listenTo @collection, 'sync', @render
    @listenTo @state, 'change:unread_count', @render
    @listenTo @state, 'change:is_fetching', @render

    @$el
      .one 'mouseenter', =>
        @state.set('is_fetching', true)
        Promise(@collection.fetch())
          .then => @state.set('is_fetching', false)

        @collection.markRead()

        delay (=> @state.set('unread_count', 0)), 250

      .one 'mouseleave', => delay (=> @render()), 250

  render: ->
    @$el.html template
      feed: @collection
      unread_count: @state.get('unread_count')
      is_fetching: @state.get('is_fetching')

    this
