Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Feed = require '../../../collections/feed.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
SmallFeedView = require '../../feed/client/small_feed_view.coffee'

lightboxTemplate = -> require('../templates/lightbox.jade') arguments...

module.exports = class LightboxView extends Backbone.View

  events:
    'click .lightbox--close': 'close'

  initialize: ->
    $('body').addClass 'is-lightbox'
    @$el.addClass 'is-active'

    mediator.trigger 'load:start'

    @model.on "sync", @render, @
    @model.fetch()

  render: ->
    mediator.trigger 'load:stop'

    @$el.html lightboxTemplate(block: @model)

    feed = new Feed null,
      type: 'block'
      object_id: @model.id

    new SmallFeedView
      el: @$ "#lightbox__feed_inner"
      collection: feed

    IconicJS().inject 'img.iconic'

  close: ->
    @$el.html ""
    $('body').removeClass 'is-lightbox'
    @$el.removeClass 'is-active'

    mediator.trigger 'lightbox:closed'