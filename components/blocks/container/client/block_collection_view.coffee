{ defer } = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
InfiniteView = require '../../../pagination/infinite_view.coffee'
SkeletonView = require '../../../pagination/skeleton_view.coffee'
GridBlockView = require '../../grid_item/client/block_view.coffee'
ListBlockView = require '../../list_item/client/block_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View
  postRendered: false
  template:
    grid: -> require('../templates/_grid_contents.jade') arguments...
    list: -> require('../templates/_list_contents.jade') arguments...
  views:
    grid: GridBlockView
    list: ListBlockView
  modes:
    infinite: ({ $el, collection })->
      new InfiniteView
        el: $el
        collection: collection
        context: $el
    skeleton: ({ $el, collection })->
      new SkeletonView
        el: $el
        collection: collection

  initialize: ({ @mode, @state, @resultsCollection }) ->
    # @listenTo @state, 'change:view_mode', @render
    @listenTo @collection, 'merge:skeleton', @render
    @listenTo @resultsCollection, 'sync reset', @render

    if @mode is 'infinite'
      @listenTo @collection, 'add', @appendBlockView, @

    @postRender()

  appendBlockView: (model) ->
    @renderBlockView model, true

  render: ->
    models = if @resultsCollection.length then @resultsCollection.models else @collection.models

    @$el.html @template[@state.get('view_mode')]
      blocks: models
      view_mode: @state.get('view_mode')
      user: mediator.shared.current_user

    defer (=> @postRender())

  postRender: =>
    # setup block item views
    @$('.block-item').each @initBlockView

    unless @postRendered
      console.log 'setting up pagination mode', @mode
      @modes[@mode]
        $el: @$el
        collection: @collection

    @postRendered = true

  initBlockView: (index, el) =>
    $block = $(el)

    collection = if @resultsCollection.length then @resultsCollection else @collection

    block = collection.get $block.data('id')

    if block
      new @views[@state.get('view_mode')]
        container: @$('.block-collection__contents')
        model: block
        channel: @channel if @channel
        autoRender: false
        el: $block

  renderBlockView: (block, autoRender = false)=>
    new @views[@state.get('view_mode')]
      container: @$el
      model: block
      autoRender: autoRender
      containerMethod: 'append'
      channel: @channel if @channel