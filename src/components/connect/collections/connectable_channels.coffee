ConnectionBlocks = require '../../../collections/connection_blocks.coffee'

module.exports = class ConnectableChannels extends ConnectionBlocks
  comparator: (model) ->
    if model.has '__timestamp__'
      -(model.get '__timestamp__')
    else
      super model
