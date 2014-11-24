#
# General collection for a group of Blocks
#

Base = require("./base.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class Blocks extends Base
  model: Block

  getAllWithClass: (klass) -> @filter (block) -> block.get('class') is klass

