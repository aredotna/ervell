Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
HeaderView = require './header/view.coffee'
km = require('../../lib/vendor/keymaster.js').noConflict()
BodyView = require './body/view.coffee'
MessageView = require '../message/client/message_view.coffee'
mediator = require '../../lib/mediator.coffee'
CurrentUser = require '../../models/current_user.coffee'
sd = require('sharify').data
ft = require('fastclick')
# analytics = require '../../lib/analytics.coffee'

module.exports = ->
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()
  # setupFastClick()
  initShortCuts()
  showBetaMessage()

setupViews = ->
  new HeaderView el: $('#layout-header'), $window: $(window), $body: $('body')
  new BodyView el: $('body')

setupPusherAndCurrentUser = ->
  mediator.shared = {}

  user = new CurrentUser sd.CURRENT_USER
  mediator.shared.current_user = user

  if user.id
    user.fetch
      cache: true
      prefill: true
      prefillSuccess: -> mediator.trigger 'current_user:prefetched'
      success: -> mediator.trigger 'current_user:fetched'

  mediator.shared.pusher = new Pusher(sd.PUSHER_KEY) if Pusher?

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

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

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids