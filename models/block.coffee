#
# Model for a single block
#

Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'
_s = require 'underscore.string'
moment = require 'moment'
parseDomain = require 'parse-domain'

module.exports = class Block extends Base

  url: -> "#{sd.API_URL}/blocks/#{@id}"

  sync: (method, model, options) ->
    if options?.channel?.id
      switch method
        when 'delete' then options.url = "#{sd.API_URL}/channels/#{options.channel.id}/blocks/#{model.id}"

    super

  title: ->
    if @has('username')
      @get('username')
    else
      @get('title')

  sourceTitle: ->
    if @get('source')?.title?
      "Source: #{@get('source')?.title}"
    else
      "Source"

  parse: (data) ->
    if data?.kind is 'profile'
      data.user
    else
      data

  contentOrDescription: ->
    @get('content') || @get('description')

  addConnection: (connection) ->
    connections = @get('connections')
    connections.unshift connection
    @set 'connections', connections

  connections: ->
    _.map @get('connections'), (connection) -> new Block connection

  getSourceUrl: ->
    @get('source')?.url || @get('attachment')?.url || @getImageSize('original')

  resizeImage: (width = 330, height = 330, source = 'display')->
    @getImageSize source

  getImageSize: (size) ->
    if @has('image') and @get('image').content_type isnt 'image/svg+xml'
      @get('image')?[size]?.url

  getVisibility: ->
    if @get('class') is 'Channel'
      @get('status')
    else
      @get('visibility')

  getClass: ->
    @get('class')?.toLowerCase()

  getPermissions: (user, channel)->
    return "" unless @has('user') and user?

    permissions = ['can-read']

    # Block owner can edit
    if @belongsToCurrentUser(user)
      permissions.push 'can-edit'

    # Block owner or connector can manage if block is in channel
    if (@connectedByCurrentUser(user) or @belongsToCurrentUser(user)) && channel?
      permissions.push 'can-manage'

    (_.uniq permissions).join ' '

  belongsToCurrentUser: (user)->
    @get('user').id is user.id

  connectedAtAgo: ->
    moment(@get('connected_at')).fromNow()

  allows: (permission, user) ->
    _s.include @getPermissions(user), permission

  connectedByCurrentUser: (user)->
    @get('connected_by_user_id') is user.id

  getHref: ->
    if @get('class') is 'Channel'
      "/#{@get('user').slug}/#{@get('slug')}"
    else if @get('class') is 'User'
      "/#{@get('slug')}"
    else
      "/block/#{@id}"

  href: -> @getHref()

