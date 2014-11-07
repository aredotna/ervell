Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
HeaderView = require './header/view.coffee'
BodyView = require './body/view.coffee'
mediator = require '../../lib/mediator.coffee'
CurrentUser = require '../../models/current_user.coffee'
sd = require('sharify').data
# analytics = require '../../lib/analytics.coffee'

module.exports = ->
  setupViews()
  setupAjaxHeaders()
  setupPusherAndCurrentUser()
  syncAccount()

setupViews = ->
  new HeaderView el: $('#layout-header'), $window: $(window), $body: $('body')
  new BodyView el: $('body')

setupPusherAndCurrentUser = ->
  mediator.shared = {}
  # mediator.shared.pusher = new Pusher sd.PUSHER_KEY
  mediator.shared.current_user = new CurrentUser sd.CURRENT_USER

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

syncAccount = ->
  if sd.CURRENT_USER
    $.ajax
      url: "#{sd.API_URL}/accounts"
      success: (data) ->
        console.log 'accounts', data
        showAnnouncements data.announcements
        showNotifications data.user.notification_count
        setFollows data.user.following_ids
      error: (data) -> console.log('syncUser error: data', data)

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids