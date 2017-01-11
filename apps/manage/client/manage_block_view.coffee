Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Collaborators = require '../../../collections/collaborators.coffee'
ChannelCollaborationView = require '../../channel/client/channel_collaboration_view.coffee'
ChannelVisibilityView = require '../../../components/channel_visibility/client/channel_visibility_view.coffee'
ChannelExportView = require '../../../components/channel_export/client/channel_export_view.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'

blockTemplate = -> require('../templates/block_manage.jade') arguments...

module.exports = class ManageBlockView extends BlockView

  initialize: ->
    @model.on 'change:status', @updateTitle

    super

    @postRender()

  updateTitle: (model, status) =>
    @$('.manage__block__title a').removeClass()
    @$('.manage__block__title a').addClass "privacy--#{status}"

  render: ->
    @container.append blockTemplate(block: @model, user: @current_user)
    @$el = $("##{@model.id}")
    @postRender()

  postRender: ->
    @channelVisibilityView = new ChannelVisibilityView
      el: @$(".manage__block__status")
      model: @model
      autoSync: true
      showDescription: false

    @channelExportView = new ChannelExportView
      el: @$(".manage__block__export")
      model: @model
      autoSync: true