Backbone = require "backbone"
$ = require 'jquery'
Backbone.$ = $
sd = require("sharify").data

feedTemplate = -> require('../templates/feed.jade') arguments...

module.exports.FeedView = class FeedView extends Backbone.View

  initialize: ->
    @collection.on "sync", @render
    @collection.fetch()

  render: =>
    @$el.html feedTemplate(feed: @collection)