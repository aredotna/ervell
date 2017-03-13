#
# Model for a comment
#
Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'
_s = require 'underscore.string'
config = require '../config.coffee'
xss = require 'xss'

module.exports = class Comment extends Base

  urlRoot: -> "#{sd.API_URL}/blocks/#{@blockId()}/comments"

  blockId: ->
    @block_id or @collection.block.id

  initialize: (attrs, { @block_id })->
    super

  sync: (method, model, options)->
    model.set('body', '[deleted]') if model.get('body') is ''
    super

  getHTML: ->
    text = @get('body')
    entities = @get('entities')
    return text unless entities and entities.length

    html = ""
    lastPosition = 0

    for entity in entities
      if entity.type == 'user'
        html = html + text.slice(lastPosition, entity.start) +
          "<a href=\"/#{entity.user_slug}\">@#{entity.user_name}</a>"
        lastPosition = entity.end

    html += text.slice(lastPosition)
    xss html

  getPermissions: (user)->
    return "" unless @has('user') and user?

    permissions = ['can-read']

    # Comment owner can edit
    if @belongsToCurrentUser(user)
      permissions.push 'can-edit'

    (_.uniq permissions).join ' '

  belongsToCurrentUser: (user)->
    @get('user').id is user.id

  allows: (permission, user) ->
    _s.include @getPermissions(user), permission
