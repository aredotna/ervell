Chaplin = require 'chaplin'
$ = require 'jquery'
Chaplin.$ = $
sd = require("sharify").data
InfiniteView = require '../../../components/pagination/infinite_view.coffee'

feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Chaplin.View

  initialize: ->
    @collection.on "sync", @render
    @collection.fetch()

    @infinite_view = new InfiniteView
      context: @$el
      collection: @collection
      itemSelector: @$el

  render: =>
    console.log('sync')
    @$el.html feedTemplate(feed: @collection.models)