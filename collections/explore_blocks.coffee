#
# Collection for a group of Blocks for on the explore page
#

SearchBlocks = require("./search_blocks.coffee")
Channel = require '../models/channel.coffee'
sd = require("sharify").data
_ = require 'underscore'
params = require 'query-params'

module.exports = class ExploreBlocks extends SearchBlocks
  defaultOptions:
    page: 1
    per: 20

  model: Channel

  url: -> "#{sd.API_URL}/search/explore?#{params.encode(@options)}"

  parse: (data) ->
    @total_pages = data.total_pages

    contents = data.channels || data.results

    return contents

  getBlocks: ->
    blocks = _.flatten @map (channel) ->
      channel.get('contents')

    new SearchBlocks blocks