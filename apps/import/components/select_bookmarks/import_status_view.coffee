Backbone = require 'backbone'
template =-> require('./templates/import_status.jade') arguments...

module.exports = class ImportStatusView extends Backbone.View
  initialize: ->
    @listenTo @collection, 'model:selected', @render

  render: ->
    @$el.html template
      collection: @collection