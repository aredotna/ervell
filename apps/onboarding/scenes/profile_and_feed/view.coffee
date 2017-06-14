Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingProfileAndFeedSceneView extends Backbone.View
  className: 'OnboardingProfileAndFeed'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template()
    this
