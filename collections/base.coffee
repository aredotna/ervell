#
# General collection for a group of Blocks
#

Chaplin = require("chaplin")
sd = require("sharify").data
Model = require("../models/base.coffee")

module.exports = class Blocks extends Chaplin.Collection

  model:Model