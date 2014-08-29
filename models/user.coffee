#
# Model for a single user
#

Base = require "./base.coffee"
sd = require("sharify").data

module.exports = class User extends Base

  url: -> "#{sd.API_URL}/users/#{@id}"
