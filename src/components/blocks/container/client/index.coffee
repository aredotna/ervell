mediator = require '../../../../lib/mediator.coffee'
BlockCollectionView = require './block_collection_view.coffee'
Filter = require '../../../filter/index.coffee'

module.exports = ({ $el, model, collection, mode = 'infinite', channel = false }) ->
  mediator.shared.blocks = collection

  if not sd.SHARE_TOKEN
    { resultsCollection, searchBar } = new Filter
      model: model
      $searchBar: $('.js-channel-filter')

  view = new BlockCollectionView
    collection: collection
    resultsCollection: resultsCollection
    el: $el.find('.js-block-collection')
    mode: mode
    state: mediator.shared.state
    channel: channel

  { view, resultsCollection, searchBar }