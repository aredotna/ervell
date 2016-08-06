mediator = require '../../../../lib/mediator.coffee'
BlockCollectionView = require './block_collection_view.coffee'
Filter = require '../../../filter/index.coffee'

module.exports = ({ $el, model, collection, mode = 'infinite', channel = false }) ->
  mediator.shared.blocks = collection

  if mediator.shared.current_user.isPremium() and not sd.SHARE_TOKEN
    { resultsCollection, searchBar } = new Filter
      model: model
      $searchBar: $('.form__field__channel-filter')

  view = new BlockCollectionView
    collection: collection
    resultsCollection: resultsCollection
    el: $el.find('.block-collection__contents')
    mode: mode
    state: mediator.shared.state
    channel: channel

  { view, resultsCollection, searchBar }