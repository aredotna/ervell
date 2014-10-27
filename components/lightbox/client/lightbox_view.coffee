Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Feed = require '../../../collections/feed.coffee'
SmallFeedView = require '../../feed/client/small_feed_view.coffee'

lightboxTemplate = -> require('../templates/lightbox.jade') arguments...

module.exports = class LightboxView extends Backbone.View

  events:
    'click .lightbox--close': 'close'

  initialize: ->
    $('body').addClass 'is-lightbox'
    @$el.addClass 'is-active'

    @model.on "sync", @render, @
    @model.fetch()

  render: ->
    @$el.html lightboxTemplate(block: @model)

    feed = new Feed null,
      type: 'block'
      object_id: @model.id

    new SmallFeedView
      el: @$ "#lightbox__feed"
      collection: feed

  close: ->
    @$el.html ""
    $('body').removeClass 'is-lightbox'
    @$el.removeClass 'is-active'

    mediator.trigger 'lightbox:closed'