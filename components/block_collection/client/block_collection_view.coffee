Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  initialize: (options)->
    @channel = options.channel
    @blocks = options.blocks

    mediator.shared.blocks = @blocks

    @blocks.each (block) => @renderBlockView block
    IconicJS().inject 'img.iconic'
    super

  renderBlockView: (block, autoRender = false)=>
    new BlockView
      container: $('.grid')
      model: block
      autoRender: autoRender
      channel: @channel if @channel