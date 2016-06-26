#
# Collection for a group of Blocks (could be users and channels as well) fetched by a search
#

Blocks = require("./blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class SearchBlocks extends Blocks
  defaultOptions:
    page: 1
    per: 20

  model: Block

  url: ->
    if @options.subject
      return "#{sd.API_URL}/search/#{@options.subject}?#{params.encode(@options)}"
    else
      return "#{sd.API_URL}/search?#{params.encode(@options)}"

  parse: (data)->
    @total_pages = data.total_pages
    _.flatten _.values _.pick(data, ['contents', 'followers', 'users', 'channels', 'following', 'blocks', 'results'])

  loadNext: ->
    return false if @options.page > @total_pages

    ++@options.page
    @fetch remove: false, merge: true