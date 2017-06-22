Backbone = require 'backbone'
OnboardingScenesView = require './view.coffee'
OnboardingState = require './state.coffee'
views = require './views.coffee'

module.exports = class OnboardingRouter extends Backbone.Router
  routes:
    'welcome': 'scene'
    'welcome/:scene': 'scene'

  initialize: ->
    @state = new OnboardingState

    @listenTo @state, 'change:scene', @exec
    @listenTo @state, 'done', @done

  exec: ->
    @navigate "/welcome/#{@state.get 'scene'}", trigger: true

  scene: (scene) ->
    @state.set 'scene', (scene or 'welcome'), silent: true
    view = new OnboardingScenesView state: @state, views: views
    $('.js-onboarding').html view.render().$el

  done: ->
    window.location = '/'
