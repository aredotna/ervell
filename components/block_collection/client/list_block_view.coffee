Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
BlockView = require './block_view.coffee'

blockTemplate = -> require('../templates/block_list.jade') arguments...

module.exports = class ListBlockView extends BlockView

  render: ->
    if @containerMethod isnt 'before' and @containerMethod isnt 'after'
      @container[@containerMethod] blockTemplate(block: @model, user: @current_user)
    else
      @container.find('.grid__block--new-block')[@containerMethod] blockTemplate(block: @model, user: @current_user)