#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'

module.exports.init = ->
  channel = new Channel sd.CHANNEL

  new BlockCollectionView
    el: $ ".grid"
    channel: channel
