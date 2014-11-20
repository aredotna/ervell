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
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
ChannelCollaborationView = require './client/channel_collaboration_view.coffee'

module.exports = class ChannelView extends Backbone.View
  events:
    'dragenter'                     : 'handleDrag'
    'dragleave .channel--drop-zone' : 'clearDrag'

  initialize: (options)->
    @channel = options.channel
    @blocks = options.blocks

    mediator.on 'collaborators:fetched', @checkUserAbilities, @

  handleDrag: (e)->
    $('.channel--drop-zone').addClass('is-droppable')

  clearDrag: (e) ->
    $('.channel--drop-zone').removeClass('is-droppable')

  checkUserAbilities: (collaborators) ->
    if (_.contains collaborators.pluck('id'), mediator.shared.current_user.id) or mediator.shared.current_user.canAddToChannel(@channel)
      should_render = if mediator.shared.current_user.canAddToChannel(@channel) then false else true
      new NewBlockView
        el: $ ".grid__block--new-block"
        container: $ '.grid'
        model: @channel
        blocks: @blocks
        autoRender: should_render


module.exports.init = ->
  current_user = mediator.shared.current_user
  channel = new Channel sd.CHANNEL
  blocks = new ChannelBlocks sd.BLOCKS,
    channel_slug: sd.CHANNEL.slug

  new ChannelView
    el: $ "body"
    channel: channel
    blocks: blocks

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
