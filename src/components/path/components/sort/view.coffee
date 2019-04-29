Backbone = require 'backbone'

module.exports = class SortView extends Backbone.View
  events:
    'click .js-sort-option' : 'updateSort'
    
  updateSort: (e) ->
    sort = $(e.currentTarget).data('sort')
    @model.set sort: sort
