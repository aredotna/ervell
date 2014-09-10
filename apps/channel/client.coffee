Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../models/channel.coffee'
CurrentUser = require '../../models/current_user.coffee'
NewBlockView = require '../../components/new_block/client/new_block_view.coffee'

module.exports = class ChannelView extends Backbone.View

  initialize: ->
    @model.on "sync", @render

  render: -> # nothin yet

module.exports.init = ->
  current_user = new CurrentUser sd.CURRENT_USER
  channel = new Channel sd.CHANNEL

  new ChannelView
    el: $ "body"
    model: channel

  if current_user.canEditChannel channel
    new NewBlockView
      el: $ ".grid__block--new-block"
      model: channel