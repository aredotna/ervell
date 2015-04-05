_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
qs = require('querystring')

module.exports = (options) =>
  return if module.exports.getUserAgent()?.indexOf?('PhantomJS') > -1
  { @ga, @location } = options
  @location ?= window?.location
  if sd.GOOGLE_ANALYTICS_ID
    googleAnalyticsParams = cookieDomain: 'are.na'

    if sd.CURRENT_USER?.id
      googleAnalyticsParams.userId = sd.CURRENT_USER?.id

    @ga? 'create', sd.GOOGLE_ANALYTICS_ID, googleAnalyticsParams

module.exports.getUserAgent = ->
  window?.navigator?.userAgent

module.exports.trackPageview = =>
  @ga? 'send', 'pageview'

module.exports.registerCurrentUser = ->
  userType = if sd.CURRENT_USER then "Logged In" else "Logged Out"
  ga?('set', 'dimension1', userType)
  ga?('set', 'dimension2', sd.CURRENT_USER?.registered) if sd.CURRENT_USER

# This basically just sets some defaults loosely based on the
# Analytics wrapper class from Gravity
categories =
  impression: 'Impressions'
  hover: 'UI Interactions'
  click: 'UI Interactions'
  submit: 'UI Interactions'
  funnel: 'Funnel Progressions'
  segment: 'UI A/B Test Segments'
  error: 'UI Errors'
  multi: 'Multi-object Events'
  timing: 'Timing'
  other: 'Other Events'

module.exports.track = track =
  _.reduce(Object.keys(categories), (memo, kind) ->
    memo[kind] = (description, options = {}) ->
      # Send google analytics event
      ga? 'send', {
        hitType: 'event'
        eventCategory: options.category
        eventAction: description
        eventLabel: options.label
        nonInteraction: (if options.category in ['Funnel Progressions', 'Impressions', 'Timing'] then 1 else 0)
      }
    memo
  , {})

# These need to be set up individually before using. Read this non-sense:
# https://developers.google.com/analytics/devguides/platform/customdimsmets
module.exports.setDimension = (index, value) ->
  ga? 'set', index, value
