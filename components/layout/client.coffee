Backbone = require 'backbone'
Backbone.$ = $
_ = require 'underscore'
HeaderView = require './header/view.coffee'
sd = require('sharify').data
# analytics = require '../../lib/analytics.coffee'

module.exports = ->
  setupJquery()
  setupViews()
  setupReferrerTracking()

ensureFreshUser = (data) ->
  return unless sd.CURRENT_USER
  for attr in ['id', 'type', 'name', 'email', 'phone', 'lab_features',
               'default_profile_id', 'has_partner_access', 'collector_level']
    if not _.isEqual data[attr], sd.CURRENT_USER[attr]
      $.ajax('/user/refresh').then -> window.location.reload()

setupAnalytics = ->
  # Initialize analytics & track page view if we included mixpanel
  # (not included in test environment).
  # analytics(ga: ga)
  # analytics.trackPageview()
  # analytics.registerCurrentUser()

  # # Log a visit once per session
  # unless Cookies.get('active_session')?
  #   Cookies.set 'active_session', true
  #   analytics.track.funnel if sd.CURRENT_USER
  #     'Visited logged in'
  #   else
  #     'Visited logged out'

setupReferrerTracking = ->
  # Live, document.referrer always exists, but let's check
  # 'document?.referrer?.indexOf' just in case we're in a
  # test that stubs document
  # if document?.referrer?.indexOf and document.referrer.indexOf(sd.APP_URL) < 0
  #   Cookies.set 'force-referrer', document.referrer
  #   Cookies.set 'force-session-start', window.location.href

setupViews = ->
  new HeaderView el: $('#main-layout-header'), $window: $(window), $body: $('body')

setupJquery = ->
  $.ajaxSettings.headers =
    'X-AUTH-TOKEN': sd.CURRENT_USER?.access_token

setupAnalytics()