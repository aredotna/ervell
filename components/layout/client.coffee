Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
_ = require 'underscore'
attachFastClick = require 'fastclick'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/client/message_view.coffee'
HeaderInfoView = require './header/client.coffee'
SearchBarView = require '../search_bar/client/view.coffee'
initLoggedInNavigation = require '../logged_in_navigation/client/index.coffee'
mediator = require '../../lib/mediator.coffee'
UIState = require "../../models/ui_state.coffee"
Notifications = require "../../collections/notifications.coffee"
RecentConnections = require '../../collections/recent_connections.coffee'
CurrentUser = require '../../models/current_user.coffee'
analytics = require '../../lib/analytics.coffee'
setupSplitTests = require '../split_test/setup.coffee'
initNightMode = require '../night_mode/index.coffee'
initLoggedOutCta = require '../logged_out_cta/index.coffee'
{ isTouch } = require '../util/device.coffee'

module.exports = ->
  setMobileClass()
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  setupAnalytics()
  syncAuth()
  initShortCuts()
  initLoggedOutCta() unless sd.CURRENT_USER?.id
  showPremiumMessage() if sd.CURRENT_USER?.id

isMobile = ->
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

setMobileClass = ->
  $body = $('body')
  if isMobile()
    $body.addClass 'is-mobile'
    attachFastClick document.body

  if isTouch()
    $body.addClass 'Body--touch'

setupPusherAndCurrentUser = ->
  mediator.shared = {}

  user = new CurrentUser sd.CURRENT_USER
  mediator.shared.current_user = user
  mediator.shared.state = new UIState()
  mediator.shared.state.set view_mode: sd.VIEW_MODE
  mediator.shared.recent_connections = new RecentConnections

  if user.id
    mediator.shared.notifications = new Notifications()
    mediator.shared.notifications.on 'sync', ->
      mediator.trigger 'notifications:synced', @

    user.fetch
      prefill: true
      prefillSuccess: (data)-> mediator.trigger 'current_user:prefetched'
      success: (user, response)->
        mediator.trigger 'current_user:fetched'
        if user.get('show_tour') and sd.AFTER_ONBOARDING == 'explore'
          showNewUserMessages()

  pusher= mediator.shared.pusher = new Pusher(sd.PUSHER_KEY) if Pusher?
  chan = mediator.shared.current_user_channel = pusher.subscribe "user_#{user.id}" if user.id and Pusher?

setupViews = ->
  new BodyView
    el: $('body')
  new SearchBarView
    el: $('.js-layout-header-search')

  new HeaderInfoView

  if $('.path__inner')[0] and !$('body').hasClass('is-mobile')
    new Waypoint.Sticky
      element: $('.path__inner')
      offset: 3

  if mediator.shared.current_user.id
    initLoggedInNavigation $('.js-logged-in-navigation')

syncAuth = module.exports.syncAuth = ->
  if sd.CURRENT_USER
    $.ajax
      url: "#{sd.API_URL}/accounts"
      success: ensureFreshUser
      error: ->
        $.ajax
          method: 'GET'
          url: '/me/sign_out'
          complete: ->
            # window.location.reload()

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'authentication_token', 'avatar_image', 'email', 'first_name', 'id',
               'last_name', 'slug', 'username', 'is_premium']
    if not _.isEqual data[attr], sd.CURRENT_USER[attr]
      return $.ajax('/me/refresh')

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

setupAnalytics = ->
  # Initialize analytics & track page view.
  return if sd.SAVE

  analytics ga: ga
  analytics.registerCurrentUser()
  setupSplitTests()

  args =
    title: document.title
    location: window.location.href
    page: window.location.pathname

  if (sd.CHANNEL and sd.CHANNEL.status is 'private')
    args =
      page: '/'
      title: 'Arena / [Private]'
      location: 'https://www.are.na/401-private'

  analytics.trackPageview(args)

  # Log a visit once per session
  unless Cookies.get('active_session')?
    Cookies.set 'active_session', true
    analytics.track.funnel if sd.CURRENT_USER
      'Visited logged in'
    else
      'Visited logged out'

initShortCuts = ->
  km 'right', -> mediator.trigger 'lightbox:slide:next'
  km 'left',  -> mediator.trigger 'lightbox:slide:prev'
  km 'esc',   -> mediator.trigger 'lightbox:close'
  km 'l',     ->
    if mediator.shared.current_user.isPremium()
      mediator.shared.state.set view_mode: 'list'
      window.location.reload()
  km 'g',     ->
    if mediator.shared.current_user.isPremium()
      mediator.shared.state.set view_mode: 'grid'
      window.location.reload()

  initNightMode()

showPremiumMessage = ->
  if (!sd.CURRENT_USER.is_premium and sd.CURRENT_USER.channel_count >= 2 )
    model = new Backbone.Model
      id: 'premium_monthly_message'
      title: "Monthly premium"
      body: "We recently added a monthly option for premium account subscriptions. If you're finding Are.na useful, consider upgrading to a <a href='https://www.are.na/settings/billing?utm_campaign=mmessage'>premium account</a>. Thank you."
      type: 'announcement'
    new MessageView container: $('#message-container'), model: model

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids
