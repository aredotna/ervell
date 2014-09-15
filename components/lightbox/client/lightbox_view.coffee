Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

module.exports = class LightboxView extends Backbone.View

  initialize: ->
    console.log 'LightboxView initialize', @model

    @model.on "sync", @render, @
    @model.fetch()

  render: ->
    console.log 'should render', @model