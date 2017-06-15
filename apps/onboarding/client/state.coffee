Backbone = require 'backbone'
{ compact, contains } = require 'underscore'
{ isTouch } = require '../../../components/util/device.coffee'

module.exports = class OnboardingState extends Backbone.Model
  defaults:
    scene: 'welcome'

  scenes: compact [
    'welcome'
    'channels'
    'searching'
    'connecting'
    'profile-and-feed'
    'feed'
    'explore'
    'save-to-arena' unless isTouch()
    'find-friends'
  ]

  isAvailable: (scene) ->
    scene in @scenes

  isActive: (ids) ->
    contains ids, @get('scene')

  index: ->
    @scenes.indexOf @get 'scene'

  next: ->
    if scene = @scenes[@index() + 1]
      @set 'scene', scene
    else
      @trigger 'done'
