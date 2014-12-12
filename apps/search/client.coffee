#
# The client-side code for a search page
#

Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
SearchBlocks = require '../../collections/search_blocks.coffee'
InfiniteView = require '../../components/pagination/infinite_view.coffee'
UserBlockCollectionView = require '../../components/block_collection/client/user_block_collection_view.coffee'

module.exports.init = ->
  blocks = new SearchBlocks sd.BLOCKS, {q: sd.SEARCH}
  console.log 'search_blocks', blocks

  new UserBlockCollectionView
    el: $ ".grid"
    blocks: blocks

  new InfiniteView
    context: $ ".grid"
    collection: blocks
    itemSelector: $ ".grid"
