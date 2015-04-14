Base = require './base.coffee'
FeedGroup = require './feed_group.coffee'
FeedItem = require '../models/feed_item.coffee'
CurrentUser = require '../models/current_user.coffee'
sd = require("sharify").data
_ = require 'underscore'
params = require 'query-params'

module.exports = class Feed extends Base
  model: FeedGroup
  exhaustedRetry: 0
  exhaustedLimit: 5
  defaultOptions:
    page: 1
    per: 50
    type: "primary"

  initialize: (models, options) ->
    super
    @on 'feed:loaded', @setupListener
    @on 'activity:recieved', @maybeGetActivity

  comparator: (group)->
    date = new Date group.models[0].get('created_at')
    - date.valueOf()

  url: ->
    url = sd.API_URL
    # Note that urls for object feeds take the singular version of the object
    # name while other object resource access urls take the plural
    # /user/:id/feed | /users/:id/channels

    switch @options.type
      when "primary"
        url += "/feed"
      when "global"
        url += "/feed/global"
      when "notifications"
        url += "/notifications"
      when "network"
        object_id = if @options.object_id? then @options.object_id else CurrentUser.id
        url += "/user/#{object_id}/network"
      else
        url += "/#{@options.type}/#{@options.object_id}/feed"

    url + '?' + @getParams()

  getParams: ->
    if @options.type is 'primary'
      parameters = offset: (@options.page - 1) * @options.per
    else
      parameters = _.pick @options, ['page', 'per']

    params.encode parameters

  parse: (data)->
    @exhaustedRetry++ unless data.items.length
    @exhausted = true if @exhaustedRetry > @exhaustedLimit

    items = _.filter data.items, (model) =>
      # model.user? && !(model.user.id is @options.user.id and model.action is 'has joined Arena') && model?.item?.kind != "shortcuts"
      model.user? && model.item?

    groups = _.groupBy items, (model) ->
      if model.action is 'commented on'
        "#{model.user?.id}_#{model.target?.id}_#{model.created_at}"
      else
        "#{model.user?.id}_#{model.target?.id}_#{model.action}"

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


  findGroupByItem: (item)->
    group = @find (group)->
      if group.models
        group.models[0].get('action') == item.action and
        group.models[0].get('user').id == item.user.id and
        group.models[0].get('target')?.id == item.target?.id

    return group

  getModel: (id, klass) ->
    foundModel = {}

    @find (model) ->
      found = model.findItem id, klass
      if found
        foundModel = found
        return found

    return foundModel

  getAllItems: ->
    items = @map (model)-> model.items()
    items = _.flatten items, true
    return items

  loadNext: ->
    return false if @exhausted

    ++@options.page
    @fetch
      remove: false

  setupListener: ->
    # return unless @options.type is 'primary'

    # @listener = mediator.pusher.subscribe 'activity_feed'
    # @listener.bind 'activity', (score) => @maybeGetActivity(score)

  maybeGetActivity: (score)->
    # $.ajax
    #   url: "#{config.api.versionRoot}/feed?end=#{score}&start=#{score}"
    #   success: (data) =>
    #     if not _.isEmpty(data.items)
    #       if data.items[0]?
    #         @addOrMergeNew data.items[0]

  addOrMergeNew: (item)->
    group = @findGroupByItem item

    if group?
      item_model = new FeedItem item
      group.unshift item_model
    else
      item_model = new FeedItem item
      model = new FeedGroup [item]
      @models.push model
      ++@length

    @sort {silent:true}
    @trigger 'group:added'

  changeType: (options)->
    _.extend @options, options

    mediator.publish 'pageload:start'

    @fetch
      remove: true
      success: =>
        @exhausted = false
        mediator.publish 'pageload:end'
