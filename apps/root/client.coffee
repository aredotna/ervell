Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
FeedView = require './client/feed_view.coffee'

module.exports.init = ->
  if sd.CURRENT_USER
    feed = new Feed type: 'primary', user: sd.CURRENT_USER

    new FeedView
      el: $ ".feed-container"
      collection: feed
