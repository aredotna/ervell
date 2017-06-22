OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingFeedSceneView extends OnboardingSceneView
  className: 'OnboardingFeed'
  template: template
