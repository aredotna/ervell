Chaplin = require 'chaplin'
Chaplin.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
InfiniteView = require '../../../components/pagination/infinite_view.coffee'
Blocks = require '../../../collections/blocks.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
User = require '../../../models/user.coffee'
feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Chaplin.View

  initialize: ->
    mediator.trigger 'load:start'

    @collection.on "sync", @render, @
    @collection.fetch success: =>  mediator.trigger 'load:stop'

    @current_user = new User sd.CURRENT_USER

    @infinite_view = new InfiniteView
      context: @$el
      collection: @collection
      itemSelector: @$el

  render: ->
    @$el.html feedTemplate(feed: @collection.models, user: @current_user)

    blocks = new Blocks @collection.getAllItems()

    new BlockCollectionView
      el: $ ".grid"
      blocks: blocks
