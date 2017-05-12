ConnectView = require './view.coffee'

{ last } = require 'underscore'
{ API_URL, CURRENT_USER } = require('sharify').data
Block = require '../../../models/block.coffee'
Channels = require '../../../collections/connection_blocks.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = ($el) ->
  block = new Block
  channels = new Channels [], user_slug: CURRENT_USER.slug

  replenish = if (recentConnections = mediator.shared.recent_connections)?
    recentConnections
      .fetch().then (response) =>
        channels.add(last(response, 3).reverse())

  else
    Promise.resolve()

  replenish.then ->
    channels.fetch(data: per: 3 - channels.length) if channels.length < 0

  view = new ConnectView
    el: $el
    model: block
    collection: channels

  view.render()
  view
