#
# Collection for a group of Blocks for on the explore page
#

UserBlocks = require("./user_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
params = require 'query-params'

module.exports = class ExploreBlocks extends UserBlocks
  defaultOptions:
    page: 1
    per: 20

  url: -> "#{sd.API_URL}/search/explore?#{params.encode(@options)}"