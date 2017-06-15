OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingSaveToArenaSceneView extends OnboardingSceneView
  className: 'OnboardingSaveToArenaScene'
  template: template
  locals: ->
    state: @state
    bookmarklet: require '../../../../lib/bookmarklet.coffee'
