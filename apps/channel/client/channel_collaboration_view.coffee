Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
collaboratorsTemplate = -> require('../templates/collaborators/collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View
  initialize: ({ @isCollaboration, @isEditable, @channel })->
    @collection.on "sync reset remove add update", @render, @

    if @isCollaboration
      @collection.fetch
        success: => mediator.trigger 'collaborators:fetched', @collection
    else
      @render()

  render: ->
    @$el.html collaboratorsTemplate 
      collaborators: @collection.models
