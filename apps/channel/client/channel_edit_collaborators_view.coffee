Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'
newCollaboratorView = require './channel_new_collaborator_view.coffee'
collaboratorsTemplate = -> require('../templates/edit_collaborators.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  events:
    'click .collaborators__edit__result__remove' : 'removeCollaborator'

  initialize: ({ @isCollaboration, @isEditable, @channel })->
    @collection.on "sync", @render, @
    @collection.on "reset", @render, @
    @collection.on "remove", @render, @

    mediator.on 'channel:is-editable', @setEditable, @

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    @postRender() if @isEditable

  setEditable: ->
    @isEditable = true
    @postRender()

  postRender: ->
    @$('.collaborators__empty-collaborators').html ""

    new newCollaboratorView
      el: $('.collaborators__new-collaborator')
      collaborators: @collection
      channel: @channel

  removeCollaborator: (e)->
    analytics.track.click "Collaborator removed on #{@channel.get('status')} channel"
    @collection._remove $(e.target).data 'id'
