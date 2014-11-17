Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../lib/mediator.coffee'
Channel = require '../../models/channel.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
Collaborators = require '../../collections/collaborators.coffee'
CurrentUser = require '../../models/current_user.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'
BlockSkeletonView = require './client/block_skeleton_view.coffee'
ChannelCollaborationView = require './client/channel_collaboration_view.coffee'

module.exports.init = ->
  current_user = mediator.shared.current_user
  channel = new Channel sd.CHANNEL
  blocks = new ChannelBlocks sd.BLOCKS,
    channel_slug: sd.CHANNEL.slug

  new BlockCollectionView
    el: $ ".grid"
    channel: channel
    blocks: blocks

  if channel.has('collaboration')
    collaborators = new Collaborators
      channel_slug: channel.get('slug')

    new ChannelCollaborationView
      collection: collaborators
      el: $ "#metadata--collaborators"

  if not sd.FOLLOWERS

    new BlockSkeletonView
      collection: blocks
      channel: channel
      el: $ ".grid"

    if current_user.canEditChannel channel
      new NewBlockView
        el: $ ".grid__block--new-block"
        model: channel
        blocks: blocks
