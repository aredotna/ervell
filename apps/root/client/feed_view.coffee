_ = require 'underscore'
Backbone = require 'backbone'
Poller = require 'backbone-poller'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'
User = require '../../../models/user.coffee'


feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Backbone.View
  count: 0

  initialize: ->
    mediator.trigger 'load:start'

    @collection.fetch success: @initialFetch
    @collection.on "sync", @render, @

    @current_user = new User sd.CURRENT_USER

  initialFetch: =>
    @setSharedBlocks()
    # @startPolling()

    mediator.trigger 'load:stop'

    _.defer => @count = mediator.shared.blocks.length

    if sd.FEED_TYPE is 'primary'
      # notifications api updates to be paginated :/
      @infinite_view = new InfiniteView
        context: @$el
        collection: @collection
        itemSelector: @$el

  startPolling: ->
    poller = Poller.get(@collection,
      delay: [3000]
      delayed: 10000
    ).start()

  render: ->
    @$el.html feedTemplate(feed: @collection.models, user: @current_user)

    @setSharedBlocks()

    @$('.grid__block').each @initBlockView

  updateTitle: (diff) =>
    window.document.title = "Arena (#{diff})"

  setSharedBlocks: ->
    blocks = new Blocks @collection.getAllItems()
    # if mediator.shared.blocks?
      # @updateTitle(diff) if (diff = blocks.length - mediator.shared.blocks.length)
    mediator.shared.blocks = blocks

  initBlockView: (index, el) =>
    $block = $(el)
    block = mediator.shared.blocks.findWhere { id: $block.data('id'), base_class: $block.data('class') }

    if block
      new BlockView
        container: $('.grid')
        model: block
        autoRender: false
        el: $block

