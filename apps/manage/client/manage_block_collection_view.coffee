Backbone = require "backbone"
_ = require 'underscore'
Backbone.$ = $
sd = require("sharify").data
mediator = require '../../../lib/mediator.coffee'
Block = require '../../../models/block.coffee'
BlockCollectionView = require '../../../components/block_collection/client/block_collection_view.coffee'
ManageBlockView = require './manage_block_view.coffee'

module.exports = class ManageBlockCollectionView extends BlockCollectionView
  events:
    "click .manage__block__sort__link" : "sortBlocks"
    "keyup input"                      : "searchBlocks"

  initialize: ({ @blocks })->
    super
    @blocks.on 'add', @appendBlockView, @

    @$('.manage__block').each @initBlockView

  initBlockView: (index, el) =>
    $block = $(el)
    block = @blocks.get $block.data('id')

    if block
      new ManageBlockView
        container: $('.manage__block__collection__contents')
        model: block
        autoRender: false
        el: $block

  toggleDirection: ->
    @direction = if @direction is 'desc' then 'asc' else 'desc'

  updateOptions: (options) ->
    _.extend @blocks.options, options

  getQuery: ->
    query = @$('input').val()?.trim()
    if query.length
      return query
    else
      false

  reset: ->
    @updateOptions q: undefined
    @fetchBlocks()

  searchBlocks: (e) ->
    return @reset() unless query = @getQuery()
    return if (query.length < 2) or (query is @lastQuery)

    @updateOptions q: query, page: 1
    @fetchBlocks()

  sortBlocks: (e)->
    column = $(e.target).data('sort')
    direction = $(e.target).data('direction')
    direction = if direction is 'desc' then 'asc' else 'desc'

    @updateOptions
      page: 1
      sort: column
      subject: 'channel'
      direction: direction

    @$('.manage__block__sort__link').removeClass 'is-active'
    $(e.target).removeClass "is-asc is-desc"
    $(e.target).addClass "is-active is-#{direction}"
    $(e.target).data 'direction', direction
    @fetchBlocks()

  fetchBlocks: ->
    @xhr?.abort()
    @xhr = @blocks.fetch
      success: =>
        @$('.manage__block__collection__contents').html('')
        for model in @blocks.models
          @renderBlockView(model, true)

  appendBlockView: (model) ->
    @renderBlockView model, true

  renderBlockView: (block, autoRender = false)->
    new ManageBlockView
      container: $('.manage__block__collection__contents')
      model: block
      autoRender: autoRender
