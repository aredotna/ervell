{ defer, each } = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
InfiniteView = require '../../../pagination/infinite_view.coffee'
SkeletonView = require '../../../pagination/skeleton_view.coffee'
GridBlockView = require '../../grid_item/client/block_view.coffee'
ListBlockView = require '../../list_item/client/block_view.coffee'
GridNewBlockView = require '../../grid_item/client/new_block_view.coffee'
ListNewBlockView = require '../../list_item/client/new_block_view.coffee'

module.exports = class BlockCollectionView extends Backbone.View
  postRendered: false
  template:
    grid: -> require('../templates/_grid_contents.jade') arguments...
    list: -> require('../templates/_list_contents.jade') arguments...
  views:
    grid: GridBlockView
    list: ListBlockView
  newBlockViews:
    grid: GridNewBlockView
    list: ListNewBlockView
  newBlockContainer:
    grid: '.block-collection__contents'
    list: '.block-collection--list__new-block'
  containerMethods:
    grid:
      default: 'append'
      wait: 'after'
    list:
      default: 'append'
      wait: 'prepend'
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

  initialize: ({ @mode, @state, @resultsCollection, @channel }) ->
    @listenTo @collection, 'merge:skeleton', @render
    @listenTo @collection, 'add', @appendBlockView, @
    @listenTo @resultsCollection, 'sync reset', @render

    mediator.shared.state.on 'change:hovered_channel', @onChannelHover, @

    @postRender()

  appendBlockView: (model) ->
    @renderBlockView model, true

  isSearching: ->
    mediator.shared.state.get 'is_searching'

  onChannelHover: ->
    channelId = mediator.shared.state.get 'hovered_channel'
    if channelId
      visibleBlockIds = $('.block-item').withinviewport().map(-> $(this).data('id')).get()
      blockPool = @collection.filter (block) -> 
        visibleBlockIds.indexOf(parseInt(block.id)) > -1
      console.log('blockPool', blockPool)
      each blockPool, (block) ->
        unless block.get('channel_ids').indexOf(parseInt(channelId)) > -1 or block.id is channelId
          block.set deselected: true
    else
      blockPool = @collection.where deselected: true
      each blockPool, (block) -> block.unset 'deselected'

  blocks: ->
    if @isSearching()
      @resultsCollection
    else
      @collection

  render: ->
    @$el.html @template[@state.get('view_mode')]
      blocks: @blocks().models
      view_mode: @state.get('view_mode')
      user: mediator.shared.current_user
      channel: @channel

    defer (=> @postRender())

  postRender: =>
    # setup block item views
    @$('.block-item').each @initBlockView

    unless @postRendered
      @modes[@mode]
        $el: @$el
        collection: @collection

    @postRendered = true

    if @isSearching()
      @modes['infinite']
        $el: @$el
        collection: @resultsCollection

  initBlockView: (index, el) =>
    $block = $(el)
    block = @blocks().get $block.data('id')

    if block
      new @views[@state.get('view_mode')]
        container: @$('.block-collection__contents')
        model: block
        channel: @channel if @channel
        parentView: @
        autoRender: false
        el: $block

  setupNewBlockView: ({ channel, autoRender =  false }) ->
    return false if @newBlockView?
    @newBlockView = new @newBlockViews[@state.get('view_mode')]
      el: $('.block-item--new')
      blocks: @collection
      autoRender: autoRender
      model: channel
      $container: $(@newBlockContainer[@state.get('view_mode')])

  renderBlockView: (block, autoRender = false) =>
    containerMethodType = if block?.options?.wait is true then 'wait' else 'default'
    new @views[@state.get('view_mode')]
      container: $('.block-collection__contents')
      model: block
      autoRender: autoRender
      containerMethod: @containerMethods[@state.get('view_mode')][containerMethodType]
      channel: @channel if @channel
      parentView: @