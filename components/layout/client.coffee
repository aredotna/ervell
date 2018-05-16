Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
_ = require 'underscore'
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
initConfirmableMessage = require '../confirmable_message/index.coffee'
initLoggedOutCTA = require '../logged_out_cta/index.coffee'
initInvestCTA = require '../invest_cta/index.coffee'
{ isTouch, isMobile } = require '../util/device.coffee'
GlobalBlockRouter = require './global_block_router.coffee'
Blacklist = require('../../lib/blacklist.js').default
initGlobalKeyboardShortcuts = require('./global_keyboard_shortcuts.js').default

module.exports = ->
  setDeviceClasses()
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  setupAnalytics()
  initNightMode()
  showInviteMessage()
  showLimitMessage()
  initConfirmableMessage()
  initLoggedOutCTA()
  initGlobalBlockRouting()
  initGlobalKeyboardShortcuts()

  # TODO: remove after campaign
  initInvestCTA()

initGlobalBlockRouting = ->
  # TODO: Extract and init block router only
  # where we actually need it.
  # Since migrating to Webpack, histories can conflict.
  # Simply starting one history isn't working as it should,
  # due to split packages (I believe).
  blacklist = Blacklist [
    /^\/sign_up$/
    /^\/log_in$/
    /^\/forgot$/
    /^\/reset(\/\w+)?$/
    /^\/confirm(\/\w+)?$/
    /^\/register(\/\w+)?$/
    /^\/welcome(\/.+)?$/
  ]

  return if blacklist.isCurrentRouteBlacklisted()

  new GlobalBlockRouter
  Backbone.history.start pushState: true

# TODO: Extract
# TODO: Fix inconsistent class names
setDeviceClasses = ->
  $body = $('body')

  if isMobile()
    $body.addClass 'is-mobile Body--mobile'

  if isTouch()
    $body.addClass 'Body--touch'

# TODO: Extract
setupPusherAndCurrentUser = ->
  currentUser = new CurrentUser sd.CURRENT_USER
  uiState = new UIState view_mode: sd.VIEW_MODE
  recentConnections = new RecentConnections
  notifications = new Notifications

  mediator.shared =
    current_user: currentUser
    state: uiState
    recent_connections: recentConnections
    notifications: notifications

  if currentUser.id
    currentUser.fetch
      # '/me/refresh' hits the account endpoint
      # and re-logs in the resulting user
      url: '/me/refresh'
      error: (_model, xhr) ->
        # Ignore internal server errors
        return if xhr.status is 500

        $.get '/me/sign_out', ->
          location.reload()

  # TODO: Extract; split this function out
  if Pusher?
    mediator.shared.pusher = new Pusher sd.PUSHER_KEY, {
      wsHost: 'ws.pusherapp.com'
      httpHost: 'sockjs.pusher.com'
      encrypted: true
    }

# TODO: Extract
setupViews = ->
  # TODO: Fix all of these selectors
  new BodyView el: $('body')

  new SearchBarView el: $('.layout-header__search')

  new HeaderInfoView

  if $('.path__inner')[0] and !$('body').hasClass('is-mobile')
    new Waypoint.Sticky
      element: $('.path__inner')
      offset: 3

  if mediator.shared.current_user.id
    initLoggedInNavigation $('.js-logged-in-navigation')

# TODO: Extract
setupAjaxHeaders = ->
  return unless sd.CURRENT_USER?

  $.ajaxSetup
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER.authentication_token

# TODO: Extract
# Initialize analytics & track page views
setupAnalytics = ->
  return if sd.SAVE # Doesn't track Bookmarklet view (?)
  return if sd.DO_NOT_TRACK

  analytics ga: ga
  analytics.registerCurrentUser()
  setupSplitTests()

  args =
    title: document.title
    location: window.location.href
    page: window.location.pathname

  # TODO: This is weird.
  if sd.CHANNEL and sd.CHANNEL.status is 'private'
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

# TODO: Extract
showInviteMessage = ->
  # Don't show this message if the current user is not logged in
  # or if they have a pending confirmation
  return if !sd.CURRENT_USER or sd.CURRENT_USER?.is_pending_confirmation

  model = new Backbone.Model
    id: 'invite_friend'
    title: 'Send an invitation'
    body: """
      Are.na gets better when you <a href='/tools/send-invitation'>invite your friends</a>.
    """

  messageView = new MessageView model: model

  if messageView.isRenderable()
    $('body').append messageView.render().$el


showLimitMessage = ->
  return unless sd.CURRENT_USER?

  { current_user } = mediator.shared

  rendered = false

  exec = ->
    return if rendered

    return unless current_user.get('is_exceeding_private_connections_limit')

    model = new Backbone.Model
      id: 'exceeded_private_connections_count_limit'
      title: 'Limit reached'
      body: """
        You’ve just surpassed the 100 private block limit for free accounts.
        You won’t be able to add any more private blocks until you upgrade
        to a <a href='/settings/billing'>premium account</a>.
      """

    messageView = new MessageView model: model

    if messageView.isRenderable()
      $('body').append messageView.render().$el
      rendered = true

  current_user.on 'sync', exec
  exec()
