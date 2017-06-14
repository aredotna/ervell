OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingConnectingSceneView extends OnboardingSceneView
  className: 'OnboardingConnecting'
  template: template
