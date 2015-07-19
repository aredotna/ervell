#
# Model for a single user
#

Base = require "./base.coffee"
analytics = require '../lib/analytics.coffee'
sd = require("sharify").data
_ = require 'underscore'
_s = require 'underscore.string'

module.exports = class User extends Base

  url: -> "#{sd.API_URL}/users/#{@slugOrId()}"

  urlRoot: -> "#{sd.API_URL}/users/#{@slugOrId()}"

  href: -> "#{sd.APP_URL}/#{@get('slug')}"

  slugOrId: ->
    @get('slug') || @id

  isPremium: ->
    @get('is_pro') is true or @get('is_pro') is 'true'

  startPrivateChannel: ->
    $.ajax
      type: "POST"
      url: "#{@url()}/message"
      success: (response) =>
        analytics.track.click "Collaborative private channel made"
        location.href = "/#{response.user.slug}/#{response.slug}"

  getPermissions: (user)->
    return "" unless user?

    permissions = ['can-read']

    # user is user
    if user.id is @id
      permissions.push 'can-edit'

    (_.uniq permissions).join ' '

  allows: (permission, user) ->
    _s.include @getPermissions(user), permission