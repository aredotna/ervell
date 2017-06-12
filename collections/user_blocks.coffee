#
# Collection for a group of Blocks for a user
#

SearchBlocks = require("./search_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class UserBlocks extends SearchBlocks
  defaultOptions:
    page: 1
    per: 20

  url: ->
    "#{sd.API_URL}/user/#{@slug}/search?#{params.encode(@options)}"

  initialize: (models, options) ->
    super
    @slug = options?.user_slug

  parse: (data) ->
    @total_pages = data.total_pages
    contents = data.blocks || data.results

    @exhausted = true if @total_pages is 0

    if contents.length
      channel_ids = _.map data.channels, (channel) -> parseInt(channel.id)

      # Group blocks next to channels
      grouped_blocks = _.groupBy contents, (block) ->
        ids = _.intersection channel_ids, block.channel_ids
        return (if ids.length then ids[0] else 'orphans')
      
      # Move channels to the front of the group
      for id in channel_ids
        if grouped_blocks[id]
          channel = _.find data.channels, (channel) -> parseInt(channel.id) is id
          grouped_blocks[id].unshift channel if channel

      # Re-sort groups by last updated
      grouped_blocks = _.sortBy grouped_blocks, (group) -> - new Date(_.first(group).updated_at).getTime()

      # Flatten and return array
      collection = _.flatten _.values grouped_blocks
      collection = collection.concat(data.channels)
      collection = collection.concat(grouped_blocks['orphans']) if grouped_blocks['orphans']

      return _.reject collection, (item) -> item.class is 'Block' and item.channel_ids.length < 1
    else
      super
