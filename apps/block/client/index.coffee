{ BLOCK } = require('sharify').data
Block = require '../../../models/block.coffee'
BlockView = require './view.coffee'

module.exports.init = ->
  block = new Block BLOCK

  view = new BlockView
    el: $('.js-block')
    model: block

  view.postRender()
  view
