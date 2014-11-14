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

  canAddToChannel: (channel) ->
    if channel.get('user').id is @id or channel.get('status') is 'public'
      true

  canEditChannel: (channel) ->
    if channel.get('user').id is @id
      true

  isFollowing: (model) ->
    if model.get('base_class') is 'Channel'
      _.contains @get('following_channels'), model.id
    else
      _.contains @get('following_users'), model.id

  toggleFollow: (followable)->
    type = followable.get('base_class').toLowerCase() + 's'
    id = followable.id
    ids = @get("following_#{type}")

    console.log '@get("following_#{type}")', @get("following_#{type}"), "following_#{type}", @

    isFollowing = _.include ids, id

    if isFollowing
      @set "following_#{type}", _.without @get("following_#{type}"), id
      successEvent = "current_user:unfollowed"
      method = "DELETE"
    else
      @set "following_#{type}", @get("following_#{type}").push id
      successEvent = "current_user:followed"
      method = "POST"

    $.ajax
      url: "#{sd.API_URL}/#{type}/#{id}/follow"
      type: method
      success: (response)->
        mediator.trigger successEvent, response
