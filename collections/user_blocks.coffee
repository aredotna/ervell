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
    @slug = options.user_slug

  parse: (data) ->
    @total_pages = data.total_pages
    contents = data.blocks || data.results

    @exhausted = true if @total_pages is 0

    if contents.length
      channel_ids = _.pluck data.channels, 'id'

      grouped_blocks = _.groupBy contents, (block) ->
        ids = _.intersection channel_ids, block.channel_ids
        return (if ids? then ids[0] else 'undefined')

      for id in channel_ids
        if grouped_blocks[id]
          channel = _.findWhere data.channels, id: id
          grouped_blocks[id].unshift channel if channel

      collection = _.flatten _.values grouped_blocks

      collection = collection.concat(grouped_blocks['undefined']) if grouped_blocks['undefined']

      return collection
    else
      super