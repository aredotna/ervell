
#
# Collection for a group of managed blocks
#

sd = require("sharify").data
_ = require 'underscore'
UserBlocks = require("./user_blocks.coffee")
Block = require("../models/block.coffee")
params = require 'query-params'

module.exports = class ManageBlocks extends UserBlocks

  parse: (data) ->
    return data.channels
