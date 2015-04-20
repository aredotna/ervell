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
      draggable: '.grid__block'
      filter: '.grid__block--new-block'
      scroll: true
      onStart: @freezeNewBlock
      onMove: @onMove
      onEnd: @onEnd
      scrollSensitivity: 100
      onUpdate: @updateOrder

  freezeNewBlock: =>
    @frozen = this.el.querySelector '.grid__block--new-block'
    mediator.shared.state.set 'isDraggingBlocks', yes

  onMove: (e) =>
    clearTimeout @pid

    @pid = setTimeout ->
      list = e.to
      if list.firstElementChild is @frozen
        list.insertBefore @frozen, list.children[2]
    , 0

    return false if e.related.nextElementSibling is @frozen
    return @frozen isnt e.related

  onEnd: =>
    mediator.shared.state.set 'isDraggingBlocks', no

  updateOrder: (e) =>
    item = e.item

    blocks = @$(".grid__block:not(.grid__block--new-block)")
    if @viewOrder is 'desc'
      index = (blocks.length - blocks.index(this)) + 1
    else
      index = blocks.index($(item)) + 1

    $.ajax
      url: "#{sd.API_URL}/channels/#{@model.id}/sort"
      type: 'PUT'
      dataType: 'json'
      data:
        ids: [
          index: index
          id: $(item).data('id')
        ]