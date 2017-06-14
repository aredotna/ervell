Backbone = require 'backbone'

module.exports = class OnboardingState extends Backbone.Model
  defaults:
    scene: 'welcome'
    scenes: [
      'welcome',
      'channels',
      'searching',
      'connecting',
      'profile-and-feed',
      'feed',
      'explore',
      'save-to-arena',
      'find-friends',
    ]

  index: ->
    @get('scenes').indexOf @get 'scene'

  next: ->
    if scene = @get('scenes')[@index() + 1]
      @set 'scene', scene
    else
      @trigger 'done'
