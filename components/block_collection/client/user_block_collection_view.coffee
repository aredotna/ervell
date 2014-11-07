Backbone = require "backbone"
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

  appendBlockView: (model) ->
    @renderBlockView model, true