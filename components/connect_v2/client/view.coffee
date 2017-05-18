{ invoke, compact } = require 'underscore'
Backbone = require 'backbone'
ConnectSearchView = require '../components/search/view.coffee'
ConnectHeaderView = require '../components/header/view.coffee'
ConnectResultsView = require '../components/results/view.coffee'

module.exports = class ConnectView extends Backbone.View
  className: 'Connect'

  attributes:
    'data-state': 'inactive'

  initialize: ->
    @state = new Backbone.Model active: false, query: ''

    options = model: @model, collection: @collection, state: @state

    @subViews = [
      @searchView = new ConnectSearchView options
      @headerView = new ConnectHeaderView options
      @resultsView = new ConnectResultsView options
    ]

    @listenTo @state, 'change:active', @toggle

  toggle: (_state, active) ->
    @$el.attr 'data-state', if active
      'active'
    else
      'inactive'

  render: ->
    @$el.html compact([
      @searchView.render().$el
      @headerView.render().$el
      @resultsView.render().$el
    ])

    this

  remove: ->
    invoke @subViews, 'remove'
    super
