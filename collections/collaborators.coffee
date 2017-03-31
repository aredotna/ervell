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
    mediator.trigger 'collaborator:removed'
    @remove @get(id)
    $.ajax
      type: 'DELETE'
      url: @url()
      data: { ids: [id] }
      success: (response) =>
        @reset response.users

  _add: (collaborator)->
    mediator.trigger 'collaborator:added'
    @add collaborator
    $.ajax
      type: 'POST'
      url: @url()
      data: { ids: [collaborator.id] }
      success: (response) =>
        @reset response.users
