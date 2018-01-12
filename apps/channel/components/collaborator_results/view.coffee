{ invoke } = require 'underscore'
Backbone = require 'backbone'
CollaboratorResultView = require '../collaborator_result/view.coffee'

module.exports = class CollaboratorResultsView extends Backbone.View
  className: 'CollaboratorResults'

  subViews: []

  initialize: ({ @search, @collection, @current_user }) ->
    @listenTo @search, 'sync add remove reset', @render

  render: ->
    invoke @subViews, 'remove'

    @subViews = @search.map (model) =>
      new CollaboratorResultView
        current_user: @current_user
        model: model
        collection: @collection
        search: @search

    @$el.html @subViews.map (view) ->
      view.render().$el

    this

  remove: ->
    invoke @subViews, 'remove'
    super
