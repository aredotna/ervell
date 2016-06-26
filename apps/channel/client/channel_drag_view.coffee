Backbone = require "backbone"
_ = require 'underscore'
sd = require("sharify").data
Sortable = require 'sortablejs'
mediator = require '../../../lib/mediator.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class ChannelFileDropView extends Backbone.View
  frozen: []
  viewOrder: 'desc'

  setupDragAndDrop: ->
    @sortable = new Sortable @el,
      draggable: '.block-item'
      onStart: @onStart
      onMove: @onMove
      onEnd: @onEnd
      onUpdate: @updateOrder
      animation: 0

  onStart: (e) =>
    e.stopPropagation()
    index = if e.oldIndex - 10 > 0 then e.oldIndex - 10 else 0
    $item = $('.block-item').eq(index)
    # _.defer => mediator.trigger 'slide:to:block', $item.data('id'), 0
    @frozen = this.el.querySelector '.grid__block--new-block'
    mediator.shared.state.set 'isDraggingBlocks', yes

  onMove: (e) =>
    e.stopPropagation()
    clearTimeout @pid

    @pid = setTimeout ->
      list = e.to
      if list.firstElementChild is @frozen
        list.insertBefore @frozen, list.children[2]
    , 0

    return false if e.related.nextElementSibling is @frozen
    return @frozen isnt e.related

  onEnd: (e)=>
    mediator.shared.state.set 'isDraggingBlocks', no
    e.stopPropagation()

  updateOrder: (e) =>
    item = e.item

    blocks = @$(".block-item:not(.grid__block--new-block)")
    if @viewOrder is 'desc'
      index = (blocks.length - blocks.index(item))
    else
      index = blocks.index($(item)) + 1

    _.defer =>
      mediator.trigger 'slide:to:block', $(item).data('id'), 0

    $.ajax
      url: "#{sd.API_URL}/channels/#{@model.id}/sort"
      type: 'PUT'
      dataType: 'json'
      data:
        ids: [
          index: index
          id: $(item).data('id')
        ]