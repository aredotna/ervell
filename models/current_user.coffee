#
# Model for the current user
#

User = require "./user.coffee"
sd = require("sharify").data

module.exports = class User extends User

  url: -> "#{sd.API_URL}/accounts"

  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.auth_token = @get 'access_token'
    super

  parse: (response) -> response.user