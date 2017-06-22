Cookies = require 'cookies-js'
analytics = require '../../lib/analytics.coffee'

module.exports = ->
  $el = $('.LoggedOutCTA')

  unless Cookies.get 'LoggedOutCTA'
    $el.addClass 'LoggedOutCTA--visible'

    $el.on 'click', '.js-close', (e) ->
      e.preventDefault()

      $el.removeClass 'LoggedOutCTA--visible'

      Cookies.set 'LoggedOutCTA', true, expires: 86400000 # 1 day

      analytics.track.click 'Closed "Learn More" CTA'
