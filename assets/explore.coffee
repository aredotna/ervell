#
# minimal js for about page
#

Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
BlockCollectionView = require '../components/block_collection/client/block_collection_view.coffee'
ExploreBlocks = require "../collections/explore_blocks.coffee"

$ ->
  explore = new ExploreBlocks sd.CHANNELS
  blocks = explore.getBlocks()

  new BlockCollectionView
    el: $ ".grid"
    blocks: blocks