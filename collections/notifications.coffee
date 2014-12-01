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

  parse: (data)->
    @exhausted = true if data.item_count is 0

    items = _.filter data.items, (model) =>
      # model.user? && !(model.user.id is @options.user.id and model.action is 'has joined Arena') && model?.item?.kind != "shortcuts"
      model.user?

    groups = _.groupBy items, (model) -> "#{model.user?.id}_#{model.target?.id}_#{model.created_at}"

    # Split group into multiple groups if there is a gap
    # of more than an hour between the creation of any
    # two items when ordered by date
    splitGroups = []
    _.each groups, (group)->

      # Sort group by date internally
      group = _.sortBy group, (model)->
        - new Date model.created_at

      # Iterate over each element, checking for big gaps
      workingGroup = []
      prevDateVal = null
      _.each group, (model)->
        dateVal = new Date model.created_at

        # Split the group if there's a big gap between items
        if prevDateVal and (dateVal - prevDateVal) > (60 * 60)
          splitGroups.push workingGroup
          workingGroup = []
        workingGroup.push model
        prevDateVal = dateVal

      splitGroups.push workingGroup

    groups = _.sortBy splitGroups, (group)=>
      group = _.sortBy group, (model)->
        - new Date model.created_at

      - new Date group[0].created_at

    groups = _.map groups, (group) ->
      _.map group, (item) -> new FeedItem(item)

    groups
