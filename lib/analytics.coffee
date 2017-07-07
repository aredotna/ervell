{ extend, reduce } = require 'underscore'
{ capitalize } = require 'underscore.string'
{ NODE_ENV, CURRENT_USER, GOOGLE_ANALYTICS_ID } = require('sharify').data

module.exports = (options) =>
  return if module.exports.getUserAgent()?.indexOf?('PhantomJS') > -1

  { @ga, @location } = options

  @location ?= window?.location

  if GOOGLE_ANALYTICS_ID
    googleAnalyticsParams = cookieDomain: 'are.na'

    if CURRENT_USER?.id
      googleAnalyticsParams.userId = CURRENT_USER?.id

    @ga? 'create', GOOGLE_ANALYTICS_ID, googleAnalyticsParams

module.exports.getUserAgent = ->
  window?.navigator?.userAgent

module.exports.trackPageview = (args = {}) =>
  opts = extend { hitType: 'pageview' }, args
  ga? 'send', opts

module.exports.trackOutboundLink = (url, cb = $.noop) =>
  ga? 'send', 'event', 'Outbound link', 'click', url,
    'transport': 'beacon'
    'hitCallback': cb

module.exports.registerCurrentUser = ->
  userType = if CURRENT_USER then "Logged In" else "Logged Out"
  ga?('set', 'dimension1', userType)
  ga?('set', 'dimension2', CURRENT_USER?.registered) if CURRENT_USER

module.exports.modelNameAndIdToLabel = (modelName, id) ->
  throw new Error('Requires modelName and id') unless modelName? and id?

  "#{capitalize modelName}:#{id}"

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
  reduce Object.keys(categories), (memo, kind) ->
    memo[kind] = (description, options = {}) ->
      if NODE_ENV is 'development'
        console.info "analytics.#{kind}: #{description}", options

      else
        ga? 'send',
          hitType: 'event'
          eventCategory: options.category or 'UI Interactions'
          eventAction: description
          eventLabel: options.label
          eventValue: options.value
          nonInteraction: if options.category in ['Funnel Progressions', 'Impressions', 'Timing'] then 1 else 0

    memo
  , {}

module.exports.exception = (errorObj) ->
  @ga? 'send', 'exception', errorObj

# These need to be set up individually before using. Read this non-sense:
# https://developers.google.com/analytics/devguides/platform/customdimsmets
module.exports.setDimension = (index, value) ->
  @ga? 'set', index, value

# Event labels in alphabetical (key) order
module.exports.en =
  CREATE_CHANNEL: 'New Channel created'
  CREATE_CONNECTION: 'Connection created'
  DESTROY_CONNECTION: 'Connection removed'
  PREMIUM_CHARGE_INITIATED: 'User clicked to submit charge for premium'
  PREMIUM_PAID: 'User paid for pro account'
