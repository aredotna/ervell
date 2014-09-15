Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../models/channel.coffee'
Blocks = require '../../collections/blocks.coffee'
CurrentUser = require '../../models/current_user.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'

module.exports = class ChannelView extends Backbone.View

  initialize: ->
    @model.on "sync", @render

  render: -> # nothin yet

module.exports.init = ->
  current_user = new CurrentUser sd.CURRENT_USER
  channel = new Channel sd.CHANNEL
  blocks = new Blocks sd.BLOCKS,
    channel_slug: sd.CHANNEL.slug

  new ChannelView
    el: $ "body"
    model: channel

  new BlockCollectionView
    el: 'body'

  if current_user.canEditChannel channel
    new NewBlockView
      el: $ ".grid__block--new-block"
      model: channel
      blocks: blocks
