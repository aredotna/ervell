_ = require 'underscore'
Backbone = require 'backbone'
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
BlockView = require '../../../components/block_collection/client/block_view.coffee'
User = require '../../../models/user.coffee'
scrollFrame = require 'scroll-frame'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
initTips = require '../../../components/tips/index.coffee'

feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...
emptyTemplate = -> require('../templates/empty.jade') arguments...

module.exports = class FeedView extends Backbone.View
  retryCount: 0
  maxRetry: 3

  initialize: ->
    mediator.trigger 'load:start'

    @collection.fetch success: @initialFetch
    @collection.on "sync", @render, @

    @current_user = new User sd.CURRENT_USER

  initialFetch: =>
    @setSharedBlocks()

    mediator.trigger 'load:stop'

    if sd.FEED_TYPE is 'primary'
      # notifications api updates to be paginated :/
      @paginator = new InfiniteView
        context: @$el
        collection: @collection
        itemSelector: @$el
        nextPageCallback: (request) =>
          unless request.responseJSON.items.length
            @retryCount++
            if (@retryCount > @maxRetry) and (@collection.length < 1)
              @paginator.disable()
              @showEmpty()

  render: ->
    @$el.html feedTemplate(feed: @collection.models, user: @current_user)

    @setSharedBlocks()

    @$('.grid__block').each @initBlockView

    _.defer ->
      IconicJS().inject 'img.iconic'


  showEmpty: ->
    @$el.html emptyTemplate tips: sd.TIPS
    initTips()

  updateTitle: (diff) =>
    window.document.title = "Arena (#{diff})"

  setSharedBlocks: ->
    blocks = new Blocks []
    blocks.reset @collection.getAllItems()
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

