{ extend } = require 'underscore'
Backbone = require 'backbone'
Promise = require 'bluebird-q'
{ API_URL } = require('sharify').data
{ track, en } = require '../../../lib/analytics.coffee'
ConnectView = require './view.coffee'
ConnectCollections = require './collections.coffee'

module.exports = (block) ->
  { search, recentConnections } = ConnectCollections()

  eventBus = extend {}, Backbone.Events

  remove = (channel, connectable, queue) ->
    queue.enqueue ->
      Promise $.ajax
        type: 'DELETE'
        url: "#{API_URL}/channels/#{channel.id}/blocks/#{connectable.id}"

    track.submit en.DESTROY_CONNECTION

  add =  (channel, connectable, queue) ->
    queue.enqueue ->
      Promise $.ajax
        type: 'POST'
        url: "#{API_URL}/channels/#{channel.id}/connections"
        data:
          connectable_id: connectable.id
          connectable_type: connectable.get 'base_class'

    track.submit en.CREATE_CONNECTION

  eventBus
    .on 'connection:added', add
    .on 'connection:removed', remove

  view = new ConnectView
    model: block
    collection: recentConnections
    search: search
    eventBus: eventBus

  view.on 'remove', ->
    eventBus
      .off 'connection:added', add
      .off 'connection:removed', add

  view
