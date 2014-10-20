Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  initialize: ->
    mediator.trigger 'connect'
    @render()
    super

  render: =>
    @$el.html connectTemplate()