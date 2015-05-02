Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
scrollFrame = require 'scroll-frame'
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
Notifications = require "../../collections/notifications.coffee"
FeedView = require './client/feed_view.coffee'

mediator = require '../../lib/mediator.coffee'

module.exports = class RootUserView extends Backbone.View

  initialize: ->
    @notifications = mediator.shared.notifications
    mediator.on 'notifications:synced', @maybeSetNotifications, @

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.metadata--selector--notifications').addClass 'has-notifications'
      @$('.notifications--count').text count

module.exports.init = ->
  if sd.CURRENT_USER

    if sd.FEED_TYPE is 'primary'
      new RootUserView
        el: $ '.container'

      feed = new Feed [], { type: 'primary', user: sd.CURRENT_USER }

      new FeedView
        el: $ ".feed-container"
        collection: feed

      scrollFrame '.feed-container a'

    else if sd.FEED_TYPE is 'notifications'
      feed = new Notifications()

      new FeedView
        el: $ ".feed-container"
        collection: feed

      feed.on 'sync', -> _.defer => feed.markRead()
