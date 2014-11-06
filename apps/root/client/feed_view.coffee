Chaplin = require 'chaplin'
Chaplin.$ = $
sd = require("sharify").data
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
User = require '../../../models/user.coffee'
feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Chaplin.View

  initialize: ->
    $('body').addClass 'is-loading'
    @collection.on "sync", @render, @
    @collection.fetch
      success: -> $('body').removeClass 'is-loading'

    @current_user = new User sd.CURRENT_USER

    # @infinite_view = new InfiniteView
    #   context: @$el
    #   collection: @collection
    #   itemSelector: @$el

  render: ->
    @$el.html feedTemplate(feed: @collection.models, user: @current_user)

    blocks = new Blocks @collection.getAllItems()

    new BlockCollectionView
      el: $ ".grid"
      blocks: blocks
