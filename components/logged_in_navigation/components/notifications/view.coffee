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
          .then =>
            @collection.clear()
            @state.set('is_fetching', false)

      .on 'mouseleave click', (e) =>
        @collection.markRead()
        @state.set('unread_count', 0)
        
  render: ->
    @$el.html template
      feed: @collection
      unread_count: @state.get('unread_count')
      is_fetching: @state.get('is_fetching')

    this
