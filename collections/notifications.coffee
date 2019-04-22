Feed = require './feed.coffee'
sd = require("sharify").data
mediator = require '../lib/mediator.coffee'
FeedItem = require '../models/feed_item.coffee'
_ = require 'underscore'

module.exports = class Notifications extends Feed
  defaultOptions:
    page: 1
    per: 10

  url: -> "#{sd.API_URL}/notifications?#{@getParams()}"

  initialize: ->
    super

    mediator.on 'notification:received', @addNotification, @
    mediator.on 'notifications:opened', @markRead, @

  addNotification: (data)->
    @addOrMergeNew data
    mediator.trigger 'notification:added'

  clear: ->
    $.post "#{sd.API_URL}/notifications/clear"

  markRead: ->
    mediator.shared.current_user.resetNotificationCount()
    @each (group)->
      group.each (model) -> model.set 'is_read', true

    mediator.trigger 'notifications:cleared'

    @clear()

  getNumberUnread: ->
    count = 0
    @each (group)->
      if group.isNew()
        ++count
    count

  maybeGetActivity: -> # does nothing

  parse: (data)->
    @exhaustedRetry++ unless data.items.length
    @exhausted = true if @exhaustedRetry > @exhaustedLimit

    items = _.filter data.items, (model) =>
      # model.user? && !(model.user.id is @options.user.id and model.action is 'has joined Arena') && model?.item?.kind != "shortcuts"
      model.user? && model.item?

    groups = _.groupBy items, (model) ->
      "#{model.user?.id}_#{model.target?.id}_#{model.id}"

    groups = _.map groups, (group) ->
      _.map group, (item) -> new FeedItem(item)

    groups

