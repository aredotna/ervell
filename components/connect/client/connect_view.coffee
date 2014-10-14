Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  initialize: ->
    console.log('rendering ConnectView')
    @render()
    super

  render: =>
    @$el.html connectTemplate()