Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
Notifications = require "../../collections/notifications.coffee"
FeedView = require './client/feed_view.coffee'

module.exports.init = ->
  if sd.CURRENT_USER

    if sd.FEED_TYPE is 'primary'

      feed = new Feed [], { type: 'primary', user: sd.CURRENT_USER }

      new FeedView
        el: $ ".feed-container"
        collection: feed

    else if sd.FEED_TYPE is 'notifications'
      feed = new Notifications()

      new FeedView
        el: $ ".feed-container"
        collection: feed
