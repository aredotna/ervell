{ API_URL } = require('sharify').data
qs = require 'qs'

module.exports = ->
  $el = $('.js-resend-confirmation')

  { email } = qs.parse(location.search.slice 1)

  if email?
    $el.click (e) ->
      e.preventDefault()

      $el.text 'Sending...'

      $.ajax
        method: 'POST'
        url: "#{API_URL}/confirmations/resend"
        data: email: email
        success: -> $el.text 'Sent!'
        error: -> $el.text 'There was a problem trying to send.'
  else
    $el.remove()
