Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
newCollaboratorView = require './channel_new_collaborator_view.coffee'
collaboratorsTemplate = -> require('../templates/collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  initialize: (options)->
    @isCollaboration = options.isCollaboration
    @isEditable = options.isEditable
    @channel = options.channel

    @collection.on "sync", @render, @

    if @isCollaboration
      @collection.fetch()
    else
      @render()

    mediator.on 'channel:is-editable', @postRender, @

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    mediator.trigger 'collaborators:fetched', @collection

    @postRender() if @isEditable

  postRender: ->
    @$('.collaborators__empty-collaborators').html ""

    new newCollaboratorView
      el: $('.collaborators__new-collaborator')
      collaborators: @collection
      channel: @channel

