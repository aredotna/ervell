{ defer } = require 'underscore'
Backbone = require 'backbone'
InfiniteView = require '../../../pagination/infinite_view.coffee'
GridBlockView = require '../../grid_item/client/block_view.coffee'
ListBlockView = require '../../list_item/client/block_view.coffee'
template = -> require('../templates/index.jade') arguments...

module.exports = class BlockCollectionView extends Backbone.View
  views:
    grid: GridBlockView
    list: ListBlockView
  modes:
    infinite: ({ $el, collection })->
      new InfiniteView
        el: $el
        collection: collection
        context: $el
    skeleton: ->
      # no op

  initialize: ({ @mode, @state }) ->
    @listenTo @state, 'change:view_mode', @render

    if @mode is 'infinite'
      @listenTo @collection, 'add', @appendBlockView, @
      @postRender()

  appendBlockView: (model) ->
    @renderBlockView model, true

  render: ->
    @$el.html template
      blocks: @collection.models
      view_mode: @state.get('view_mode')

    defer => @postRender()

  postRender: =>
    # setup pagination mode
    @modes[@mode]
      $el: @$('.block-collection')
      collection: @collection

    # setup block item views
    @$('.block-item').each @initBlockView

  initBlockView: (index, el) =>
    $block = $(el)
    block = @collection.get $block.data('id')

    if block
      new @views[@state.get('view_mode')]
        container: @$('.block-collection')
        model: block
        channel: @channel if @channel
        autoRender: false
        el: $block

  renderBlockView: (block, autoRender = false)=>
    new @views[@state.get('view_mode')]
      container: @$('.block-collection')
      model: block
      autoRender: autoRender
      containerMethod: 'append'
      channel: @channel if @channel