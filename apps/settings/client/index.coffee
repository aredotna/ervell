Backbone = require 'backbone'
SettingsRouter = require './router.coffee'

module.exports = ->
  new SettingsRouter
  Backbone.history.start pushState: true
