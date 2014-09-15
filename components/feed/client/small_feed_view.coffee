FeedView = require "./feed_view.coffee"
sd = require("sharify").data

feedTemplate = -> require('../../../components/feed/templates/small_feed.jade') arguments...

module.exports = class SmallFeedView extends FeedView

  render: =>
    @$el.html feedTemplate(feed: @collection.models)