Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
collaboratorsTemplate = -> require('../templates/collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  initialize: (options)->
    @isCollaboration = options.isCollaboration

    @collection.on "sync", @render, @

    if @isCollaboration
      @collection.fetch()
    else
      @render()

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    mediator.trigger 'collaborators:fetched', @collection