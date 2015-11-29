mediator = require '../../lib/mediator.coffee'
{ track } = require '../../lib/analytics.coffee'

module.exports = ->
  mediator.on 'auth:change:mode', (mode) ->
    mode = mode?.mode if typeof mode is 'object'
    track.click "Changed login mode to #{mode}"

  mediator.on 'current_user:logged_in', ->
    track.submit 'User logged in'
