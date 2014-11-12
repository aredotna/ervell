#
# Model for the current user
#

User = require "./user.coffee"
mediator = require '../lib/mediator.coffee'
sd = require("sharify").data
_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class CurrentUser extends User

  initialize: ->
    console.log 'CurrentUser', @

  url: -> "#{sd.API_URL}/accounts"

  sync: (method, model, options = {}) ->
    options.data ?= {}
    options.data.auth_token = @get 'access_token'
    super

  parse: (response) ->
    data = _.extend response.user,
      manifest: response.manifest if response.manifest?
      shortcuts_id: response.shortcuts_id if response.shortcuts_id?
      announcements: response.announcements if response.announcements?
      following_channels: response.following_ids?.channels
      following_users: response.following_ids?.users

    data

  canEditChannel: (channel) ->
    if channel.get('user').id is @id or channel.get('status') is 'public'
      true