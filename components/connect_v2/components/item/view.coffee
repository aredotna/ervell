Backbone = require 'backbone'
Promise = require 'bluebird-q'
AsyncSerialQueue = require '../../../../lib/async_serial_queue.coffee'
mediator = require '../../../../lib/mediator.coffee'
{ API_URL } = require('sharify').data
template = -> require('./index.jade') arguments...

module.exports = class ConnectItemView extends Backbone.View
  className: 'Connect__item'

  events:
    click: 'toggle'

  initialize: ({ @connectable }) ->
    @queue = new AsyncSerialQueue

    @listenTo @model, 'change:selected', @render
    @listenTo @model, 'change:selected', @perform

  toggle: (e) ->
    e.preventDefault()
    @model.set 'selected', not @model.get('selected')

  connect: (channel) ->
    mediator.shared.recent_connections.shove channel

    mediator.trigger "connection:added:#{@connectable.id}", channel
    mediator.trigger 'connection:added', channel

    @queue.enqueue () =>
      Promise $.ajax
        type: 'POST'
        url: "#{API_URL}/channels/#{channel.id}/connections"
        data:
          connectable_id: @connectable.id
          connectable_type: @connectable.get('base_class')

  disconnect: (channel) ->
    mediator.shared.recent_connections.unshove channel

    mediator.trigger 'connection:removed', channel
    mediator.trigger "connection:removed:#{@connectable.id}", channel

    @queue.enqueue () =>
      Promise $.ajax
        type: 'DELETE'
        url: "#{API_URL}/channels/#{channel.id}/blocks/#{@connectable.id}"

  perform: (channel, shouldConnect) ->
    if shouldConnect then @connect(channel) else @disconnect(channel)

  render: ->
    @$el.html template
      channel: @model.toJSON()

    this
