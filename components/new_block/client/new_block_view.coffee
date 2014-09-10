Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../../models/channel.coffee'

module.exports = class NewBlockView extends Backbone.View

  initialize: ->
    console.log 'this NewBlockView', @, 'el', @$el