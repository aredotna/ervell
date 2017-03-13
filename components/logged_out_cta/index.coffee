Cookies = require 'cookies-js'
analytics = require '../../lib/analytics.coffee'

module.exports = ->
  $el = $('.lo-cta')

  unless Cookies.get('lo-cta')
    $el.addClass 'lo-cta--visible'

    $el.on 'click', '.lo-cta__close', (e) ->
      $el.removeClass 'lo-cta--visible'
      analytics.track.click 'Closed "Learn More" CTA'
      # Cookie expires in 1 day
      Cookies.set 'lo-cta', true, { expires: 86400000 }