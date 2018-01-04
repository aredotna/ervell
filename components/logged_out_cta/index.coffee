{ truncate } = require 'underscore.string'
{ CURRENT_USER, USER, CURRENT_ACTION, CHANNEL } = require('sharify').data
{ isPhoneLike } = require '../util/device.coffee'
Dismisser = require '../has_seen/dismisser.coffee'
analytics = require '../../lib/analytics.coffee'
template = -> require('./index.jade') arguments...

module.exports = ->
  return if isPhoneLike()
  return if CURRENT_USER?
  return if CURRENT_ACTION not in ['channel', 'profile', 'block']

  dismisser = new Dismisser
    key: 'logged_out_cta'
    limit: 1
    expires: 2628000 # 1 month

  return if dismisser.dismissed()

  call = switch CURRENT_ACTION
    when 'channel'
      "Join Are.na to #{if CHANNEL.visibility is 'public' then 'add to' else 'follow'} #{truncate(CHANNEL.title, 35)}"
    when 'profile'
      "Join Are.na to follow #{truncate(USER.full_name, 35)}"
    else
      'Are.na is a platform for creative and collaborative research'

  $('body').append $el = $ template call: call

  $el.one 'click', '.js-sign_up', ->
    analytics.track.click 'Clicked sign up from logged out CTA'

  $el.one 'click', '.js-close', (e) ->
    e.preventDefault()
    analytics.track.click 'Closed logged out CTA'
    $el.remove()
    dismisser.dismiss()
