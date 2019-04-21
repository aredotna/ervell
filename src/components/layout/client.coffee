Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
moment =  require 'moment'
Pusher = require 'pusher-js'

BodyView = require './body/view.coffee'
SearchBarView = require '../search_bar/client/view.coffee'
mediator = require '../../lib/mediator.coffee'
UIState = require "../../models/ui_state.coffee"
Notifications = require "../../collections/notifications.coffee"
RecentConnections = require '../../collections/recent_connections.coffee'
CurrentUser = require '../../models/current_user.coffee'
analytics = require '../../lib/analytics.coffee'
setupSplitTests = require '../split_test/setup.coffee'
initNightMode = require '../night_mode/index.coffee'
initLoggedOutCTA = require '../logged_out_cta/index.coffee'
{ isTouch, isMobile } = require '../util/device.coffee'
initLightboxKeyboardShortcuts = require('./initLightboxKeyboardShortcuts')

{ mountWithApolloProvider } = require '../../v2/apollo/index'
{ default: GlobalNavElements } = require '../../v2/components/GlobalNavElements/index'

module.exports = ->
  setDeviceClasses()
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  setupAnalytics()
  initNightMode()
  initLoggedOutCTA()
  initLightboxKeyboardShortcuts.bind()

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

  mediator.shared.pusher = new Pusher sd.PUSHER_KEY, {
    wsHost: 'ws.pusherapp.com'
    httpHost: 'sockjs.pusher.com'
    encrypted: true
  }

# TODO: Extract
setupViews = ->
  new BodyView el: $('body')

  if ($topBar = $('.js-topbar')).length
    scheme = if sd.IS_GROUP_PAGE then 'GROUP' else 'DEFAULT'
    mountWithApolloProvider(GlobalNavElements, { scheme: scheme }, $topBar)

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
