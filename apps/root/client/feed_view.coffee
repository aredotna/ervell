Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data

feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Backbone.View

  initialize: ->
    @collection.on "sync", @render
    @collection.fetch()

  render: =>
    @$el.html feedTemplate(feed: @collection.models)