Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingConnectingSceneView extends Backbone.View
  className: 'OnboardingConnecting'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template()
    this
