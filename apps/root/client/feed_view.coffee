Backbone = require 'backbone'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'
User = require '../../../models/user.coffee'
feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Backbone.View

  initialize: ->
    mediator.trigger 'load:start'

    @collection.on "sync", @render, @
    @collection.fetch
      success: =>
        @setSharedBlocks()
        mediator.trigger 'load:stop'

        if sd.FEED_TYPE is 'primary'
          # notifications api updates to be paginated :/
          @infinite_view = new InfiniteView
            context: @$el
            collection: @collection
            itemSelector: @$el


    @current_user = new User sd.CURRENT_USER

  render: ->
    @$el.html feedTemplate(feed: @collection.models, user: @current_user)

    @setSharedBlocks()

    @$('.grid__block').each @initBlockView

  setSharedBlocks: ->
    mediator.shared.blocks = new Blocks @collection.getAllItems()

  initBlockView: (index, el) =>
    $block = $(el)
    block = mediator.shared.blocks.findWhere { id: $block.data('id'), base_class: $block.data('class') }

    if block
      new BlockView
        container: $('.grid')
        model: block
        autoRender: false
        el: $block

