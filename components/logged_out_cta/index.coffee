Cookies = require 'cookies-js'

module.exports = ->
  $el = $('.lo-cta')

  unless Cookies.get('lo-cta')
    $el.addClass 'lo-cta--visible'

    $el.on 'click', '.lo-cta__close', (e) ->
      $el.slideToggle "fast"
      
      # Cookie expires in 1 day
      Cookies.set 'lo-cta', true, { expires: 86400000 }