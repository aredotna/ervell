Backbone = require 'backbone'
{ API_URL } = require('sharify').data
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click': 'markAsRead'

  initialize: ({ @state }) ->
    @listenTo @state, 'change:unread_count', @render

  markAsRead: ->
    $.post "#{API_URL}/notifications/clear"
    @state.set('unread_count', 0)

  render: ->
    @$el.html template
      unread_count: @state.get('unread_count')

    this
