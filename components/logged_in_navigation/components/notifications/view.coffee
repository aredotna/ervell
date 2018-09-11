Promise = require 'bluebird-q'
{ delay, once } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click .js-notifications-badge': 'toggle'
    # 'click a': -> delay (=> @render()), 250
    # 'click': 'markAsRead'

  initialize: ({ @state }) ->
    @listenTo @collection, 'sync', @render
    @listenTo @state, 'change:unread_count', @render
    @listenTo @state, 'change:is_fetching', @render
    @listenTo @state, 'change:is_visible', @render

    $(document).on('click', (e) =>
      e.preventDefault()

      if @state.get('is_visible')
        e.stopPropagation()
        @state.set('is_visible', false)
    )

  toggle: (e) ->
    e.preventDefault()

    @state.set('is_visible', !@state.get('is_visible'))

    unless @state.get('is_booted')
      @state.set({ is_fetching: true })

      Promise(@collection.fetch())
        .then =>
          @collection.clear()

          @state.set({
            is_fetching: false,
            is_booted: true,
          })

  markAsRead: ->
    @collection.markRead()

    @state.set('unread_count', 0)

  render: ->
    @$el.html template
      feed: @collection
      unread_count: @state.get('unread_count')
      is_fetching: @state.get('is_fetching')
      is_visible: @state.get('is_visible')

    this
