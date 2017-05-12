{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectItemView = require '../item/view.coffee'

module.exports = class ConnectResultsView extends Backbone.View
  className: 'Connect__results'

  initialize: ->
    @listenTo @collection, 'sync', @render

  render: ->
    @subViews = @collection.map (model) ->
      new ConnectItemView model: model

    @$el
      .empty()
      .html @subViews.map (view) ->
        view.render().$el

    this

  remove: ->
    invoke @subViews, 'remove'
    super
