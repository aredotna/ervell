Backbone = require 'backbone'
{ defer } = require 'underscore'
preserveAspectBind = require '../lib/preserve_aspect_bind.coffee'

module.exports = class OnboardingSceneView extends Backbone.View
  className: 'NotImplemented'

  aspect: null

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
      @aspect = preserveAspectBind @$('iframe')

    this

  remove: ->
    @aspect.unbind()
    super
