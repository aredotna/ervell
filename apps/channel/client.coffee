Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../models/channel.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
CurrentUser = require '../../models/current_user.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'
blockCollectionTemplate = -> require('../../components/block_collection/templates/block_collection.jade') arguments...
blockTemplate = -> require('../../components/block_collection/templates/block.jade') arguments...

module.exports = class BlockSkeletonView extends Backbone.View

  initialize: ->
    @collection.on "add", @appendBlock, @
    @collection.on "merge:skeleton", @renderSkeleton, @

    @collection.loadSkeleton()

    super

  render: ->
    @$el.html blockCollectionTemplate(blocks: @collection.models)

  renderSkeleton: ->
    console.log 'will eventually render skeleton', @collection
    # nothing for now

  appendBlock: (model)->
    console.log 'adding block'
    @$el.append blockTemplate(block: model)

module.exports.init = ->
  current_user = new CurrentUser sd.CURRENT_USER
  channel = new Channel sd.CHANNEL
  blocks = new ChannelBlocks sd.BLOCKS,
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
