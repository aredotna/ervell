Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  initialize: ({ @state }) ->
    @listenTo @state, 'change:unread_count', @render

  render: ->
    @$el.html template
      unread_count: @state.get('unread_count')

    this
