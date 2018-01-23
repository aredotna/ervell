Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class CollaboratorsListView extends Backbone.View
  className: 'CollaboratorsList'

  initialize: ->
    @listenTo @collection, 'add remove sync', @render

  render: ->
    @$el.html template
      collaborators: @collection.models

    this
