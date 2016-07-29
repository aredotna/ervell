
#
# /explore
#

sd = require("sharify").data
_ = require 'underscore'
ExploreBlocks = require '../collections/explore_blocks.coffee'
UserBlockCollectionView = require '../components/block_collection/client/user_block_collection_view.coffee'
setupBlockCollection = require '../components/blocks/container/client/index.coffee'

$ ->
  blocks = new ExploreBlocks sd.BLOCKS

  _.extend blocks.options,
    subject: sd.SUBJECT
    sort: sd.SORT || ''
    seed: sd.SEED || ''

  setupBlockCollection
    $el: $('.explore-contents')
    collection: blocks