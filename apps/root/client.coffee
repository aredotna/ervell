# // TODO: make into a block view

Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Feed = require "../../collections/feed.coffee"
FeedView = require './client/feed_view.coffee'
BlockCollectionView = require '../../components/block_collection/client/block_collection_view.coffee'

module.exports.init = ->
  if sd.CURRENT_USER
    new FeedView
      el: $ ".feed-container"
      collection: new Feed type: 'primary', user: sd.CURRENT_USER

    new BlockCollectionView
      el: 'body'
