Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../models/channel.coffee'
Blocks = require '../../collections/blocks.coffee'
CurrentUser = require '../../models/current_user.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'
blockCollectionTemplate = -> require('../../components/block_collection/templates/block_collection.jade') arguments...

module.exports = class BlockSkeletonView extends Backbone.View

  initialize: ->
    @collection.on "sync", @render, @

    # @collection.fetchUntilEnd()

    console.log '@$el', @$el

    super

  render: ->
    @$el.html blockCollectionTemplate(blocks: @collection.models)

module.exports.init = ->
  current_user = new CurrentUser sd.CURRENT_USER
  channel = new Channel sd.CHANNEL
  blocks = new Blocks sd.BLOCKS,
    channel_slug: sd.CHANNEL.slug

  new BlockCollectionView
    el: 'body'

  new BlockSkeletonView
    collection: blocks
    el: $ ".grid"

  if current_user.canEditChannel channel
    new NewBlockView
      el: $ ".grid__block--new-block"
      model: channel
      blocks: blocks
