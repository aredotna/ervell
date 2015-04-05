Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
newCollaboratorView = require './channel_new_collaborator_view.coffee'
collaboratorsTemplate = -> require('../templates/collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  events:
    'click .collaborators__edit__result__remove' : 'removeCollaborator'

  initialize: (options)->
    @isCollaboration = options.isCollaboration
    @isEditable = options.isEditable
    @channel = options.channel

    @collection.on "sync", @render, @
    @collection.on "reset", @render, @
    @collection.on "remove", @render, @

    if @isCollaboration
      @collection.fetch
        success: => mediator.trigger 'collaborators:fetched', @collection

    else
      @render()

    mediator.on 'channel:is-editable', @postRender, @
    mediator.on 'collaborators:editing', @editMode, @
    mediator.on 'collaborators:reading', @readMode, @

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    @postRender() if @isEditable

  postRender: ->
    @$('.collaborators__empty-collaborators').html ""

    new newCollaboratorView
      el: $('.collaborators__new-collaborator')
      collaborators: @collection
      channel: @channel

  editMode: ->
    @$el.addClass 'is-editing'

  readMode: ->
    @$el.removeClass 'is-editing'

  removeCollaborator: (e)->
    analytics.track.click "Collaborator removed on #{@channel.get('status')} channel"
    @collection._remove $(e.target).data 'id'
