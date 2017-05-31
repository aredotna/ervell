{ isTouch } = require '../../util/device.coffee'
initMobile = require './mobile.coffee'

module.exports = ($el) ->
  return unless isTouch()

  initMobile $el
