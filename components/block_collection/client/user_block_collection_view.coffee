Backbone = require "backbone"
_ = require 'underscore'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'
BlockCollectionView = require './block_collection_view.coffee'

module.exports = class UserBlockCollectionView extends BlockCollectionView

  initialize: (options)->
    super

    @blocks.on 'add', @appendBlockView, @

    mediator.on 'blocks:filtered', @filterBlocks, @

  filterBlocks: (options) ->
    if options.value is 'all'
      models = @blocks.models
      hidden_models = []
      @filterOptions = undefined
    else
      @filterOptions = options
      opts = {}
      opts[options.key] = options.value
      models = @blocks.where opts
      hidden_models = @blocks.filter (block) ->
        block.get(options.key) isnt options.value

    _.each models, (model) -> model.trigger 'show'

    _.each hidden_models, (model) -> model.trigger 'hide'

  appendBlockView: (model) ->
    @renderBlockView model, true

    if @filterOptions and model.get(@filterOptions.key) isnt @filterOptions.value
      model.trigger 'hide'