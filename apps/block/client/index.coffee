sd = require('sharify').data
Backbone = require 'backbone'
markdown = require 'marked'
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
IconicJS = require '../../../components/iconic/client/iconic.min.js'
initComments = require '../../../components/comments/index.coffee'
EditableAttributeView = require '../../../components/editable_attribute/client/editable_attribute_view.coffee'

template =-> require('../templates/_block.jade') arguments...

module.exports.FullBlockView = class FullBlockView extends Backbone.View

  events:
    'click .block-arrow' : 'clickSlide'
    'click .tab--container__nav__item' : 'toggleTab'

  editableAttributes:
    'title'       : 'plaintext'
    'description' : 'markdown'
    'content'     : 'markdown'

  initialize: ->
    mediator.on "lightbox:slide:next", => @slide 'next'
    mediator.on "lightbox:slide:prev", => @slide 'prev'

    @initModel()

  initModel: ->
    @model.on 'sync', @render, @

  toggleTab: (e)->
    e.preventDefault()

    $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
    tab = $(e.currentTarget).data 'tab'
    $(e.currentTarget).addClass 'is-active'
    $("#tab-#{tab}").addClass 'is-active'

  clickSlide: (e) ->
    e.preventDefault()
    direction = $(e.currentTarget).data('direction')
    @slide direction

  slide: (direction)->
    @model = mediator.shared.blocks[direction](@model)

    mediator.trigger 'slide:to:block', @model.id

    @initModel()
    @render()
    @xHR?.abort() if @xHR?.readyState > 0 && @xHR?.readyState < 4
    @xHR = @model.fetch()

  render: ->
    @$el.html template block: @model, md: markdown, comments: @comments

    @postRender()

    this

  postRender: ->
    initComments @model, @$('#tab-comments .tab-content__inner')
    IconicJS().inject('img.iconic')

    for attribute, kind of @editableAttributes
      new EditableAttributeView
        model: @model
        el:@$("#attribute-#{attribute}_#{@model.id}")
        _attribute: attribute
        _kind: kind
        wait: true

module.exports.init = ->
  block = new Block sd.BLOCK

  new FullBlockView
    model: block
    el: $(".container")
  .postRender()
