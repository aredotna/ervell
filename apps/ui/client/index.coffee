Backbone = require 'backbone'
Connect = require '../../../components/connect/client/index.coffee'

module.exports = ->
  view = Connect new Backbone.Model

  $('.js-connect').html view.render().$el
