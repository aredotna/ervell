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

    @key = "selected:#{@connectable.get 'base_class'}:#{@connectable.id}"

    @listenTo @model, "change:#{@key}", @render
    @listenTo @model, "change:#{@key}", @perform

  toggle: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.set @key, not @model.get(@key)

  connect: ->
    @queue
      .enqueue =>
        Promise $.ajax
          type: 'POST'
          url: "#{API_URL}/channels/#{@model.id}/connections"
          data:
            connectable_id: @connectable.id
            connectable_type: @connectable.get('base_class')

        .then =>
          mediator.shared.recent_connections.shove @model
          mediator.trigger "connection:added:#{@connectable.id}", @model
          mediator.trigger 'connection:added', @model

  disconnect: ->
    @queue
      .enqueue =>
        Promise $.ajax
          type: 'DELETE'
          url: "#{API_URL}/channels/#{@model.id}/blocks/#{@connectable.id}"

        .then =>
          mediator.shared.recent_connections.unshove @model
          mediator.trigger 'connection:removed', @model
          mediator.trigger "connection:removed:#{@connectable.id}", @model

  perform: (_channel, shouldConnect) ->
    if shouldConnect then @connect() else @disconnect()

  render: ->
    @$el.html template
      key: @key
      channel: @model.toJSON()

    this
