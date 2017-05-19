{ CURRENT_USER } = require('sharify').data
config = require '../config.coffee'
ConnectView = require './view.coffee'
ConnectableChannels = require '../collections/connectable_channels.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (block) ->
  search = new ConnectableChannels [], user_slug: CURRENT_USER.slug
  collection = mediator.shared.recent_connections

  collection.fetch()
    .then ->
      if collection.length < config.amount
        search.fetch data: per: config.amount - search.length

    .then ->
      search.each (channel) ->
        collection.append channel

      search.reset collection.toJSON()

  new ConnectView
    model: block
    collection: collection
    search: search
