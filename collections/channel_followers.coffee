{ API_URL } = require('sharify').data
Blocks = require './blocks.coffee'

module.exports = class ChannelFollowers extends Blocks
  url: ->
    "#{API_URL}/channels/#{@id}/followers"

  initialize: (_attributes, { id }) ->
    @id = id

  parse: ({ users }) ->
    users
