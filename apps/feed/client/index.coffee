{ defer } = require 'underscore'
{ FEED_TYPE, CURRENT_USER } = require('sharify').data
Feed = require '../../../collections/feed.coffee'
Notifications = require '../../../collections/notifications.coffee'
FeedView = require './feed_view.coffee'

module.exports = ->
  $el = $('.feed-container')

  switch FEED_TYPE
    when 'primary'
      feed = new Feed([], { type: 'primary', user: CURRENT_USER })
      view = new FeedView({ el: $el, collection: feed })

    when 'notifications'
      notificationsFeed = new Notifications
      notificationsFeed.on 'sync', -> defer => notificationsFeed.markRead()
      view = new FeedView({ el: $el, collection: notificationsFeed })
