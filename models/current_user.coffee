#
# Model for the current user
#

User = require "./user.coffee"
mediator = require '../lib/mediator.coffee'
sd = require("sharify").data
_ = require 'underscore'

module.exports = class CurrentUser extends User

  initialize: ->
    super
    console.log 'CurrentUser', mediator

  url: -> "#{sd.API_URL}/accounts"

  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.auth_token = @get 'access_token'
    super

  parse: (response) ->
    response.user

  canEditChannel: (channel) ->
    if channel.get('user').id is @id or channel.get('status') is 'public'
      true