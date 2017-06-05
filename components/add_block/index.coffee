AddBlockView = require './client/view.coffee'
Collection = require '../../collections/base.coffee'

module.exports = ($el, blocks = null) ->
  unless blocks
    blocks = new Collection
    blocks.url = '/statuses/200'

  view = new AddBlockView
    el: $el
    collection: blocks

  view.postRender()
  view
