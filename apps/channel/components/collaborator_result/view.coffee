{ contains } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class CollaboratorResultView extends Backbone.View
  className: 'CollaboratorResult'

  events:
    'click .js-add': 'add'

  initialize: ({ @current_user, @search }) ->
    @isAddable = not contains(@collection.pluck('id'), parseInt(@model.id, 10))

    @listenTo @collection, 'add remove', @render

  add: ->
    @collection._add @model

  render: ->
    @$el.html template
      current_user: @current_user
      collaborator: @model
      isAddable: @isAddable

    this
