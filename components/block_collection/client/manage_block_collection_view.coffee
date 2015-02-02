Backbone = require "backbone"
_ = require 'underscore'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
BlockView = require './block_view.coffee'
BlockCollectionView = require './block_collection_view.coffee'

module.exports = class ManageBlockCollectionView extends BlockCollectionView

  initialize: (options)->
    super
