{ CURRENT_USER } = require('sharify').data
config = require '../config.coffee'
ConnectView = require './view.coffee'
Channels = require '../../../collections/connection_blocks.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (block) ->
  channels = new Channels [], user_slug: CURRENT_USER.slug

  replenish = if (recentConnections = mediator.shared.recent_connections)?
    recentConnections
      .fetch().then (response) =>
        channels.reset(response.reverse())
  else
    Promise.resolve()

  replenish
    .then ->
      if channels.length < config.amount
        channels.fetch(data: per: config.amount - channels.length)
    .then (connections) ->
      channels.each (channel) ->
        mediator.shared.recent_connections.shove

  new ConnectView
    model: block
    collection: channels
