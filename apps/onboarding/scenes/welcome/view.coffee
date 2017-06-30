{ defer } = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Promise = require 'bluebird-q'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
template = -> require('./index.jade') arguments...

module.exports = class OnboardingWelcomeSceneView extends Backbone.View
  className: 'OnboardingWelcome'

  events:
    'click .js-next': 'next'
    'click .js-skip': 'skip'

  initialize: ({ @state }) ->
    @user = new CurrentUser CURRENT_USER

  next: (e) ->
    e.preventDefault()

    @state.next()

  skip: (e) ->
    e.preventDefault()
    e.stopPropagation()

    Promise @user.save(show_tour: false)
      .finally ->
        window.location = '/'

  render: ->
    @$el.html template()

    defer => @$el.addClass "#{@className}--active"

    this
