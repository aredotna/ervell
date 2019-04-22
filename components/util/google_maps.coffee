_ = require 'underscore'
sd = require('sharify').data

# Helpers for getting Google maps urls
module.exports =

  getMapImageSrc: (options) ->
    options = _.defaults({}, options,
      maptype: 'roadmap'
      sensor: false
      style: 'lightness:50|saturation:-100'
      zoom: 16
      sensor: false
    )
    if sd.GOOGLE_MAPS_API_KEY
      options.key = sd.GOOGLE_MAPS_API_KEY
    "https://maps.googleapis.com/maps/api/staticmap?#{$.param(options)}"

  getMapLink: (options) ->
    "https://maps.google.com/maps?#{$.param(options)}"