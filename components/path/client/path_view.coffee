_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Backbone.$ = $
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
User = require '../../../models/user.coffee'
FollowButtonView = require '../../follow_button/client/follow_button_view.coffee'
PrivateChannelView = require '../../private_channel/client/private_channel_view.coffee'

module.exports = class PathView extends Backbone.View

  events:
    'click .toggle-settings-trigger' : 'toggleSettings'

  initialize: (options) ->
    if (sd.USER or sd.CHANNEL) and sd.CURRENT_USER

      model = if sd.USER then sd.USER else sd.CHANNEL
      @model = new Block model

      new FollowButtonView
        el: @$('.follow_button')
        model: @model
        showTitle: no

      unless sd.CHANNEL
        new PrivateChannelView
          el: @$('.message_button')
          model: new User sd.USER
          showTitle: no


  toggleSettings: (e)->
    @$('.metadata--container').toggleClass 'settings-is-active'
    if !$('.metadata__column').hasClass 'is-expanded'
      @$('.metadata__column').toggleClass 'is-expanded'
