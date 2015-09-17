
#
# /explore
#

Backbone = require "backbone"
Backbone.$ = $
_ = require 'underscore'
sd = require("sharify").data
ExploreBlocks = require '../collections/explore_blocks.coffee'
InfiniteView = require '../components/pagination/infinite_view.coffee'
UserBlockCollectionView = require '../components/block_collection/client/user_block_collection_view.coffee'

$ ->
  blocks = new ExploreBlocks sd.BLOCKS

  new UserBlockCollectionView
    el: $ ".grid--explore"
    blocks: blocks

  new InfiniteView
    context: $ ".grid--explore"
    collection: blocks
    itemSelector: $ ".grid--explore"