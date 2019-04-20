_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'

messageButtonTemplate = -> require('../templates/message_button.jade') arguments...

module.exports = class PrivateChannelView extends Backbone.View

  events:
    'click' : 'startChannel'

  initialize: ({@showTitle}) ->
    @showTitle = if @showTitle? then @showTitle else true

    @render()

  render: ->
    @$el.html messageButtonTemplate
      model: @model
      showTitle: @showTitle

  startChannel: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.startPrivateChannel()

