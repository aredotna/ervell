Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
collaboratorsTemplate = -> require('../templates/collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  initialize: ->
    @collection.on "sync", @render, @

    @collection.fetch()

    super

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    mediator.trigger 'collaborators:fetched', @collection