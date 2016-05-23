mediator = require '../../../../lib/mediator.coffee'
BlockCollectionView = require './block_collection_view.coffee'

module.exports = ({ $el, collection, mode = 'infinite'} ) ->
  new BlockCollectionView
    collection: collection
    el: $el
    mode: mode
    state: mediator.shared.state