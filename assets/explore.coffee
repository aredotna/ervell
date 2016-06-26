
#
# /explore
#

sd = require("sharify").data
ExploreBlocks = require '../collections/explore_blocks.coffee'
UserBlockCollectionView = require '../components/block_collection/client/user_block_collection_view.coffee'
setupBlockCollection = require '../components/blocks/container/client/index.coffee'

$ ->
  blocks = new ExploreBlocks sd.BLOCKS

  setupBlockCollection
    $el: $('.explore-contents')
    collection: blocks