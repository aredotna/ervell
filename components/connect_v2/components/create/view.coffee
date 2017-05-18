Backbone = require 'backbone'
Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
Channel = require '../../../../models/channel.coffee'
mediator = require '../../../../lib/mediator.coffee'

module.exports = class ConnectCreateView extends Backbone.View
  className: 'Connect__create'

  events:
    click: 'create'

  initialize: ({ @connectable, @state }) ->
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

    Promise(channel.save())
      .then =>
        @$el.text 'Connecting'
        @connect channel

      .then =>
        @render()
        channel.set "selected:#{@connectable.get 'base_class'}:#{@connectable.id}", true
        @collection.unshift channel

      .catch =>
        @$el.text 'Error'

  connect: (channel) ->
    Promise $.ajax
      type: 'POST'
      url: "#{API_URL}/channels/#{channel.id}/connections"
      data:
        connectable_id: @connectable.id
        connectable_type: @connectable.get('base_class')

    .then =>
      mediator.shared.recent_connections.shove channel
      mediator.trigger "connection:added:#{@connectable.id}", channel
      mediator.trigger 'connection:added', channel

  render: ->
    @$el.text "+ New private channel “#{@state.get('query')}”"
    this
