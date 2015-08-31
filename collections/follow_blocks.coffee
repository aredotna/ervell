#
# Collection for a group of blocks that are retrieved from an objects follows
#

SearchBlocks = require("./search_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class FollowBlocks extends SearchBlocks
  url: -> "#{sd.API_URL}/#{@options.object_type}/#{@options.object_id}/follow#{@options.suffix}?#{params.encode(@options)}"

  parse: (data) ->
    data = super
    _.filter data, (block) -> block.status isnt 'private'