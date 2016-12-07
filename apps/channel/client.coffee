Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../lib/mediator.coffee'
Block = require '../../models/block.coffee'
Channel = require '../../models/channel.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
CurrentUser = require '../../models/current_user.coffee'
setupBlockCollection = require '../../components/blocks/container/client/index.coffee'
ChannelFileDropView = require './client/channel_file_drop_view.coffee'
ChannelDragView = require './client/channel_drag_view.coffee'
Filter = require '../../components/filter/index.coffee'
Bp = require('../../lib/vendor/backpusher.js')
{ initChannelPath } = require './client/channel_path_view.coffee'

module.exports = class ChannelView extends Backbone.View

  initialize: ({ @channel, @blocks, @blockCollectionView })->
    mediator.on 'collaborators:fetched', @checkUserAbilities, @
    mediator.shared.state.on 'change:isDraggingBlocks', @toggleDragClass, @
    mediator.on 'upload:done', @makeBlock, @

    @channel.on 'edit:title:success', @updateSlug, @

    @pusherSubscribe()

  makeBlock: (src) ->
    block = new Block block_type: "Block", source: src
    @blocks.create block.toJSON(),
      url: "#{sd.API_URL}/channels/#{@channel.get('slug')}/blocks"
      wait: true

  toggleDragClass: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.addClass 'is-dragging'
    else
      @$el.removeClass 'is-dragging'

  pusherSubscribe: ->
    @pusher = mediator.shared.pusher?.subscribe "channel-production-#{@channel.id}"
    if @pusher
      @listener = new Bp.Backpusher @pusher, @blocks

  updateSlug: ->
    window.location.href = @channel.href()

  checkUserAbilities: (collaborators) ->
    collaborator = _.contains collaborators.pluck('id'), mediator.shared.current_user.id

    # addable
    if collaborator or mediator.shared.current_user.canAddToChannel(@channel)
      @setupFileDropView()

      @$('.block-collection').addClass 'is-addable'
      mediator.trigger 'channel:is-addable'

      @blockCollectionView.setupNewBlockView
        channel: @channel
        autoRender: true

    # editable
    if collaborator or mediator.shared.current_user.canEditChannel(@channel)
      @$('.block-collection').addClass 'is-editable'
      @$('.block-item').addClass 'can-manage'

      @channel.set is_managable: true

      mediator.trigger 'channel:is-editable'

      @setUpDragView() unless $('body').hasClass 'is-mobile'
      @delegateEvents()

    @maybeSetEmpty()

  maybeSetEmpty: ->
    unless @$('.block-collection').hasClass('is-addable') or @blocks.length > 0
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

  setUpDragView: ->
    @dragView = new ChannelDragView
      el: $('.block-collection__contents')
      model: @channel

    @dragView.setupDragAndDrop()

module.exports.init = ->
  current_user = mediator.shared.current_user
  channel = new Channel sd.CHANNEL
  blocks = new ChannelBlocks sd.BLOCKS,
    channel_slug: sd.CHANNEL.slug

  { view } = setupBlockCollection
    model: channel
    $el: $('.channel-contents')
    collection: blocks
    mode: 'skeleton'
    channel: channel

  new ChannelView
    el: $ "body"
    channel: channel
    blocks: blocks
    blockCollectionView: view

  initChannelPath channel

  if current_user.canAddToChannel channel
    view.setupNewBlockView channel: channel
