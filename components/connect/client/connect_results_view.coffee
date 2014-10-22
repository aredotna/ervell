Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
UserBlocks = require '../../../collections/user_blocks.coffee'

connectResultsTemplate = -> require('../templates/connect_results.jade') arguments...

module.exports = class ConnectResultsView extends Backbone.View

  initialize: ->
    
    super

  render: =>
    @$el.html connectResultsTemplate()
    @renderChannels()