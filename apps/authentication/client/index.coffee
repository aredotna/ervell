Backbone = require 'backbone'
AuthenticationRouter = require './router.coffee'

module.exports = ->
  new AuthenticationRouter
  Backbone.history.start pushState: true
