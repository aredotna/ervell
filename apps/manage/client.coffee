#
# The client-side code for the channel manager
#

Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Channel = require "../../models/channel.coffee"
UserBlocks = require '../../collections/user_blocks.coffee'
InfiniteView = require '../../components/pagination/infinite_view.coffee'

module.exports.init = ->
  blocks = new UserBlocks sd.BLOCKS,
    user_slug: sd.USER.slug