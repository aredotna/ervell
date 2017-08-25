{ CURRENT_USER } = require('sharify').data
CurrentUser = require '../../models/current_user.coffee'
template = -> require('./index.jade') arguments...

module.exports = ->
  # Only displays message when user is logged in and in need of confirmation
  return unless CURRENT_USER?.is_pending_confirmation

  $el = $(template())

  $('body').append $el

  $el.one 'click', '.js-close', (e) ->
    e.preventDefault()
    $el.remove()

  # Double check because unable to update Sharify's representation
  # on the next request after confirming.
  user = new CurrentUser CURRENT_USER
  user.fetch()
    .then ->
      $el.remove() unless user.get('is_pending_confirmation')
