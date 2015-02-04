Backbone = require "backbone"
_ = require 'underscore'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
ManageBlockView = require './manage_block_view.coffee'
BlockCollectionView = require './block_collection_view.coffee'

module.exports = class ManageBlockCollectionView extends BlockCollectionView
  
  events: 
    "click .manage__block__sort__link": "sortBlocks"

  initialize: (options)->
    super
    @blocks.on 'add', @appendBlockView, @

  sortBlocks: (e)->
    column = $(e.target).data('sort')

    _.extend @blocks.options,
      page: 1
      sort: column
      type: 'channel'

    @blocks.fetch
      success: =>
        @$('.manage__block__collection__contents').html('')
        debugger
        for model in @blocks.models
          @renderBlockView(model, true)

        debugger

  renderBlockView: (block, autoRender = false)->
    new ManageBlockView
      container: $('.manage__block__collection__contents')
      model: block
      autoRender: autoRender
      channel: @channel if @channel

