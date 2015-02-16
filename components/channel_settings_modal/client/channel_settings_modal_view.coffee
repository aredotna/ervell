_ = require 'underscore'
Backbone = require 'backbone'
ModalView = require '../../modal/view.coffee'
Channel = require '../../../models/channel.coffee'
mediator = require '../../../lib/mediator.coffee'
ConnectView = require '../../connect/client/connect_view.coffee'
ChannelVisibilityView = require '../../channel_visibility/client/channel_visibility_view.coffee'

template =-> require('../templates/channel_settings.jade') arguments...

module.exports = class ChannelSettingsModalView extends ModalView
  className: 'channel-settings'

  template: template

  events: -> _.extend super,
    'click .auth-toggle': 'showError'

  initialize: ->
    @templateData = { block: @model }
    @listenTo @model, 'change:status', @toggleVisibility
    super

  postRender: ->
    new ChannelVisibilityView
      el: @$('.channel-settings__inner__privacy')
      model: @model

    # new ConnectView
    #   el: @$('.channel-settings__inner__lower__connection .grid__block__connect-container')
    #   block: @model

  toggleVisibility: (model)->
    @$(".grid__block__inner").
      attr('class', 'grid__block__inner').
      addClass "grid__block__inner--privacy-#{@model.get('status')}"

  updatePosition: =>
    _.delay =>
      @$dialog.css
        top: ((@$el.height() - @$dialog.height()) / 2) + 'px'
        left: ((@$el.width() - @$dialog.width()) / 2) + 'px'
