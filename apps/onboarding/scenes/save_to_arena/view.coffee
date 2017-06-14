{ defer } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingSaveToArenaSceneView extends Backbone.View
  className: 'OnboardingSaveToArena'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template
      bookmarklet: require '../../../../lib/bookmarklet.coffee'

    defer => @$el.addClass "#{@className}--active"

    this
