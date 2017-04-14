_ = require 'underscore'
_s = require 'underscore.string'
Base = require './base.coffee'
analytics = require '../lib/analytics.coffee'
{ API_URL, APP_URL } = require('sharify').data

module.exports = class User extends Base
  url: ->
    "#{API_URL}/users/#{@slugOrId()}"

  urlRoot: ->
    "#{API_URL}/users/#{@slugOrId()}"

  href: ->
    "#{APP_URL}/#{@get('slug')}"

  slugOrId: ->
    @get('slug') or @id

  isPremium: ->
    @get('is_premium')

  startPrivateChannel: ->
    $.ajax
      type: 'POST'
      url: "#{@url()}/message"
      success: (response) =>
        analytics.track.click 'Collaborative private channel made'
        location.href = "/#{response.user.slug}/#{response.slug}"

  getPermissions: (user) ->
    return '' unless user?

    permissions = ['can-read']

    if user.id is @id
      permissions.push 'can-edit'

    _.uniq(permissions).join ' '

  allows: (permission, user) ->
    _s.include @getPermissions(user), permission
