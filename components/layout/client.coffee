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
  setupPusherAndCurrentUser()
  setupViews()
  setupAjaxHeaders()

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

  mediator.shared.pusher = new Pusher sd.PUSHER_KEY

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

showAnnouncements = (announcements) ->
  # stub

showNotifications = (notifications) ->
  # stub

setFollows = (following_ids) ->
  mediator.shared.current_user.set 'following_ids', following_ids