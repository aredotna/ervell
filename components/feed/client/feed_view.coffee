Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data

feedTemplate = -> require('../../../components/feed/templates/feed.jade') arguments...

module.exports = class FeedView extends Backbone.View

  initialize: ->
    @collection.on "sync", @render
    @initialXHR = @collection.fetch()

  render: =>
    @$el.html feedTemplate(feed: @collection.models)

  cancelRequest: =>
    @initialXHR.abort() if @initialXHR.readyState > 0 && @initialXHR.readyState < 4
