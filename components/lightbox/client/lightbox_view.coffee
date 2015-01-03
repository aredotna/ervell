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
    'click .lightbox--close'    : 'close'
    'click .directional-arrows' : 'clickSlide'

  initialize: ->
    $('body').addClass 'is-lightbox'
    @$el.addClass 'is-active'

    mediator.trigger 'load:start'

    @model.on "sync", @render, @
    @model.fetch()

    @$el.html lightboxTemplate(block: @model)

    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'
    mediator.on "lightbox:close",      => @close()

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

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  slide: (direction)->
    @model = mediator.shared.blocks[direction](@model)
    @render() # to get rid of the current block
    @model.fetch success: => @render()

  close: ->
    @$el.html ""
    $('body').removeClass 'is-lightbox'
    @$el.removeClass 'is-active'
    mediator.off "lightbox:slide:next"
    mediator.off "lightbox:slide:prev"
    mediator.off "lightbox:close"
    @undelegateEvents()

    mediator.trigger 'lightbox:closed'