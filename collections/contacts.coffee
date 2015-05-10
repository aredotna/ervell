#
# General collection for a group of Blocks
#

Backbone = require 'backbone'
Base = require("./base.coffee")
sd = require("sharify").data
Block = require("../models/block.coffee")

module.exports = class Contacts extends Base
  model: Backbone.Model

  initialize: (models, { @service }) ->
    super
    @url = "#{config.api.versionRoot}/accounts/authentications/friends?service=#{@service}"

  parse: (response) -> response.users