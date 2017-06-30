{ extend } = require 'underscore'
Cookies = require 'cookies-js'
OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingSaveToArenaSceneView extends OnboardingSceneView
  className: 'OnboardingSaveToArena'
  template: template

  events: extend OnboardingSceneView.prototype.events,
    'dragstart .js-bookmarklet': 'onBookmarklet'

  onBookmarklet: ->
    # Hide "Bookmarklet" tip on profile
    Cookies.set 'bookmarklet_message', true

  locals: ->
    state: @state
    bookmarklet: require '../../../../lib/bookmarklet.coffee'
