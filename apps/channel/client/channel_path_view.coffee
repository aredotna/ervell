Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
ChannelConnections = require '../../../collections/channel_connections.coffee'
Collaborators = require '../../../collections/collaborators.coffee'
EditableAttributeView = require '../../../components/editable_attribute/client/editable_attribute_view.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
ConnectView = require '../../../components/connect/client/connect_view.coffee'
ChannelCollaborationView = require './channel_collaboration_view.coffee'
ChannelConnectionsView = require './channel_connections_view.coffee'
ChannelVisibilityView = require '../../../components/channel_visibility/client/channel_visibility_view.coffee'
ChannelExportView = require '../../../components/channel_export/client/channel_export_view.coffee'
ShareLinkView = require '../../../components/share_link/client/share_link_view.coffee'

module.exports.ChannelPathView = class ChannelPathView extends PathView

  # _.extend PathView.prototype.events,
  events:
    'click .toggle-settings-trigger' : 'toggleSettings'
    'click .delete-channel' : 'showConfirmation'
    'click .delete-channel a' : 'showConfirmation'
    'click .delete-channel--confirmation__yes' : 'deleteChannel'
    'click .delete-channel--confirmation__no'  : 'hideConfirmation'
    'click .connect_button': 'loadConnectView'

  initialize: ->
    super
    mediator.on 'channel:is-editable', @setupEditableViews, @
    @model.on 'change:follower_count', @updateFollowerCount, @

  setupSubViews: ->
    super

  updateFollowerCount: ->
    @$('.js-channel-follower-count').html "<a href='#{@model.href()}/followers'> #{@model.get('follower_count')} Followers</a>"

  toggleSettings: (e)->
    @$('.metadata--container').toggleClass 'settings-is-active'
    if !$('.metadata__column').hasClass 'is-expanded'
      @$('.metadata__column').toggleClass 'is-expanded'

  showConfirmation: ->
    @$('.delete-channel--confirmation').addClass 'is-active'

  hideConfirmation: ->
    @$('.delete-channel--confirmation').removeClass 'is-active'

  deleteChannel: ->
    @model.destroy
      success: -> window.location = "#{sd.APP_URL}"

  updateTitle: =>
    @$('.path__channel').removeClass (index, css) ->
      klass = css.match (/(^|\s)privacy-\S+/g) || []
      return klass.join(' ')
    @$('.path__channel').addClass "privacy-#{@model.get('status')}"

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.connect-container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model

  setupEditableViews: ->
    # title
    new EditableAttributeView
      el: @$("#attribute-title_#{@model.id}")
      model: @model
      _attribute: 'title'
      _kind: 'plaintext'
      wait: true

    # description
    new MetaEditableAttributeView
      el: @$("#metadata--info__description")
      model: @model
      _attribute: 'description'
      _kind: 'markdown'
      wait: true

    # privacy
    new ChannelVisibilityView
      el: @$("#metadata--privacy .metadata__content")
      model: @model
      autoSync: true

      @model.on 'change:status', @updateTitle, @

    # share link
    new ShareLinkView
      el: @$(".js-share-link")
      model: @model

    # export
    new ChannelExportView
      el: @$("#metadata--export .metadata__content")
      model: @channel

module.exports.initChannelPath = (channel) ->
  connections = new ChannelConnections [], { slug: channel.get('slug') }

  new ChannelConnectionsView
    collection: connections
    el: $("#metadata--connections")

  connections.fetch()

  collaborators = new Collaborators
    channel_slug: channel.get('slug')

  new ChannelCollaborationView
    collection: collaborators
    el: $("#metadata--info__collaborators")
    isCollaboration: channel.has('collaboration')
    isEditable: mediator.shared.current_user.canEditChannel channel
    channel: channel

  new ChannelPathView
    el: $('section.path--header')
    model: channel

