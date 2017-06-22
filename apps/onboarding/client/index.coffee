Backbone = require 'backbone'
OnboardingRouter = require './router.coffee'

module.exports = ->
  new OnboardingRouter
  Backbone.history.start pushState: true
