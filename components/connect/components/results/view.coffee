{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectSearchView = require '../search/view.coffee'
ConnectItemView = require '../item/view.coffee'
ConnectCreateView = require '../create/view.coffee'
config = require '../../config.coffee'

module.exports = class ConnectResultsView extends Backbone.View
  className: 'Connect__results'

  subViews: []

  initialize: ({ @state, @search, @eventBus }) ->
    @listenTo @search, 'sync add reset', @render

  render: ->
    invoke @subViews, 'remove'

    subViews = @search.first(config.amount)
      .map (model) =>
        new ConnectItemView
          model: model
          collection: @collection
          connectable: @model
          eventBus: @eventBus

    connectCreateView = new ConnectCreateView
      search: @search
      collection: @collection
      connectable: @model
      state: @state
      eventBus: @eventBus

    @subViews = [connectCreateView].concat subViews

    @$el.html @subViews.map (view) ->
      view.render().$el

    this

  remove: ->
    invoke @subViews, 'remove'
    super
