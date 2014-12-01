Feed = require './feed'
sd = require("sharify").data
_ = require 'underscore'

module.exports = class Notifications extends Feed

  url: -> "#{sd.API_URL}/notifications"

  initialize: ->
    super

    mediator.on 'notification:received', @addNotification, @
    mediator.on 'notifications:opened', @markRead, @

  addNotification: (data)->
    @addOrMergeNew data
    mediator.trigger 'notification:added'

  markRead: ->
    mediator.shared.current_user.resetNotificationCount()
    @each (group)->
      group.each (model) -> model.set 'is_read', true

    mediator.trigger 'notifications:cleared'

    $.post "#{sd.API_URL}/notifications/clear"

  getNumberUnread: ->
    count = 0
    @each (group)->
      if group.isNew()
        ++count
    count

  maybeGetActivity: -> # does nothing
