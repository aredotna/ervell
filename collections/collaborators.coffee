#
# Collection for a channel's collaborators
#

Base = require("./base.coffee")
sd = require("sharify").data
User = require("../models/user.coffee")

module.exports = class Collaborators extends Base

  model: User

  url: -> "#{sd.API_URL}/channels/#{@channel_slug}/collaborators"

  parse: (data) -> data.users

  initialize: (options) ->
    @channel_slug = options.channel_slug
    super