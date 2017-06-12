Backbone = require 'backbone'
{ contains } = require 'underscore'
{ API_URL, FOLLOWERS, FOLLOWING } = require('sharify').data
Bp = require '../../../lib/vendor/backpusher.js'
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
ChannelFileDropView = require './channel_file_drop_view.coffee'
ChannelDragView = require './channel_drag_view.coffee'
MuteView  = require '../components/mute/client.coffee'

module.exports = class ChannelView extends Backbone.View
  initialize: ({ @channel, @blocks, @blockCollectionView, @resultsCollection }) ->

    mediator.on 'collaborators:fetched', @checkUserAbilities, @
    mediator.shared.state.on 'change:isDraggingBlocks', @toggleDragClass, @
    mediator.on 'upload:done', @makeBlock, @
    @channel.on 'edit:title:success', @updateSlug, @

    @pusherSubscribe()

  makeBlock: (src) ->
    block = new Block block_type: "Block", source: src
    @blocks.create block.toJSON(),
      url: "#{API_URL}/channels/#{@channel.get 'slug'}/blocks"
      wait: true

  toggleDragClass: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.addClass 'is-dragging'
    else
      @$el.removeClass 'is-dragging'

  pusherSubscribe: ->
    if @pusher = mediator.shared.pusher?.subscribe "channel-production-#{@channel.id}"
      @listener = new Bp.Backpusher @pusher, @blocks

  updateSlug: ->
    window.location.href = @channel.href()

  checkUserAbilities: (collaborators) ->
    collaborator = _.contains collaborators.pluck('id'), mediator.shared.current_user.id

    # Addable
    if collaborator or mediator.shared.current_user.canAddToChannel(@channel) and not (FOLLOWERS? or FOLLOWING?)
      @setupFileDropView()

      @$('.block-collection').addClass 'is-addable'
      mediator.trigger 'channel:is-addable'

    # Editable
    if collaborator or mediator.shared.current_user.canEditChannel(@channel)
      @$('.block-collection').addClass 'is-editable'
      @$('.block-item').addClass 'can-manage'

      @channel.set is_managable: true

      mediator.trigger 'channel:is-editable'

      @setUpDragView() unless $('body').hasClass 'is-mobile'
      @delegateEvents()

    # if user is logged in but can't edit channel
    if mediator.shared.current_user.id and mediator.shared.current_user.isPremium() and !collaborator
      @$('.metadata__column--manage').removeClass 'is-hidden'

      new MuteView
        el: $('.metadata__column--manage')
        model: @channel

      @channel.checkIfMuted()

    @maybeSetEmpty()

  maybeSetEmpty: ->
    unless @$('.block-collection').hasClass('is-addable') or @blocks.length > 0
      @$('.channel-container').addClass('is-empty')

  setupFileDropView:->
    $.ajax
      url: "#{API_URL}/uploads/policy"
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
