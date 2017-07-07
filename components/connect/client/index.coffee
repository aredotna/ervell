Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
mediator = require '../../../lib/mediator.coffee'
{ track, en } = require '../../../lib/analytics.coffee'
ConnectView = require './view.coffee'
ConnectCollections = require './collections.coffee'

module.exports = (block) ->
  { search, recentConnections } = ConnectCollections()

  mediator
    .on 'connection:added', (channel, connectable, queue) ->
      queue.enqueue ->
        Promise $.ajax
          type: 'POST'
          url: "#{API_URL}/channels/#{channel.id}/connections"
          data:
            connectable_id: connectable.id
            connectable_type: connectable.get 'base_class'

      track.submit en.CREATE_CONNECTION

    .on 'connection:removed', (channel, connectable, queue) ->
      queue.enqueue ->
        Promise $.ajax
          type: 'DELETE'
          url: "#{API_URL}/channels/#{channel.id}/blocks/#{connectable.id}"

      track.submit en.DESTROY_CONNECTION

  new ConnectView
    model: block
    collection: recentConnections
    search: search
