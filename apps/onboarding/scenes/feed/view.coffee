{ defer } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingFeedSceneView extends Backbone.View
  className: 'OnboardingFeed'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template()

    defer => @$el.addClass "#{@className}--active"

    this
