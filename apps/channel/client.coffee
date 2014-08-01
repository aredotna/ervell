#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
headerTemplate = -> require("./templates/header.jade") arguments...

module.exports.ChannelView = class ChannelView extends Backbone.View

  initialize: ->
    console.log 'initialize', @
    @model.on "sync", @render

  render: =>
    console.log @model, "RENDERSSSSS"
    @$("#header").html headerTemplate(channel: @model)

module.exports.init = ->
    console.log 'init'

    new ChannelView
        el: $ "body"
        model: new Channel sd.CHANNEL