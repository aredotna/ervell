OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingExploreSceneView extends OnboardingSceneView
  className: 'OnboardingExplore'
  template: template
