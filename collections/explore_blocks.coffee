#
# Collection for a group of Blocks for on the explore page
#

UserBlocks = require("./user_blocks.coffee")
sd = require("sharify").data
_ = require 'underscore'
qs = require 'qs'

module.exports = class ExploreBlocks extends UserBlocks
  defaultOptions:
    page: 1
    per: 20

  # see https://github.com/ljharb/qs#stringifying
  # our API needs query strings with no indices for user_ids
  url: ->
    params = qs.stringify(@options, { arrayFormat: 'brackets', encode: false })
    "#{sd.API_URL}/search/explore?#{params}"