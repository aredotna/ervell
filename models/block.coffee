#
# Model for a single block
#

Base = require "./base.coffee"
sd = require("sharify").data
_ = require 'underscore'
_s = require 'underscore.string'
moment = require 'moment'
parseDomain = require 'parse-domain'
striptags = require 'striptags'

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
    else if @has('title')
      @get('title')
    else
      @get('generated_title')

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

  titleOrContent: ->
    if @has('username')
      title = @get('username')
    else if @has('title')
      title = @get('title')
    else if @has('content')
      title = @get('content')
    else if @has('description')
      title = @get('description')
    else
      title = @get('generated_title')
    
    _.unescape title

  getStrippedHTML: ->
    # fake link formatting
    output = @get('content_html')?.replace('<a', '<strong').replace('</a', '</strong')

  contentOrDescription: ->
    @get('content') || @get('description')

  addConnection: (connection) ->
    connections = @get('connections')
    connections.unshift connection
    @set 'connections', connections

  connections: ->
    _.map @get('connections'), (connection) ->
      connection.base_class = 'Channel'
      new Block connection

  isMovie: ->
    extension = @get('attachment')?.extension.toLowerCase()
    extension is 'mp4' or extension is 'mov'

  getSourceUrl: ->
    @get('source')?.url || @get('attachment')?.url || @getImageSize('original')

  resizeImage: (width = 330, height = 330, source = 'display')->
    @getImageSize source

  getImageSize: (size) ->
    if @has('image') and @get('image').content_type isnt 'image/svg+xml'
      @get('image')?[size]?.url

  getVisibility: ->
    if @get('base_class') is 'Channel'
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
    if (@connectedByCurrentUser(user, channel) or @belongsToCurrentUser(user)) && channel?
      permissions.push 'can-manage'

    (_.uniq permissions).join ' '

  belongsToCurrentUser: (user)->
    @get('user').id is user.id

  connectedAtAgo: ->
    moment(@get('connected_at')).fromNow()

  allows: (permission, user) ->
    _s.include @getPermissions(user), permission

  connectedByCurrentUser: (user, channel = false)->
    @get('connected_by_user_id') is user.id or channel?.get?('is_managable')

  getHref: ->
    if @get('base_class') is 'Channel'
      "/#{@get('user').slug}/#{@get('slug')}"
    else if @get('base_class') is 'User'
      "/#{@get('slug')}"
    else
      "/block/#{@id}"

  href: -> @getHref()

