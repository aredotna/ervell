AddBlockView = require './client/view.coffee'

module.exports = ($el, blocks) ->
  throw new Error 'requires Blocks collection' unless blocks

  view = new AddBlockView
    el: $el
    collection: blocks

  view.postRender()
  view
