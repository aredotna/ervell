{ union, invoke } = require 'underscore'
Backbone = require 'backbone'
BlockView = require '../block_v2/view.coffee'


module.exports = class ChannelBlockView extends Backbone.View

  initialize: ({ @channel }) ->
    @subviews = []

  initBlockViews: ->
    for block in union @channel.kind.blocks, [@channel]
      view = new BlockView
        el: @$(".Block[data-id=#{block.id}]")
        block: block
      
      view.renderFollowButton() if block.kind.__typename is 'Channel'

      @subviews.push view

  remove: ->
    invoke @subviews, 'remove'
    super


    