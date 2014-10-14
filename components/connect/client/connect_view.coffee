Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data

connectTemplate = -> require('../../../components/feed/templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  initialize: ->
    super

  render: =>
    @$el.html connectTemplate()