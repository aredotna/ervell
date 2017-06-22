OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingSearchingSceneView extends OnboardingSceneView
  className: 'OnboardingSearching'
  template: template
