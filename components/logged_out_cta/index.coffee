{ truncate } = require 'underscore.string'
{ CURRENT_USER, USER, CURRENT_ACTION, CHANNEL } = require('sharify').data
{ isPhoneLike } = require '../util/device.coffee'
analytics = require '../../lib/analytics.coffee'
template = -> require('./index.jade') arguments...

module.exports = ->
  return if isPhoneLike()
  return if CURRENT_USER?
  return if CURRENT_ACTION not in [
    'search'
    'explore'
    'channel'
    'profile'
    'block'
  ]

  call = switch CURRENT_ACTION
    when 'channel'
      "Join Are.na to #{if CHANNEL.visibility is 'public' then 'add to' else 'follow'} #{truncate(CHANNEL.title, 35)}"
    when 'profile'
      "Join Are.na to follow #{truncate(USER.full_name, 35)}"
    else
      'Make channels, add content, connect ideas.'

  $('body').append $el = $ template
    call: call
    action: CURRENT_ACTION

  $el.one 'click', '.js-sign_up', ->
    analytics.track.click 'Clicked sign up from logged out CTA'
