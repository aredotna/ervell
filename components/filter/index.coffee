_ = require 'underscore'
SearchBarView = require './client/search_bar_view.coffee'
FilterResultsView = require './client/results_view.coffee'
FilterBlocks = require '../../collections/filter_blocks.coffee'

module.exports = ({ @model, @subject, $searchBar, $resultContainer, $channelContainer }) ->

  options =
    slug: @model.get('slug')
    type: @model.get('base_class').toLowerCase()

  _.extend(options, subject: @subject) if @subject

  collection = new FilterBlocks [], options

  searchBar = new SearchBarView
    el: $searchBar
    collection: collection

  resultsView = new FilterResultsView
    el: $resultContainer
    collection: collection
    $channelContainer: $channelContainer

  { collection, searchBar, resultsView }