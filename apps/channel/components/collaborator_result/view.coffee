{ contains, map } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class CollaboratorResultView extends Backbone.View
  className: 'CollaboratorResult'

  events:
    'click .js-add': 'add'

  initialize: ({ @current_user, @search }) ->
    @listenTo @collection, 'add remove', @render

  add: ->
    @collection._add @model

  isAddable: ->
    id = parseInt(@model.id, 10)
    ids = map @collection.pluck('id'), (id) -> parseInt(id, 10)
    not contains(ids, id)

  render: ->
    @$el.html template
      current_user: @current_user
      collaborator: @model
      isAddable: @isAddable()

    this
