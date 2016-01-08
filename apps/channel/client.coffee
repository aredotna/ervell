Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../lib/mediator.coffee'
Channel = require '../../models/channel.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
CurrentUser = require '../../models/current_user.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'
BlockSkeletonView = require './client/block_skeleton_view.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
ChannelFileDropView = require './client/channel_file_drop_view.coffee'
ChannelDragView = require './client/channel_drag_view.coffee'
Filter = require '../../components/filter/index.coffee'
Bp = require('../../lib/vendor/backpusher.js')
{ initChannelPath } = require './client/channel_path_view.coffee'

module.exports = class ChannelView extends Backbone.View

  initialize: ({ @channel, @blocks })->
    mediator.on 'collaborators:fetched', @checkUserAbilities, @
    mediator.shared.state.on 'change', @toggleDragClass, @
    @channel.on 'edit:title:success', @updateSlug, @

    @subscribe()

  toggleDragClass: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.addClass 'is-dragging'
    else
      @$el.removeClass 'is-dragging'

  subscribe: ->
    @pusher = mediator.shared.pusher.subscribe "channel-production-#{@channel.id}"
    @listener = new Bp.Backpusher @pusher, @blocks

  updateSlug: ->
    window.location.href = @channel.href()

  checkUserAbilities: (collaborators) ->
    collaborator = _.contains collaborators.pluck('id'), mediator.shared.current_user.id

    # addable
    if collaborator or mediator.shared.current_user.canAddToChannel(@channel)
      @setupNewBlockView()
      @setupFileDropView()

      @$('.grid').addClass 'is-addable'
      mediator.trigger 'channel:is-addable'

    # editable
    if collaborator or mediator.shared.current_user.canEditChannel(@channel)
      @$('.grid').addClass 'is-editable'
      mediator.trigger 'channel:is-editable'

      @setUpDragView() unless $('body').hasClass 'is-mobile'
      @delegateEvents()

    @maybeSetEmpty()

  maybeSetEmpty: ->
    unless @$('.grid').hasClass('is-addable') or @blocks.length > 0
      @$('.channel-container').addClass('is-empty')

  setupFileDropView:->
    $.ajax
      url: "#{sd.API_URL}/uploads/policy"
      success: (policy) =>
        new ChannelFileDropView
          el: @$el
          channel: @channel
          blocks: @blocks
          policy: policy

  setupNewBlockView: ->
    should_render = if mediator.shared.current_user.canAddToChannel(@channel) then false else true

    if should_render
      new NewBlockView
        el: $ ".grid__block--new-block"
        $container: $ '.grid'
        model: @channel
        blocks: @blocks
        autoRender: should_render

  setUpDragView: ->
    @dragView = new ChannelDragView
      el: @$('.grid')
      model: @channel

    @dragView.setupDragAndDrop()

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
    el: $ ".grid--channel"
    channel: channel
    blocks: blocks

  initChannelPath channel

  if current_user.isPremium()
    new Filter
      model: channel
      $searchBar: $('.form__field__channel-filter')
      $resultContainer: $('.channel-results-container')
      $channelContainer: $('.grid--channel')

  if not sd.FOLLOWERS

    new BlockSkeletonView
      collection: blocks
      channel: channel
      el: $('.grid--channel')

    if current_user.canAddToChannel channel
      new NewBlockView
        el: $ ".grid__block--new-block"
        model: channel
        blocks: blocks
