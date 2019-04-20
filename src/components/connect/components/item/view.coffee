Backbone = require 'backbone'
Promise = require 'bluebird-q'
AsyncSerialQueue = require '../../../../lib/async_serial_queue.coffee'
mediator = require '../../../../lib/mediator.coffee'
{ API_URL } = require('sharify').data
marquee = require '../../lib/marquee.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ConnectItemView extends Backbone.View
  className: 'Connect__item'

  events:
    click: 'toggle'
    mouseenter: ->
      @marquee().start()
    mouseleave: ->
      @marquee().end()

  initialize: ({ @connectable, @eventBus }) ->
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

    @eventBus.trigger 'connection:added', @model, @connectable, @queue
    mediator.trigger 'connection:added', @model, @connectable, @queue
    mediator.trigger "connection:added:#{@connectable.id}", @model

  disconnect: ->
    @collection.shove @model

    @eventBus.trigger 'connection:removed', @model, @connectable, @queue
    mediator.trigger 'connection:removed', @model, @connectable, @queue
    mediator.trigger "connection:removed:#{@connectable.id}", @model

  perform: (_channel, shouldConnect) ->
    if shouldConnect then @connect() else @disconnect()

  marquee: ->
    @__marquee__ ?=
      marquee @$el, @$('.js-label'), offset: 20

  render: ->
    @$el.html template
      key: @key
      channel: @model.toJSON()

    @__marquee__ = null

    this
