Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
_ = require 'underscore'
attachFastClick = require 'fastclick'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/view.coffee'
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
{ isTouch, isMobile } = require '../util/device.coffee'

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

setMobileClass = ->
  $body = $('body')

  if isMobile()
    $body.addClass 'is-mobile Body--mobile'
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
      prefillSuccess: (data) -> mediator.trigger 'current_user:prefetched'
      success: (user, response)->
        mediator.trigger 'current_user:fetched'
        if user.get('show_tour') and sd.AFTER_ONBOARDING is 'explore'
          showNewUserMessages()

  pusher = mediator.shared.pusher = new Pusher(sd.PUSHER_KEY) if Pusher?
  chan = mediator.shared.current_user_channel = pusher.subscribe "user_#{user.id}" if user.id and Pusher?

setupViews = ->
  new BodyView
    el: $('body')
  new SearchBarView
    el: $('.layout-header__search')

  new HeaderInfoView

  if (path = $('.js-path')[0]) and not isMobile()
    new Waypoint.Sticky element: path

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
  # TODO: [premium_2] Delete this
  user = mediator.shared.current_user

  body = if user.get('is_premium')
    """
      Starting on August 23, Are.na is changing the way Basic and Premium plans work.
      Premium members will have all the same tools and features,
      along with early access to the new mobile app.
      <a href='/blog/hello%20world/2017/08/09/new-pricing.html' target='_blank'>Learn more here.</a>
    """
  else if user.isEligibleForFreeYear()
    """
      Starting on August 23, Are.na is changing the way Basic and Premium plans work
      <a href='/blog/hello%20world/2017/08/09/new-pricing.html' target='_blank'>(learn more here).</a>
      To make the transition a little easier, we’re giving you 1 year of FREE Premium.
      <a href='/settings/billing'>Upgrade now and use the code FREEYEAR.</a>
    """
  else
    """
      Starting on August 23, Are.na is changing the way Basic and Premium plans work
      <a href='/blog/hello%20world/2017/08/09/new-pricing.html' target='_blank'>(learn more here).</a>
      To make the transition a little easier, we’re giving you 1 month of FREE Premium.
      <a href='/settings/billing'>Upgrade now and use the code FREEMONTH.</a>
    """

  model = new Backbone.Model
    id: 'premium_2_announcement'
    title: 'Announcing new plan structures'
    body: body

  messageView = new MessageView model: model

  if messageView.isRenderable()
    $('body').append messageView.render().$el

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids
