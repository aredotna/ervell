Backbone = require 'backbone'

module.exports = class OnboardingState extends Backbone.Model
  defaults:
    scene: 'welcome'
    scenes: [
      'welcome',
      'channels',
      'connecting',
      'profile_and_feed',
      'save_to_arena',
      'find_friends',
    ]

  index: ->
    @get('scenes').indexOf @get 'scene'

  next: ->
    if scene = @get('scenes')[@index() + 1]
      @set 'scene', scene
    else
      @trigger 'done'
