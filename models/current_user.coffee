#
# Model for the current user
#

User = require "./user.coffee"
mediator = require '../lib/mediator.coffee'
sd = require("sharify").data
_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class CurrentUser extends User
  recentConnectionCount: 3

  initialize: ->
    mediator.on 'current_user:prefetched', @subscribeToPusherEvents, @
    super

  url: -> "#{sd.API_URL}/accounts"

  sync: (method, model, options = {}) ->
    if method is 'read'
      options.data ?= {}
      options.data.auth_token = @get('access_token')
    super

  parse: (response) ->
    data = _.extend response.user,
      manifest: response.manifest if response.manifest?
      shortcuts_id: response.shortcuts_id if response.shortcuts_id?
      announcements: response.announcements if response.announcements?
      following_channels: response.following_ids?.channels
      following_users: response.following_ids?.users

  storage: ->
    @get('storage')

  canAddToChannel: (channel) ->
    if channel.get('user').id is @id or channel.get('status') is 'public'
      true

  canEditChannel: (channel) ->
    if channel.get('user').id is @id
      true

  isFollowing: (model) ->
    if model.get('base_class') is 'Channel'
      _.include @get('following_channels'), model.id
    else
      _.include @get('following_users'), model.id

  toggleFollow: (followable)->
    type = followable.get('base_class').toLowerCase() + 's'
    id = followable.id
    ids = @get("following_#{type}")

    isFollowing = _.include ids, id

    if isFollowing
      @set "following_#{type}", _.without @get("following_#{type}"), id
      successEvent = "current_user:unfollowed"
      method = "DELETE"
    else
      @push "following_#{type}", id
      successEvent = "current_user:followed"
      method = "POST"

    $.ajax
      url: "#{sd.API_URL}/#{type}/#{id}/follow"
      type: method
      success: (response)->
        mediator.trigger successEvent, response

  subscribeToPusherEvents: ->
    user_pusher = mediator.shared.pusher.subscribe "user_#{@id}"
    user_pusher.bind 'user-updated', (data) =>
      @set(data)
      mediator.trigger 'user:updated', this
    user_pusher.bind 'notification', (data) =>
      @incrementNotificationCount()
      mediator.trigger 'notification:received', data

  resetNotificationCount: -> @set 'notification_count', 0

  incrementNotificationCount: -> @set 'notification_count', parseInt(@attributes.notification_count) + 1

  decrementNotificationCount: -> @set 'notification_count', parseInt(@attributes.notification_count) - 1



