#
# Collection for a channel's collaborators
#

Base = require "./base.coffee"
sd = require("sharify").data
User = require "../models/user.coffee"
mediator = require '../lib/mediator.coffee'

module.exports = class Collaborators extends Base

  model: User

  url: -> "#{sd.API_URL}/channels/#{@channel_slug}/collaborators"

  parse: (data) -> data.users

  initialize: (options) ->
    @channel_slug = options.channel_slug
    super

  _remove: (id) ->
    $.ajax
      type: 'DELETE'
      url: @url()
      data: { ids: [id] }
      success: (response) =>
        console.log 'response', response
        mediator.trigger 'collaborator:removed'
        @reset response.users

  _add: (id)->
    $.ajax
      type: 'POST'
      url: @url()
      data: { ids: [id] }
      success: (response) =>
        mediator.trigger 'collaborator:added'
        @reset response.users
