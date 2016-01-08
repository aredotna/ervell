Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
template = -> require('../templates/connections.jade') arguments...

module.exports = class ChannelConnectionsView extends Backbone.View

  initialize: (options)->
    @collection.on "sync add remove", @render, @
    mediator.on 'connection:added', @addConnection, @
    mediator.on 'connection:removed', @removeConnection, @

  addConnection: (connection) ->
    @collection.add connection

  removeConnection: (connection) ->
    @collection.remove connection

  render: ->
    if @collection.length
      @$('.js-metadata--connection-list').html template(connections: @collection.models)
