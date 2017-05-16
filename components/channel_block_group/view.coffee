Backbone = require 'backbone'
analytics = require '../../lib/analytics.coffee'
BlockView = require '../block_v2/view.coffee'

module.exports = class ChannelBlockView extends Backbone.View

  events: 
    'click .js-channel' : 'goToChannel'

  initialize: ({ @channel }) ->
    # nothing yet

  goToChannel: (e) ->
    # analytics.track.click "Channel opened from profile"

    # url = @channel.kind.href

    # e.preventDefault()
    # e.stopImmediatePropagation()
    # analytics.trackOutboundLink url

    # window.open url

    # false

  initBlockViews: ->
    for block in @channel.kind.blocks
      new BlockView
        el: @$(".Block[data-id=#{block.id}]")
        block: block