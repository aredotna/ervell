Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
Notifications = require "../../collections/notifications.coffee"
FeedView = require './client/feed_view.coffee'
IconicJS = require '../../components/iconic/client/iconic.min.js'
mediator = require '../../lib/mediator.coffee'

module.exports.RootUserView = class RootUserView extends Backbone.View

  initialize: ->
    @notifications = mediator.shared.notifications
    mediator.on 'notifications:synced', @maybeSetNotifications, @

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.metadata--selector--notifications').addClass 'has-notifications'
      @$('.notifications--count').text count

module.exports.HomeView = class HomeView extends Backbone.View
  slideDuration: 2300
  slideIndex: 0

  events:
    'click .home-arrow' : 'scrollDown'

  initialize: ->
    _.defer => IconicJS().inject('img.iconic')

  scrollDown: (e)->
    $nextSibling = $(e.currentTarget).closest('.home-section').next()
    top = $nextSibling.offset()?.top
    $('html, body').animate { scrollTop: top }, 300


module.exports.init = ->
  if sd.CURRENT_USER

    if sd.FEED_TYPE is 'primary'
      new RootUserView
        el: $ '.container'

      feed = new Feed [], { type: 'primary', user: sd.CURRENT_USER }

      new FeedView
        el: $ ".feed-container"
        collection: feed

    else if sd.FEED_TYPE is 'notifications'
      feed = new Notifications()

      new FeedView
        el: $ ".feed-container"
        collection: feed

      feed.on 'sync', -> _.defer => feed.markRead()

  else
    new HomeView
      el: $ '.container'

