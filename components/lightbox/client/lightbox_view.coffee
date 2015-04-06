Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
md = require 'marked'
mediator = require '../../../lib/mediator.coffee'
Feed = require '../../../collections/feed.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
SmallFeedView = require '../../feed/client/small_feed_view.coffee'
ConnectView = require '../../connect/client/connect_view.coffee'
NewCommentView = require '../../new_comment/client/new_comment_view.coffee'
analytics = require '../../../lib/analytics.coffee'
EditableAttributeView = require '../../editable_attribute/client/editable_attribute_view.coffee'

lightboxTemplate = -> require('../templates/lightbox.jade') arguments...

module.exports = class LightboxView extends Backbone.View

  events:
    'tap .lightbox--close'            : 'close'
    'tap .directional-arrows'         : 'clickSlide'
    'tap .lightbox__connect__trigger' : 'loadConnectView'
    'tap .lightbox__content__source'  : 'openSource'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

  initialize: ->
    $('body').addClass 'is-lightbox is-loading'
    @$el.addClass 'is-active is-loading'

    mediator.trigger 'load:start'

    @initialXHR = @model.fetch
      success: =>
        @render()

    @$el.html lightboxTemplate(block: @model)

    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'
    mediator.on "lightbox:close",      => @close()

  openSource: (e)->
    analytics.track.click "Block source opened"

    url = @model.getSourceUrl()

    if @model.get('visibility') is 'private'
      a = e.target
      a = a.parentNode if a and a.tagName isnt 'A'
      a.rel = 'noreferrer' if a and a.tagName is 'A'
    else
      e.preventDefault()
      e.stopImmediatePropagation()

      window.open url,'_blank'
      return false

  render: ->
    analytics.track.impression "Lightbox"

    $('body').removeClass 'is-loading'
    @$el.removeClass 'is-loading'
    @$el.html lightboxTemplate block: @model, md: md
    @postRender()

  postRender: ->
    @setupFeed()
    @setUpNewComment()
    @setupEditableAttributes()

    IconicJS().inject 'img.iconic'

    @postRendered = true

  setupFeed: ->
    # TODO - make sure to dispose these things when lightbox slides
    @feed = new Feed null,
      type: 'block'
      object_id: @model.id

    @feed.comparator = (group) ->
      new Date group.models[0].get('created_at')

    @feedView = new SmallFeedView
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
        wait: true

  loadConnectView: (e)=>
    e.preventDefault()
    e.stopPropagation()

    $connect_container = @$('.lightbox__connect__container')
    $connect_container.addClass 'is-active'

    new ConnectView
      el: $connect_container
      block: @model

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  slide: (direction)->
    @model = mediator.shared.blocks[direction](@model)

    mediator.trigger 'slide:to:block', @model

    @render() # to get rid of the current block
    @cancelRequests()
    @initialXHR = @model.fetch success: => @render()

  cancelRequests: ->
    @initialXHR.abort() if @initialXHR.readyState > 0 && @initialXHR.readyState < 4
    @feedView.cancelRequest()

  close: ->
    @$el.html ""
    @cancelRequests()
    $('body').removeClass 'is-lightbox is-loading'
    @$el.removeClass 'is-active'
    mediator.off "lightbox:slide:next"
    mediator.off "lightbox:slide:prev"
    mediator.off "lightbox:close"
    @undelegateEvents()

    mediator.trigger 'lightbox:closed'