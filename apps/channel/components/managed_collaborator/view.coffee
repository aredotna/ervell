{ extend } = require 'underscore'
Backbone = require 'backbone'
{ CAN } = require('sharify').data
template = -> require('./index.jade') arguments...

module.exports = class ManagedCollaboratorView extends Backbone.View
  className: 'ManagedCollaborator CollaboratorItem'

  events:
    'click .js-remove-collaborator': 'removeCollaborator'
    'click .js-confirm-removal': 'confirmRemoval'

  initialize: ({ @current_user, @collection }) ->
    @state = new Backbone.Model action: 'inactive'

    @listenTo @state, 'change', @render

  removeCollaborator: ->
    @state.set 'action', 'confirm'

  confirmRemoval: ->
    @collection._remove @model.id

  render: ->
    @$el.html template extend {},
      @state.toJSON(),
      current_user: @current_user
      collaborator: @model

    this
