Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  initialize: (options)->
    @channel = options.channel
    @blocks = options.blocks

    @blocks.each (block) => @renderBlockView block
    super

  renderBlockView: (block)=>
    el = @$("##{block.id}")
    new BlockView
      container: $('.grid')
      model: block
      autoRender: false