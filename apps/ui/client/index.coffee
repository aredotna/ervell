AddBlock = require '../../../components/add_block/index.coffee'
Collection = require '../../../collections/base.coffee'

module.exports = ->
  blocks  = new Collection
  blocks.url = '/statuses/200'

  $('.js-add-block').each -> AddBlock $(this), blocks
