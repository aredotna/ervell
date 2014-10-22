Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
ConnectResultsView = require './connect_results_view.coffee'

connectTemplate = -> require('../templates/connect.jade') arguments...

module.exports = class ConnectView extends Backbone.View

  initialize: ->
    mediator.trigger 'connect'
    @render()
    super

  render: =>
    @$el.html connectTemplate()
    @focusSearch()
    @renderChannels()

  focusSearch: ->
    @$('.new-connection__search').focus()

  renderChannels: =>
    new ConnectResultsView
      el: @$('.new-connection__search-results')