#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require '../../models/channel.coffee'
NewBlockView = require '../../components/new_block_view'

module.exports.ChannelView = class ChannelView extends Backbone.View

  initialize: ->
    @model.on "sync", @render


module.exports.init = ->
  console.log 'USERNAME', sd.USERNAME
  new ChannelView
    el: $ "body"
    model: new Channel sd.CHANNEL
    username: sd.USERNAME