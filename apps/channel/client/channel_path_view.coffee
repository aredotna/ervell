Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
PathView = require '../../../components/path/client/path_view.coffee'
ChannelConnections = require '../../../collections/channel_connections.coffee'
Collaborators = require '../../../collections/collaborators.coffee'
EditableAttributeView = require '../../../components/editable_attribute/client/editable_attribute_view.coffee'
MetaEditableAttributeView = require '../../../components/editable_attribute/client/meta_editable_attribute_view.coffee'
InlineConnectIntegrationView = require '../../../components/connect/integration/inline/view.coffee'
ChannelCollaborationView = require './channel_collaboration_view.coffee'
ChannelEditCollaboratorsView = require '../components/collaborators/edit_collaborators_view.coffee'
ChannelConnectionsView = require './channel_connections_view.coffee'
ChannelVisibilityView = require '../../../components/channel_visibility/client/channel_visibility_view.coffee'
ChannelExportView = require '../../../components/channel_export/client/channel_export_view.coffee'

module.exports.ChannelPathView = class ChannelPathView extends PathView
  subViews: []

  events:
    'click .toggle-settings-trigger' : 'toggleSettings'
    'click .delete-channel' : 'showConfirmation'
    'click .delete-channel a' : 'showConfirmation'
    'click .delete-channel--confirmation__yes' : 'deleteChannel'
    'click .delete-channel--confirmation__no'  : 'hideConfirmation'
    'click .js-connect': 'loadConnectView'

  initialize: ->
    super
    mediator.on 'channel:is-editable', @setupEditableViews, @
    @model.on 'change:follower_count', @updateFollowerCount, @

  setupSubViews: ->
    super

    # description
    new MetaEditableAttributeView
      el: @$("#metadata--info__description")
      model: @model
      _attribute: 'description'
      _kind: 'markdown'
      wait: true

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

  loadConnectView: (e) ->
    e.preventDefault()

    $target = $(e.currentTarget)

    view = new InlineConnectIntegrationView model: @model
    view.once 'remove', -> $target.show()

    $target
      .hide()
      .after view.render().$el

    @subViews.push view

  setupEditableViews: ->
    @$('#metadata--actions').addClass 'is-editable'
    @$('#metadata__column-manage').addClass 'is-editable'
    @$('#metadata--collaborators').addClass 'is-editable'

    # title
    new EditableAttributeView
      el: @$("#attribute-title_#{@model.id}")
      model: @model
      _attribute: 'title'
      _kind: 'plaintext'
      wait: true

    # privacy
    new ChannelVisibilityView
      el: @$("#metadata--privacy .metadata__content")
      model: @model
      autoSync: true

      @model.on 'change:status', @updateTitle, @

    # export
    new ChannelExportView
      el: @$("#metadata--export .metadata__content")
      model: @model

module.exports.initChannelPath = (channel) ->
  connections = new ChannelConnections [], { slug: channel.get('slug') }

  new ChannelConnectionsView
    collection: connections
    channel: channel
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

  new ChannelEditCollaboratorsView
    collection: collaborators
    el: $("#metadata--edit-collaborators .metadata__content")
    isCollaboration: channel.has('collaboration')
    isEditable: mediator.shared.current_user.canEditChannel channel
    channel: channel

  new ChannelPathView
    el: $('section.path--header')
    model: channel

