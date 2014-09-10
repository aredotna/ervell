#
# Model for the current user
#

User = require "./user.coffee"
sd = require("sharify").data

module.exports = class CurrentUser extends User

  url: -> "#{sd.API_URL}/accounts"

  sync: (method, model, options = {}) ->
    console.log('sync CurrentUser', @)
    options.data ?= {}
    options.data.auth_token = @get 'access_token'
    super

  parse: (response) -> response.user

  canEditChannel: (channel) ->
    # TODO: add functionality for collaborators
    if channel.get('user').id is @id
      true