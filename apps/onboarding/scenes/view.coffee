Backbone = require 'backbone'
{ defer, delay } = require 'underscore'
{ isTouch } = require '../../../components/util/device.coffee'

module.exports = class OnboardingSceneView extends Backbone.View
  className: 'NotImplemented'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  template: ->
    throw new Error 'Not Implemented'

  locals: -> {}

  render: ->
    @$el.html @template(@locals())

    defer =>
      @$el.addClass "#{@className}--active"

    unless isTouch()
      delay =>
        console.log 'Play video'
      , 500

    this
