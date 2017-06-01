{ delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class NotificationsView extends Backbone.View
  events:
    'click a': 'mark'

  initialize: ->
    @listenTo @collection, 'sync', @render

    @$el.one 'mouseleave', => delay (=> @mark()), 250

  mark: ->
    @collection.markRead()
    @render()

  render: ->
    @$el.html template
      feed: @collection

    this
