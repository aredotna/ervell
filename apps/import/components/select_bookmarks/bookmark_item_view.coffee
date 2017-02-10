Backbone = require 'backbone'
template = -> require('./templates/bookmark_item.jade') arguments...

module.exports = class BookmarkItemView extends Backbone.View
  
  events: 
    'click': 'selectItem'

  initialize: ->
    @listenTo @model, 'change', @render

  selectItem: (e) =>
    @model.set 'selected', true
    @model.collection.trigger 'model:selected'

  render: ->
    @$el.replaceWith template
      item: @model