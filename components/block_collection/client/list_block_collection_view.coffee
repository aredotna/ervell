Backbone = require "backbone"
Backbone.$ = $
ListBlockView = require './list_block_view.coffee'
BlockCollectionView = require './block_collection_view.coffee'

module.exports = class ListBlockCollectionView extends BlockCollectionView

  renderBlockView: (block, autoRender = false)=>
    new ListBlockView
      container: $('.grid')
      model: block
      autoRender: autoRender
      channel: @channel if @channel