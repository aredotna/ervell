_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
moment = require 'moment'
User = require './user.coffee'
mediator = require '../lib/mediator.coffee'

module.exports = class CurrentUser extends User
  recentConnectionCount: 3

  @orNull: ->
    if sd.CURRENT_USER then new @(sd.CURRENT_USER) else null

  initialize: ->
    mediator.on 'current_user:prefetched', @subscribeToPusherEvents, @
    super

  href: -> "#{sd.APP_URL}/#{@get('slug')}"

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
    channel.get('user').id is @id or (channel.get('status') is 'public' and @id?)

  canEditChannel: (channel) ->
    channel.get('user').id is @id

  isCollaborator: (collaborators) ->
    _.contains collaborators.pluck('id'), @id

  isFollowing: (model) ->
    if model.get('base_class') is 'Channel'
      _.include @get('following_channels'), parseInt(model.id)
    else
      _.include @get('following_users'), parseInt(model.id)

  toggleFollow: (followable)->
    type = followable.get('base_class').toLowerCase() + 's'
    id = parseInt followable.id
    count = followable.get('follower_count')
    ids = @get("following_#{type}")

    isFollowing = _.include ids, id

    if isFollowing
      @set "following_#{type}", _.without @get("following_#{type}"), id
      method = "DELETE"
      followable.set follower_count: count - 1
    else
      @push "following_#{type}", id
      method = "POST"
      followable.set follower_count: count + 1

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

  # TODO: [premium_2] Delete this
  isEligibleForFreeYear: ->
    # Not yet already premium
    not @get('is_premium') and
    # Created prior to August 8, 2017
    moment(@get('created_at')).isBefore('2017-08-07', 'day') and
    # And has exceed the private connection threshold
    @get('private_connections_count') >= @get('private_connections_limit')
