Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

blockTemplate = -> require('../templates/block.jade') arguments...

module.exports = class BlockView extends Backbone.View
  autoRender: true
  container: null
  containerMethod: 'append'

  initialize: (options)->
    @container = options.container if options.container
    @render() if @autoRender
    @$el = $("##{@model.id}")

    @listenTo @model, 'change', @update

    super

  update: =>
    # this doesnt work yet
    # @$el.replaceWith blockTemplate(block: @model)

  render: =>
    @container[@containerMethod] blockTemplate(block: @model)