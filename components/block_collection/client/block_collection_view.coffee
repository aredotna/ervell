Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'
LightboxRouter = require '../../lightbox/lightbox_router.coffee'
LightboxView = require '../../lightbox/client/lightbox_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View

  initialize: (options)->
    mediator.on 'open:lightbox', @openLightbox, @

    new LightboxRouter
    Backbone.history.start()

    @channel = options.channel
    @blocks = options.blocks

    @blocks.each (block) => @renderBlockView block
    super

  openLightbox: (id)->
    console.log 'openLightbox', id
    block = new Block id
    @lbv = new LightboxView
      el: $('#l-lightbox-container')
      model: block

  renderBlockView: (block)=>
    console.log 'rendering block view', @, block
    el = @$("##{block.id}")
    new BlockView
      container: $('.grid')
      model: block
      autoRender: false