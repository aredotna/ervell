_ = require 'underscore'
Backbone = require 'backbone'
BookmarkItemView = require './bookmark_item_view.coffee'

module.exports = class BookmarkListView extends Backbone.View
  initialize: ->
    @setupItemViews()

  setupItemViews: ->
    @collection.each (item) =>
      new BookmarkItemView
        el: @$("##{item.id}")
        model: item
