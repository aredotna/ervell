sd = require('sharify').data
ft = require('fastclick')
Cookies = require 'cookies-js'
_ = require 'underscore'
Backbone = require 'backbone'
Backbone.$ = $
HeaderView = require './header/view.coffee'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/client/message_view.coffee'
NewUserMessagesView = require '../new_user_messages/index.coffee'
mediator = require '../../lib/mediator.coffee'
Notifications = require "../../collections/notifications.coffee"
RecentConnections = require '../../collections/recent_connections.coffee'
CurrentUser = require '../../models/current_user.coffee'
analytics = require '../../lib/analytics.coffee'

module.exports = ->
  setMobileClass()
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  setupAnalytics()
  # syncAuth()
  # setupFastClick()
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

setupViews = ->
  new HeaderView el: $('#layout-header'), $window: $(window), $body: $('body')
  new BodyView el: $('body')

setupPusherAndCurrentUser = ->
  mediator.shared = {}

  user = new CurrentUser sd.CURRENT_USER
  mediator.shared.current_user = user
  mediator.shared.state = new Backbone.Model
  mediator.shared.recent_connections = new RecentConnections

  if user.id
    mediator.shared.notifications = new Notifications()
    mediator.shared.notifications.fetch()
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
      return $.ajax('/me/refresh').then -> mediator.trigger 'current_user:refreshed'

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

setupFastClick = -> ft document.body, {}

initShortCuts = ->
  km 'right', -> mediator.trigger 'lightbox:slide:next'
  km 'left',  -> mediator.trigger 'lightbox:slide:prev'
  km 'esc',   -> mediator.trigger 'lightbox:close'

showNewUserMessages = ->
  new NewUserMessagesView
    container: $('#message-container')

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids