{ CURRENT_USER, USER, CURRENT_ACTION, CHANNEL } = require('sharify').data
template = -> require('./index.jade') arguments...

module.exports = ->
  return if CURRENT_USER?
  return if CURRENT_ACTION not in ['channel', 'profile', 'block']

  call = switch CURRENT_ACTION
    when 'channel'
      "Sign up for Are.na to #{if CHANNEL.visibility is 'public' then 'add to' else 'follow'} #{CHANNEL.title}"
    when 'profile'
      "Sign up for Are.na to follow #{USER.full_name}"
    else
      'Are.na is a platform for creative and collaborative research'

  $('body').append $el = $ template call: call
