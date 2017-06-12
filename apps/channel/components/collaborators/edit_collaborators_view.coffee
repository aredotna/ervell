Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../../lib/mediator.coffee'
analytics = require '../../../../lib/analytics.coffee'
NewCollaboratorView = require './new_collaborator_view.coffee'
collaboratorsTemplate = -> require('./templates/edit.jade') arguments...

module.exports = class ChannelCollaborationView extends Backbone.View

  events:
    'click .js-collaborators-remove' : 'removeCollaborator'

  initialize: ({ @isCollaboration, @isEditable, @channel })->
    @listenTo @collection, "sync reset remove add update", @render

    mediator.on 'channel:is-editable', @setEditable, @

  render: ->
    @$el.html collaboratorsTemplate(collaborators: @collection.models)
    @_postRender() if @isEditable

  setEditable: ->
    @isEditable = true
    @_postRender()

  _postRender: ->
    @$('.collaborators__empty-collaborators').html ""

    view = new NewCollaboratorView
      el: $('.collaborators__new-collaborator')
      collaborators: @collection
      channel: @channel
    
    view.render()

  removeCollaborator: (e)->
    analytics.track.click "Collaborator removed on #{@channel.get('status')} channel"
    @collection._remove $(e.currentTarget).data 'id'
