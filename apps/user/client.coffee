#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
UserBlocks = require '../../collections/user_blocks.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'

module.exports.init = ->
  blocks = new UserBlocks sd.BLOCKS,
    user_slug: sd.USER.slug

  new BlockCollectionView
    el: $ ".grid"
    blocks: blocks
