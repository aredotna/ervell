{ isTouch } = require '../../util/device.coffee'
initMobile = require './mobile.coffee'
initExpandables = require './expandables.coffee'

module.exports = ($el) ->
  initExpandables $el

  return unless isTouch()

  initMobile $el
