{ CURRENT_USER } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
config = require '../config.coffee'
ConnectableChannels = require '../collections/connectable_channels.coffee'

module.exports = () ->
  search = new ConnectableChannels [], user_slug: CURRENT_USER.slug
  recentConnections = mediator.shared.recent_connections

  recentConnections.fetch()
    .then ->
      if recentConnections.length < config.amount
        search.fetch data: per: config.amount - search.length

    .then ->
      search.each (channel) ->
        recentConnections.append channel

      search.reset recentConnections.toJSON()

  {
    search: search
    recentConnections: recentConnections
  }
