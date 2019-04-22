#
# Collection for a group of Blocks for a channel or user filter
#

SearchBlocks = require("./search_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class FilterBlocks extends SearchBlocks
  defaultOptions:
    page: 1
    per: 20

  url: ->
    "#{sd.API_URL}/#{@type}/#{@slug}/search?#{params.encode(@options)}"

  initialize: (models, { @type, @slug }) ->
    super