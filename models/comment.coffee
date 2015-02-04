#
# Model for a comment
#

Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class Comment extends Base

  urlRoot: -> "#{sd.API_URL}/comments"
