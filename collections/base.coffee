#
# General collection for a group of Blocks
#

Collection = require("chaplin").Collection
sd = require("sharify").data
Model = require("../models/base.coffee")

module.exports = class Blocks extends Collection

  model:Model