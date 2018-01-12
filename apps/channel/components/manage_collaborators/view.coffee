{ invoke } = require 'underscore'
Backbone = require 'backbone'
{ COLLABORATORS } = require('sharify').data
CollaboratorSearch = require '../../../../collections/search_users.coffee'
ManagedCollaboratorView = require '../managed_collaborator/view.coffee'
CollaboratorSearchView = require '../collaborator_search/view.coffee'
CollaboratorResultsView = require '../collaborator_results/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ManageCollaboratorsView extends Backbone.View
  className: 'ManageCollaborators'

  subViews: []

  events:
    'click .js-done': 'done'

  initialize: ({ @current_user }) ->
    @search = new CollaboratorSearch

    @listenTo @collection, 'add remove', @render

  done: ->
    # TODO: Use the same collection within the list on the page
    # so that it's updated when we close.
    # window.location.reload()

  render: ->
    @$el.html template
      current_user: @current_user
      collaborators: @collection.models

    @postRender()

    this

  postRender: ->
    collaboratorSearchView = new CollaboratorSearchView
      current_user: @current_user
      search: @search
      collection: @collection

    collaboratorResultsView = new CollaboratorResultsView
      current_user: @current_user
      search: @search
      collection: @collection

    managedCollaboratorViews = @collection
      .map (collaborator) =>
        new ManagedCollaboratorView
          current_user: @current_user
          collection: @collection
          model: collaborator

    @$('.js-collaborator-search')
      .html [
        collaboratorSearchView.render().$el
        collaboratorResultsView.render().$el
      ]

    @$('.js-managed-collaborators')
      .html managedCollaboratorViews.map (view) ->
        view.render().$el

    @subViews = [collaboratorSearchView, collaboratorResultsView]
      .concat managedCollaboratorViews

  remove: ->
    invoke @subViews, 'remove'
    super
