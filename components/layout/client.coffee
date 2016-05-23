Backbone = require 'backbone'
Backbone.$ = $
sd = require('sharify').data
Cookies = require 'cookies-js'
_ = require 'underscore'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/client/message_view.coffee'
SearchBarView = require '../search_bar/client/view.coffee'
NewChannelView = require '../new_channel/client/new_channel_view.coffee'
UserMenuView = require '../user_menu/client/user_menu_view.coffee'
ViewMenuView = require '../view_menu/client/view_menu_view.coffee'
NewUserMessagesView = require '../new_user_messages/index.coffee'
mediator = require '../../lib/mediator.coffee'
State = require "../../models/state.coffee"
Notifications = require "../../collections/notifications.coffee"
RecentConnections = require '../../collections/recent_connections.coffee'
CurrentUser = require '../../models/current_user.coffee'
analytics = require '../../lib/analytics.coffee'
initNightMode = require '../night_mode/index.coffee'

module.exports = ->
  setMobileClass()
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  setupAnalytics()
  syncAuth()
  initShortCuts()

setMobileClass = ->
  if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    $('body').addClass 'is-mobile'

  if "standalone" in window.navigator and window.navigator.standalone

    { noddy, remotes } = false

    document.addEventListener 'click', (event) ->

      noddy = event.target

      while noddy.nodeName isnt "A" and noddy.nodeName isnt "HTML"
        noddy = noddy.parentNode

      if 'href' in noddy and noddy.href.indexOf('http') isnt -1 and (noddy.href.indexOf(document.location.host) isnt -1 || remotes)

        event.preventDefault()
        event.stopImmediatePropagation()

        document.location.href = noddy.href

    , false

setupPusherAndCurrentUser = ->
  mediator.shared = {}

  user = new CurrentUser sd.CURRENT_USER
  mediator.shared.current_user = user
  mediator.shared.state = new State view_mode: sd.VIEW_MODE
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
        ensureFreshUser response.user
        showNewUserMessages() if user.get('show_tour')

  mediator.shared.pusher = new Pusher(sd.PUSHER_KEY) if Pusher?

setupViews = ->
  new BodyView
    el: $('body')
  new SearchBarView
    el: $('.layout-header__search')

  if $('.path__inner')[0] and !$('body').hasClass('is-mobile')
    new Waypoint.Sticky
      element: $('.path__inner')
      offset: 3

  if mediator.shared.current_user.id
    new UserMenuView
      el: $('.dropdown--menu--user')
    new NewChannelView
      el: $('.dropdown--menu--new-channel')

    if mediator.shared.current_user.get('is_pro')
      new ViewMenuView
        el: $('.dropdown--menu--view')
        model: mediator.shared.state

    mediator.shared.notifications.fetch()

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
            window.location.reload()

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'authentication_token', 'avatar_image', 'email', 'first_name', 'id',
               'last_name', 'slug', 'username', 'is_pro']
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
  unless (sd.CHANNEL and sd.CHANNEL.status is 'private')
    analytics.trackPageview()

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

  initNightMode()

showNewUserMessages = ->
  new NewUserMessagesView
    container: $('#message-container')

showBookmarkletMessage = ->
  model = new Backbone.Model
    id: 'bookmarklet_updates_message'
    title: "New Bookmarklet"
    body: "Quickly save to Are.na while browsing the web. Drag and drop, add to multiple channels, and more. <a href='https://www.are.na/block/506001'>Read more...</a>"
    type: 'announcement'
  new MessageView container: $('#message-container'), model: model

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids
