Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingFindFriendsSceneView extends Backbone.View
  className: 'OnboardingFindFriends'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) -> #

  next: (e) ->
    e.preventDefault()
    @state.next()

  render: ->
    @$el.html template()
    this
