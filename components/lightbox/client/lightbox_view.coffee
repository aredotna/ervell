Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
md = require 'marked'
mediator = require '../../../lib/mediator.coffee'
Feed = require '../../../collections/feed.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
SmallFeedView = require '../../feed/client/small_feed_view.coffee'
NewCommentView = require '../../new_comment/client/new_comment_view.coffee'
EditableAttributeView = require '../../editable_attribute/client/editable_attribute_view.coffee'

lightboxTemplate = -> require('../templates/lightbox.jade') arguments...

module.exports = class LightboxView extends Backbone.View

  events:
    'tap .lightbox--close'    : 'close'
    'tap .directional-arrows' : 'clickSlide'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

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

    @$el.html lightboxTemplate block: @model, md: md

    @postRender()

  postRender: ->
    @setupFeed()
    @setUpNewComment()
    @setupEditableAttributes()

    IconicJS().inject 'img.iconic'

  setupFeed: ->
    # TODO - make sure to dispose these things when lightbox slides
    @feed = new Feed null,
      type: 'block'
      object_id: @model.id

    @feed.comparator = (group) ->
      new Date group.models[0].get('created_at')

    new SmallFeedView
      el: @$ "#lightbox__feed_inner"
      collection: @feed

  setUpNewComment: ->
    new NewCommentView
      el: @$ "#lightbox__new-comment"
      collection: @feed
      block_id: @model.id
      autoRender: true

  setupEditableAttributes: ->
    for attribute, kind of @editableAttributes
      new EditableAttributeView
        model: @model
        el:@$("#attribute-#{attribute}_#{@model.id}")
        _attribute: attribute
        _kind: kind


  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  slide: (direction)->
    @model = mediator.shared.blocks[direction](@model)

    mediator.trigger 'slide:to:block', @model

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