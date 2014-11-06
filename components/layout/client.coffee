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

setupPusherAndCurrentUser = ->
  mediator.shared = {}
  mediator.shared.pusher = new Pusher sd.PUSHER_KEY
  mediator.shared.current_user = new CurrentUser sd.CURRENT_USER

setupViews = ->
  new HeaderView el: $('#layout-header'), $window: $(window), $body: $('body')
  new BodyView el: $('body')

setupAjaxHeaders = ->
  $.ajaxSetup
    beforeSend: (xhr)->
      xhr.setRequestHeader 'X-AUTH-TOKEN', sd.CURRENT_USER?.authentication_token

setupPageclickEvent = -> # nothing for now