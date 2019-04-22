Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  initialize: ({ @channel, @blocks })->
    mediator.shared.blocks = @blocks if @blocks
    IconicJS().inject 'img.iconic'
    @$('.grid__block').each @initBlockView

  initBlockView: (index, el) =>
    $block = $(el)
    block = @blocks.get $block.data('id')

    if block
      new BlockView
        container: @$el
        model: block
        channel: @channel
        autoRender: false
        el: $block

  renderBlockView: (block, autoRender = false)=>
    new BlockView
      container: @$el
      model: block
      autoRender: autoRender
      containerMethod: 'append'
      channel: @channel if @channel
