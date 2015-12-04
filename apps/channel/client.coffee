Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../lib/mediator.coffee'
Channel = require '../../models/channel.coffee'
ChannelConnections = require '../../collections/channel_connections.coffee'
ChannelBlocks = require '../../collections/channel_blocks.coffee'
Collaborators = require '../../collections/collaborators.coffee'
CurrentUser = require '../../models/current_user.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'
BlockSkeletonView = require './client/block_skeleton_view.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'
ChannelCollaborationView = require './client/channel_collaboration_view.coffee'
ChannelConnectionsView = require './client/channel_connections_view.coffee'
ChannelFileDropView = require './client/channel_file_drop_view.coffee'
ChannelDragView = require './client/channel_drag_view.coffee'
ChannelVisibilityView = require '../../components/channel_visibility/client/channel_visibility_view.coffee'
ShareLinkView = require '../../components/share_link/client/share_link_view.coffee'
ChannelExportView = require '../../components/channel_export/client/channel_export_view.coffee'
EditableAttributeView = require '../../components/editable_attribute/client/editable_attribute_view.coffee'
ConnectView = require '../../components/connect/client/connect_view.coffee'
MetaEditableAttributeView = require '../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
Filter = require '../../components/filter/index.coffee'
Bp = require('../../lib/vendor/backpusher.js')

module.exports = class ChannelView extends Backbone.View

  events:
    'click .delete-channel' : 'showConfirmation'
    'click .delete-channel a' : 'showConfirmation'
    'click .delete-channel--confirmation__yes' : 'deleteChannel'
    'click .delete-channel--confirmation__no'  : 'hideConfirmation'
    'click .connect_button': 'loadConnectView'

  initialize: (options)->
    console.log 'initialize', @$('.delete-channel')
    @channel = options.channel
    @blocks = options.blocks

    mediator.on 'collaborators:fetched', @checkUserAbilities, @
    mediator.shared.state.on 'change', @toggleDragClass, @

    @channel.on 'edit:title:success', @updateSlug, @

    @subscribe()

  toggleDragClass: ->
    if mediator.shared.state.get('isDraggingBlocks')
      @$el.addClass 'is-dragging'
    else
      @$el.removeClass 'is-dragging'

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @channel

  subscribe: ->
    @pusher = mediator.shared.pusher.subscribe "channel-production-#{@channel.id}"
    @listener = new Bp.Backpusher @pusher, @blocks

  updateSlug: ->
    window.location.href = @channel.href()

  showConfirmation: ->
    console.log 'showConfirmation'
    @$('.delete-channel--confirmation').addClass 'is-active'

  hideConfirmation: ->
    @$('.delete-channel--confirmation').removeClass 'is-active'

  deleteChannel: ->
    @channel.destroy
      success: (model) ->
        window.location = "#{sd.APP_URL}"

  checkUserAbilities: (collaborators) ->
    collaborator = _.contains collaborators.pluck('id'), mediator.shared.current_user.id

    if collaborator or mediator.shared.current_user.canAddToChannel(@channel)
      @setupNewBlockView()
      @setupFileDropView()

      @$('.grid').addClass 'is-addable'
      mediator.trigger 'channel:is-addable'

    if collaborator or mediator.shared.current_user.canEditChannel(@channel)
      @$('.grid').addClass 'is-editable'
      @$('#metadata--actions').addClass 'is-editable'
      @$('#metadata__column-manage').addClass 'is-editable'
      @$('#metadata--collaborators').addClass 'is-editable'
      mediator.trigger 'channel:is-editable'

      @setupVisibilityView()
      @setupShareLinkView()
      @setupExportView()
      @setupEditTitleView()
      @setUpDragView() unless $('body').hasClass 'is-mobile'
      @delegateEvents()

    @setupEditDescriptionView()
    @maybeSetEmpty()

  maybeSetEmpty: ->
    unless @$('.grid').hasClass('is-addable') or @blocks.length > 0
      @$('.channel-container').addClass('is-empty')

  setupEditTitleView: ->
    new EditableAttributeView
      model: @channel
      el:@$("#attribute-title_#{@channel.id}")
      _attribute: 'title'
      _kind: 'plaintext'
      wait: true

  setupEditDescriptionView: ->
    new MetaEditableAttributeView
      model: @channel
      el:@$("#metadata--description .metadata__content")
      _attribute: 'description'
      _kind: 'markdown'
      wait: true

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

  setupVisibilityView: ->
    @channelVisibilityView = new ChannelVisibilityView
      el: @$ "#metadata--privacy .metadata__content"
      model: @channel
      autoSync: true

      @channel.on 'change:status', @updateTitle, @

  setupShareLinkView: ->
    @shareLinkView = new ShareLinkView
      el: @$ "#metadata--share .metadata__content"
      model: @channel

  setupExportView: ->
    @exportView = new ChannelExportView
      el: @$ "#metadata--export .metadata__content"
      model: @channel

  updateTitle: =>
    $('.path__channel').removeClass (index, css) ->
      klass = css.match (/(^|\s)privacy-\S+/g) || []
      return klass.join(' ')
    $('.path__channel').addClass "privacy-#{@channel.get('status')}"

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

  collaborators = new Collaborators
    channel_slug: channel.get('slug')

  new ChannelCollaborationView
    collection: collaborators
    el: $("#metadata--collaborators .metadata__content")
    isCollaboration: channel.has('collaboration')
    isEditable: mediator.shared.current_user.canEditChannel channel
    channel: channel

  connections = new ChannelConnections [], { slug: channel.get('slug') }

  new ChannelConnectionsView
    collection: connections
    el: $("#metadata--connections")

  connections.fetch()

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
