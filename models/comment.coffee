#
# Model for a comment
#
DOMPurify = require 'dompurify'
Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'
config = require '../config.coffee'

module.exports = class Comment extends Base

  urlRoot: -> "#{sd.API_URL}/blocks/#{@block_id}/comments"

  initialize: (attrs, {@block_id})->
    super

  sync: (method, model, options)->
    model.set('body', '[deleted]') if model.get('body') is ''
    super

  getHtml: ->
    text = @get('body')
    entities = @get('entities')
    return text unless entities and entities.length

    html = ""
    lastPosition = 0

    for entity in entities
      if entity.type == 'user'
        html = html + text.slice(lastPosition, entity.start) +
          "<a href=\"#{config.APP_URL}/#{entity.user_slug}\">@#{entity.user_name}</a>"
        lastPosition = entity.end

    html += text.slice(lastPosition)
    # DOMPurify.sanitize(html, {KEEP_CONTENT: false})
    html

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
