{ map } = require 'underscore'

module.exports = ({ title, href }, { height, width } = { width: 750, height: 400 }) ->
  $window = $(window)

  x = window?.screenLeft or window.screenX
  y = window?.screenTop or window.screenY
  top = (y + ($window.height() / 2) - (height / 2)) or 0
  left = (x + ($window.width() / 2) - (width / 2)) or 0

  properties =
    status: 1
    width: width
    height: height
    top: top
    left: left

  options = map(properties, (v, k) -> "#{k}=#{v}").join ','

  window.open href, title, options

  properties
