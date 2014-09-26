#
# The client-side code for the channel header.
#
#

Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'

module.exports = class UserBlockCollectionView extends Backbone.View

  initialize: ->
    @model.on "sync", @render

  render: =>
    @$("header").html headerTemplate(channel: @model, username: sd.USERNAME)

module.exports.init = ->
  new BlockCollectionView
    el: 'body'