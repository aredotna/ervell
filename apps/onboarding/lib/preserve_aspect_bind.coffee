{ debounce } = require 'underscore'
preserveAspect = require './preserve_aspect.coffee'

module.exports = ($iframe, { wait } = { wait: 200 }) ->
  return { unbind: (->) } unless $iframe.length

  (exec = preserveAspect of: $iframe, from: $iframe.parent())()

  ($window = $(window))
    .on 'resize.preserveAspect', debounce exec, wait

  exec: exec
  unbind: ->
    $window.off '.preserveAspect'
