mediator = require '../../../../lib/mediator.coffee'
BlockCollectionView = require './block_collection_view.coffee'
Filter = require '../../../filter/index.coffee'

module.exports = ({ $el, model, collection, mode = 'infinite'} ) ->
  mediator.shared.blocks = collection

  if mediator.shared.current_user.isPremium()
    { resultsCollection } = new Filter
      model: model
      $searchBar: $('.form__field__channel-filter')

  new BlockCollectionView
    collection: collection
    resultsCollection: resultsCollection
    el: $el
    mode: mode
    state: mediator.shared.state