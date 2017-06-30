{ defer } = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingWelcomeSceneView extends Backbone.View
  className: 'OnboardingWelcome'

  events:
    'click .js-next': 'next'

  initialize: ({ @state }) ->
    @user = new CurrentUser CURRENT_USER

  next: (e) ->
    e.preventDefault()

    @state.next()

  render: ->
    @$el.html template
      user: @user.toJSON()

    defer => @$el.addClass "#{@className}--active"

    this
