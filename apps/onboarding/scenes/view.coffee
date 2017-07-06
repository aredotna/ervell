Backbone = require 'backbone'
{ defer } = require 'underscore'
preserveAspectBind = require '../lib/preserve_aspect_bind.coffee'
mobilizeVideo = require '../lib/mobilize_video.coffee'
{ isTouch } = require '../../../components/util/device.coffee'

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

      # Set up video resizing
      @aspect = preserveAspectBind @$('iframe')

      # Deal with mobile video params
      mobilizeVideo @$('iframe') if isTouch()

    this

  remove: ->
    @aspect.unbind()
    super
