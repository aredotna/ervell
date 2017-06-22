OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingProfileAndFeedSceneView extends OnboardingSceneView
  className: 'OnboardingProfileAndFeed'
  template: template
