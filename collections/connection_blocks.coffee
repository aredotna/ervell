#
# Collection for a group of results in a connection search
#

UserBlocks = require("./user_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class ConnectionBlocks extends UserBlocks
  defaultOptions:
    page: 1
    per: 20

  url: -> "#{sd.API_URL}/search/connection?#{params.encode(@options)}"

  initialize: (models, options) ->
    super
    @slug = options.user_slug

  comparator: (model) ->
    return 1 if model.get('marked')
    return model.get('score')