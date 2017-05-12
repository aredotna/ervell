{ invoke } = require 'underscore'
Backbone = require 'backbone'
ConnectSearchView = require '../components/search/view.coffee'
ConnectHeaderView = require '../components/header/view.coffee'
ConnectResultsView = require '../components/results/view.coffee'

module.exports = class ConnectView extends Backbone.View
  className: 'Connect'

  attributes:
    'data-state': 'inactive'

  initialize: ->
    @subViews = [
      @searchView = new ConnectSearchView collection: @collection
      @headerView = new ConnectHeaderView
      @resultsView = new ConnectResultsView collection: @collection
    ]

    @listenTo @searchView, 'reset', @deactivate
    @listenTo @searchView, 'query', @activate

  activate: ->
    @$el.attr 'data-state', 'active'

  deactivate: ->
    @$el.attr 'data-state', 'inactive'

  render: ->
    @$el.html [
      @searchView.render().$el
      @headerView.render().$el
      @resultsView.render().$el
    ]

    this

  remove: ->
    invoke @subViews, 'remove'
    super
