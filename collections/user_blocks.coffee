#
# Collection for a group of Blocks for a user
#

Base = require("./base.coffee")
sd = require("sharify").data
_ = require 'underscore'
Block = require("../models/block.coffee")

module.exports = class UserBlocks extends Base

  model: Block

  url: -> "#{sd.API_URL}/user/#{@slug}/search"

  parse: (data)->
    _.flatten _.values _.pick(data, ['contents', 'followers', 'users', 'channels', 'following', 'blocks'])

  initialize: (models, options) -> @slug = options.user_slug