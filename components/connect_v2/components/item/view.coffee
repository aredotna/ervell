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

    @key = @collection.constructor.keyify @connectable

    @listenTo @model, "change:#{@key}", @render
    @listenTo @model, "change:#{@key}", @perform

  toggle: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.set @key, not @model.get(@key)

  connect: ->
    @collection.shove @model

    mediator.trigger 'connection:added', @model, @connectable, @queue
    mediator.trigger "connection:added:#{@connectable.id}", @model

  disconnect: ->
    @collection.shove @model

    mediator.trigger 'connection:removed', @model, @connectable, @queue
    mediator.trigger "connection:removed:#{@connectable.id}", @model

  perform: (_channel, shouldConnect) ->
    if shouldConnect then @connect() else @disconnect()

  render: ->
    @$el.html template
      key: @key
      channel: @model.toJSON()

    this
