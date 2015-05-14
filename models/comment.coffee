#
# Model for a comment
#

Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'

module.exports = class Comment extends Base

  urlRoot: -> "#{sd.API_URL}/blocks/#{@block_id}/comments"

  initialize: (attrs, {@block_id})->
    super

  sync: (method, model, options)->
    model.set('body', '[deleted]') if model.get('body') is ''
    super

  getPermissions: (user)->
    return "" unless @has('user') and user?

    permissions = ['can-read']

    # Comment owner can edit
    if @belongsToCurrentUser(user)
      permissions.push 'can-edit'

    (_.uniq permissions)

  belongsToCurrentUser: (user)->
    @get('user').id is user.id

  allows: (permission, user) ->
    _.include @getPermissions(user), permission
