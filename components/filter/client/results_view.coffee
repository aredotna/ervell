Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'

template = -> require('../templates/results.jade') arguments...

module.exports = class ChannelFilterResultsView extends Backbone.View

  initialize: ({ @el, @collection, @$channelContainer })->
    @collection.on "sync add", @render, @
    @collection.on "reset", @reset, @

  render: ->
    @$('.grid').html template blocks: @collection.models
    @$el.addClass 'is-active'
    @$channelContainer.addClass 'is-hidden'

  reset: ->
    @$el.removeClass 'is-active'
    @$channelContainer.removeClass 'is-hidden'