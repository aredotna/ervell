{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectSearchView = require '../search/view.coffee'
ConnectItemView = require '../item/view.coffee'
ConnectCreateView = require '../create/view.coffee'
config = require '../../config.coffee'

module.exports = class ConnectResultsView extends Backbone.View
  className: 'Connect__results'

  initialize: ({ @state }) ->
    @listenTo @collection, 'sync add reset', @render

  render: ->
    subViews = @collection.first(config.amount)
      .map (model) =>
        new ConnectItemView
          model: model
          connectable: @model

    connectCreateView = new ConnectCreateView
      state: @state
      collection: @collection
      connectable: @model

    @subViews = [connectCreateView].concat subViews

    @$el.empty()
      .html @subViews.map (view) ->
        view.render().$el

    this

  remove: ->
    invoke @subViews, 'remove'
    super
