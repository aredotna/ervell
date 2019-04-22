Backbone = require 'backbone'

module.exports = class FilterView extends Backbone.View
  events:
    'click .js-filter-option' : 'updateFilter'
    
  updateFilter: (e) ->
    filter = $(e.currentTarget).data('filter')
    @model.set filter: filter
