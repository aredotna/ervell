Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'
_s = require 'underscore.string'
markdown = require '../lib/markdown.coffee'
striptags = require 'striptags'

module.exports = class Comment extends Base
  urlRoot: -> "#{sd.API_URL}/blocks/#{@blockId()}/comments"

  blockId: ->
    @block_id or @collection.block.id

  initialize: (attrs, { @block_id })->
    super

  sync: (method, model, options)->
    model.set('body', '[deleted]') if model.get('body') is ''
    super

  getBodyWithEntities: ->
    text = @get('body')
    entities = @get('entities')
    return text unless entities and entities.length

    output = ''
    lastPosition = 0

    for entity in entities
      if entity.type == 'user'
        output = output + text.slice(lastPosition, entity.start) +
          "[@#{entity.user_name}](/#{entity.user_slug})"
        lastPosition = entity.end

    output += text.slice(lastPosition)
    output

  getHTML: ->
    markdown(@getBodyWithEntities())

  getStrippedHTML: ->
    # Highlight usernames
    output = @getHTML().replace('<a', '<strong').replace('</a', '</strong')
    # Strip out everything but basic inline text formatting
    striptags(output, ['strong', 'em'])

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
