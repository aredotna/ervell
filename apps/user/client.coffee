#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"

module.exports.ChannelView = class ChannelView extends Backbone.View

  initialize: ->
    @model.on "sync", @render

  render: =>
    @$("header").html headerTemplate(channel: @model, username: sd.USERNAME)

module.exports.init = ->
  console.log 'USERNAME', sd.USERNAME
  new ChannelView
    el: $ "body"
    model: new Channel sd.CHANNEL
    username: sd.USERNAME