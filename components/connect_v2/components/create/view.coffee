Backbone = require 'backbone'
Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
AsyncSerialQueue = require '../../../../lib/async_serial_queue.coffee'
mediator = require '../../../../lib/mediator.coffee'
Channel = require '../../../../models/channel.coffee'

module.exports = class ConnectCreateView extends Backbone.View
  className: 'Connect__create'

  events:
    click: 'create'

  initialize: ({ @connectable, @search, @state }) ->
    @queue = new AsyncSerialQueue

    @listenTo @state, 'change:query', @render

  create: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @$el.text 'Creating'

    title = @state.get 'query'

    channel = new Channel
      title: title
      status: 'private'

    channel.url = "#{API_URL}/channels"
    channel.set @collection.constructor.keyify(@connectable), true

    Promise(channel.save())
      .then =>
        @$el.text 'Connecting'
        @connect channel
        @render()

      .catch =>
        @$el.text 'Error'

  connect: (channel) ->
    @search.unshift channel
    @collection.shove channel

    mediator.trigger 'connection:added', channel, @connectable, @queue
    mediator.trigger "connection:added:#{@connectable.id}", channel

  render: ->
    @$el.text "+ New private channel “#{@state.get('query')}”"
    this
