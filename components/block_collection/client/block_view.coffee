Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...

module.exports = class BlockView extends Backbone.View

  initialize: ->
    mediator.trigger 'connect'
    @render()
    super

  render: =>
    @$el.html blockTemplate()