#
# Model for a single user
#

Base = require "./base.coffee"
analytics = require '../lib/analytics.coffee'
sd = require("sharify").data

module.exports = class User extends Base

  url: -> "#{sd.API_URL}/users/#{@id}"

  startPrivateChannel: ->
    $.ajax
      type: "POST"
      url: "#{@url()}/message"
      success: (response) =>
        analytics.track.click "Collaborative private channel made"
        location.href = "/#{response.user.slug}/#{response.slug}"