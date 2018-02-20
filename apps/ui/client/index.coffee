AddBlockView = require '../../../components/add_block/client/view.coffee'
Collection = require '../../../collections/base.coffee'
{ default: mountHello } = require '../../../react/components/Example/index.js'

module.exports = ->
  blocks  = new Collection
  blocks.url = '/statuses/200'

  $('.js-add-block').each ->
    view = new AddBlockView
      el: $(this)
      collection: blocks

    view.render()

  mountHello()
