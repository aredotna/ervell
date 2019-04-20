_ = require 'underscore'
_s = require 'underscore.string'
Model = require './base.coffee'
Customer = require './customer.coffee'
Policy = require './policy.coffee'
analytics = require '../lib/analytics.coffee'
{ API_URL, APP_URL } = require('sharify').data

module.exports = class User extends Model
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

  homePath: ->
    if parseInt(@get('following_count'), 10) <= 1
      '/explore'
    else
      @get('home_path') or '/'

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

  related: ->
    return @__related__ if @__related__?

    @__related__ =
      customer: new Customer
      policy: new Policy

  initials: ->
    @get('initials') or
    _.first(@get('username').split(' ').map((name) => name[0]), 4).join('')
