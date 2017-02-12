_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./templates/bookmark_item.jade') arguments...

module.exports = class BookmarkItemView extends Backbone.View
  
  events: 
    'click': 'toggleSelect'

  initialize: ->
    @listenTo @model, 'change', @render

  toggleSelect: (e) =>
    if @model.get('selected') is true
      @model.set 'selected', false
    else
      @model.set 'selected', true
      
    @model.collection.trigger 'model:selected'

  render: ->
    html = template
      item: @model
    @$el.replaceWith html
    @setElement $("##{@model.id}")
    _.defer => @delegateEvents()