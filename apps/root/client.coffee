Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
scrollFrame = require 'scroll-frame'
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
Notifications = require "../../collections/notifications.coffee"
FeedView = require './client/feed_view.coffee'
bullet_points = require './fixtures/bullet_points.coffee'
IconicJS = require '../../components/iconic/client/iconic.min.js'

mediator = require '../../lib/mediator.coffee'

module.exports = class RootUserView extends Backbone.View

  initialize: ->
    @notifications = mediator.shared.notifications
    mediator.on 'notifications:synced', @maybeSetNotifications, @

  maybeSetNotifications: ->
    if (count = @notifications.getNumberUnread()) > 0
      @$('.metadata--selector--notifications').addClass 'has-notifications'
      @$('.notifications--count').text count

module.exports = class HomeView extends Backbone.View
  slideDuration: 2300
  slideIndex: 0

  events:
    'click .home-arrow' : 'scrollDown'

  initialize: ->
    setInterval @setSlide, @slideDuration
    _.defer => IconicJS().inject('img.iconic')

  setSlide: =>
    ++@slideIndex
    @slideIndex = 0 if @slideIndex > bullet_points.length
    @$('.home__section--intro__inner__copy').text bullet_points[@slideIndex]

  scrollDown: (e)->
    multiplier = $(e.currentTarget).data('multiplier')
    top = $(window).height() * multiplier
    $('html, body').animate {scrollTop: top}, 300


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

