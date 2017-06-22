Backbone = require 'backbone'
{ defer } = require 'underscore'

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

  locals: ->
    state: @state

  render: ->
    @$el.html @template(@locals())

    defer =>
      @$el.addClass "#{@className}--active"

    this
