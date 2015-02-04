#
# The client-side code for the channel manager
#

Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
ManageBlocks = require '../../collections/manage_blocks.coffee'
ManageBlockCollectionView = require '../../components/block_collection/client/manage_block_collection_view.coffee'
InfiniteView = require '../../components/pagination/infinite_view.coffee'

module.exports.init = ->
  blocks = new ManageBlocks sd.BLOCKS,
    user_slug: sd.USER.slug
    'filter[type]': 'channel'

  view = new ManageBlockCollectionView
    blocks: blocks
    el: $ ".grid"

  new InfiniteView
    context: $ ".grid"
    collection: blocks
    itemSelector: $ ".grid"
