{ CURRENT_USER } = require('sharify').data
config = require '../config.coffee'
ConnectView = require './view.coffee'
ConnectableChannels = require '../collections/connectable_channels.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (block) ->
  channels = new ConnectableChannels [], user_slug: CURRENT_USER.slug

  replenish = if (recentConnections = mediator.shared.recent_connections)?
    recentConnections
      .fetch().then (response) =>
        channels.reset(response)
  else
    Promise.resolve()

  replenish
    .then ->
      if channels.length < config.amount
        channels.fetch remove: false, data: per: config.amount - channels.length

    .then (connections) ->
      channels.each (channel) ->
        mediator.shared.recent_connections.append channel

  new ConnectView
    model: block
    collection: channels
