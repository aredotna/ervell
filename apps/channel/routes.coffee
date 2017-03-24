#
# Routes file that exports route handlers for ease of testing.
#

Channel = require "../../models/channel"
ChannelBlocks = require "../../collections/channel_blocks"
Blocks = require "../../collections/blocks"
User = require "../../models/user"
sd = require("sharify").data
Q = require 'q'
_ = require 'underscore'

fetchChannel = ({slug, authToken = null, url = null, cache = false}) ->
  dfd = Q.defer()
  channel = new Channel
    channel_slug: slug

  blocks = new ChannelBlocks null,
    channel_slug: slug

  if url
    channel.url = url

  channel.fetch
    cache: cache
    data:
      auth_token: authToken
    success: -> 
      dfd.resolve { channel, blocks }
    error: (m, err) -> dfd.reject err

  dfd.promise

@channel = (req, res, next) ->
  slug = req.params.channel_slug
  authToken = req.user?.get('authentication_token')

  fetchChannel({ slug, authToken })
    .then ({ channel, blocks }) ->
      return res.redirect 301, "/#{channel.get('slug')}" if channel.get('class') is 'User'
      blocks.add channel.get 'contents'

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = blocks.toJSON()
      author = new User channel.get('user')

      res.render "index", 
        channel: channel
        blocks: blocks.models
        author: author

    .catch ->
      next()

@embed = (req, res, next) ->
  slug = req.params.channel_slug
  channel = new Channel channel_slug: slug
  url = "#{channel.urlRoot()}?per=7&direction=desc"

  fetchChannel({ slug, url, cache: true } )
    .then ({ channel, blocks }) ->
      blocks.add channel.get 'contents'

      res.locals.sd.CHANNEL = channel.toJSON()
      res.locals.sd.BLOCKS = blocks.toJSON()
      author = new User channel.get('user')

      res.render "embed", 
        channel: channel
        blocks: blocks.models
        author: author
        isEmbedded: true

    .catch next

@followers = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  author = new User {}

  blocks = new Blocks null
  blocks.url = "#{sd.API_URL}/channels/#{req.params.channel_slug}/followers"

  blocks.parse = (data)-> data.users

  channel.fetch
    success: =>
      return res.redirect 301, "/#{channel.get('slug')}" if channel.get('class') is 'User'
      res.locals.sd.CHANNEL = channel.toJSON()
      author = new User channel.get('user')
      render()

  blocks.fetch
    cache: true
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWERS = blocks.toJSON()
      render()
    error: (m, err) -> next err

  render = _.after 2, ->
    res.render "index",
      channel: channel
      blocks: blocks.models
      author: author
      followers: true


