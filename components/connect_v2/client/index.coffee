ConnectView = require './view.coffee'
config = require '../config.coffee'

{ last } = require 'underscore'
{ API_URL, CURRENT_USER } = require('sharify').data
Block = require '../../../models/block.coffee'
Channels = require '../../../collections/connection_blocks.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = ($el) ->
  block = new Block id: 1, base_class: 'Block'
  channels = new Channels [], user_slug: CURRENT_USER.slug

  replenish = if (recentConnections = mediator.shared.recent_connections)?
    recentConnections
      .fetch().then (response) =>
        channels.reset(response.reverse())
  else
    Promise.resolve()

  replenish.then ->
    channels.fetch(data: per: config.amount - channels.length) unless channels.length

  view = new ConnectView
    el: $el
    model: block
    collection: channels

  view.render()
  view
