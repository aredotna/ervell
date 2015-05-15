Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
HeaderView = require './header/view.coffee'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/client/message_view.coffee'
NewUserMessagesView = require '../new_user_messages/index.coffee'
mediator = require '../../lib/mediator.coffee'
RecentConnections = require '../../collections/recent_connections.coffee'
CurrentUser = require '../../models/current_user.coffee'
sd = require('sharify').data
ft = require('fastclick')
Cookies = require 'cookies-js'
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
  showBetaMessage()

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

    user.fetch
      cache: true
      prefill: true
      prefillSuccess: (data)-> mediator.trigger 'current_user:prefetched'
      success: ->
        mediator.trigger 'current_user:fetched'
        showNewUserMessages() if user.get('show_tour')

  mediator.shared.pusher = new Pusher(sd.PUSHER_KEY) if Pusher?

syncAuth = module.exports.syncAuth = ->
  # Log out of Force if you're not logged in to Gravity
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
  return unless sd.CURRENT_USER and sd.CURRENT_USER.id is 15
  for attr in ['id', 'authentication_token', 'avatar_image', 'email', 'first_name', 'id',
               'last_name', 'manifest', 'notification_count', 'shortcuts_id', 'slug', 'username']
    if not _.isEqual data.user[attr], sd.CURRENT_USER[attr]
      return $.ajax('/me/refresh').then -> mediator.trigger 'current_user:refreshed'

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

setupAnalytics = ->
  # Initialize analytics & track page view.
  analytics ga: ga
  analytics.registerCurrentUser()
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

showBetaMessage = ->
  model = new Backbone.Model
    id: 'beta_message'
    title: "Beta"
    body: "Welcome to the beta preview of Are.na. Expect us to have some bugs here for the time being. Please submit any feedback to our <a href='http://are.na/feedback'>feedback channel</a>. Follow our progress <a href='http://github.com/arenahq/ervell'>here</a>."
    type: 'announcement'
  new MessageView el: $('#message-container'), model: model

showNewUserMessages = ->
  new NewUserMessagesView
    container: $('#message-container')

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids