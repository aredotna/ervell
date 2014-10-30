Chaplin = require 'chaplin'
Chaplin.$ = $
sd = require("sharify").data
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'

feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Chaplin.View

  initialize: ->
    @collection.on "sync", @render, @
    @collection.fetch()

    # @infinite_view = new InfiniteView
    #   context: @$el
    #   collection: @collection
    #   itemSelector: @$el

  render: ->
    @$el.html feedTemplate(feed: @collection.models)

    blocks = new Blocks @collection.getAllItems()

    new BlockCollectionView
      el: $ ".grid"
      blocks: blocks