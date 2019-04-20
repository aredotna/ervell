_ = require 'underscore'
sd = require("sharify").data
Backbone = require 'backbone'
Block = require "../models/block.coffee"
mediator = require '../lib/mediator.coffee'
params = require 'query-params'

module.exports = class ChannelConnections extends Backbone.Collection

  model: Block

  url: -> "#{sd.API_URL}/channels/#{@slug}/connections"

  initialize: ( models, { @slug } ) ->
    super

  parse: (data) ->
    channels = _.reject data.channels, (channel) -> channel.kind is 'profile'