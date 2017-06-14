{ defer, delay } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingChannelsSceneView extends Backbone.View
  className: 'OnboardingChannels'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template()

    defer =>
      @$el.addClass "#{@className}--active"

    delay =>
      @$('video').trigger 'play'
    , 500

    this
