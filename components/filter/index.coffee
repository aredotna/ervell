_ = require 'underscore'
{ API_URL } = require("sharify").data
params = require 'query-params'
SearchBarView = require './client/search_bar_view.coffee'
FilterResultsView = require './client/results_view.coffee'
FilterBlocks = require '../../collections/filter_blocks.coffee'

module.exports = ({ model, subject, $searchBar, $resultContainer, $channelContainer }) ->
  if model
    options =
      slug: model.get('slug')
      type: model.get('base_class').toLowerCase()

    _.extend(options, subject: sd.SUBJECT) if sd.SUBJECT

  resultsCollection = new FilterBlocks [], options

  unless model
    resultsCollection.url = -> "#{sd.API_URL}/search?#{params.encode(resultsCollection.options)}"

  searchBar = new SearchBarView
    el: $searchBar
    collection: resultsCollection

  { resultsCollection, searchBar }