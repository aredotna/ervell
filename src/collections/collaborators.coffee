Base = require "./base.coffee"
sd = require("sharify").data
User = require "../models/user.coffee"
mediator = require '../lib/mediator.coffee'

module.exports = class Collaborators extends Base
  model: User

  url: -> "#{sd.API_URL}/channels/#{@id}/collaborators"

  inviteUrl: -> "#{sd.API_URL}/channels/#{@id}/collaborators/invite"

  parse: (data) -> data.users

  initialize: (_items, { id } = {}) ->
    @id = id

  # ...Interesting...
  _remove: (id) ->
    mediator.trigger 'collaborator:removed'
    @remove @get(id)
    $.ajax
      type: 'DELETE'
      url: @url()
      data: { ids: [id] }
      success: (response) =>
        @reset response.users

  _add: (collaborator) ->
    mediator.trigger 'collaborator:added'
    @add collaborator
    $.ajax
      type: 'POST'
      url: @url()
      data: { ids: [collaborator.id] }
      success: (response) =>
        @reset response.users

  _invite: (email) ->
    user = new User username: email
    mediator.trigger 'collaborator:added'
    @add user
    $.ajax
      type: 'POST'
      url: @inviteUrl()
      data:
        email: email
