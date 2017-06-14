OnboardingSceneView  = require '../view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingChannelsSceneView extends OnboardingSceneView
  className: 'OnboardingChannels'
  template: template
