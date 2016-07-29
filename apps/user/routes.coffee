User = require "../../models/user"
UserBlocks = require "../../collections/user_blocks"
FollowBlocks = require "../../collections/follow_blocks"
Channel = require "../../models/channel"
sd = require("sharify").data
cache = require "../../lib/cache.coffee"
_ = require 'underscore'

@fetchAuthor = (req, res, next) ->
  author = new User id: req.params.username
  author.fetch
    cache: true
    success: (author) ->
      res.locals.author = author
      res.locals.sd.USER = author.toJSON()
    complete: -> next()

@user = (req, res, next) ->
  return next() unless res.locals.author

  blocks = new UserBlocks null,
    user_slug: req.params.username

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.query.subject
    _.extend blocks.options, subject: req.query.subject
    res.locals.sd.SUBJECT = req.query.subject

  if req.query.sort
    res.locals.sd.SORT = sort_by = req.query.sort
    res.locals.sd.SEED = seed = Math.floor(Math.random() * 100000000) + 1
    _.extend blocks.options,
      sort: sort_by
      seed: seed

  blocks.fetch
    data:
      auth_token: req.user?.get('authentication_token')
    error: (m, err) -> next err
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "index", author: res.locals.author, blocks: blocks.models

@followers = (req, res, next) ->
  return next() unless res.locals.author
  return next() if res.locals.author?.id is 21

  blocks = new FollowBlocks null,
    object_id: req.params.username
    object_type: 'users'
    suffix: 'ers'

  blocks.fetch
    cache: true
    data:
      auth_token: req.user?.get('authentication_token')
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWERS = blocks.toJSON()
      res.render "index",
        blocks: blocks.models
        author: res.locals.author
        followers: true
    error: (m, err) -> next err

@following = (req, res, next) ->
  return next() unless res.locals.author
  return next() if res.locals.author?.id is 21

  blocks = new FollowBlocks null,
    object_id: req.params.username
    object_type: 'users'
    suffix: 'ing'

  blocks.fetch
    cache: true
    data:
      auth_token: req.user?.get('authentication_token')
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWING = blocks.toJSON()
      res.render "index",
        blocks: blocks.models
        author: res.locals.author
        following: true
    error: (m, err) -> next err

@update = (req, res, next) ->
  return next() unless res.locals.author and (res.locals.author.id is res.locals.user.id)
  cache.del "#{res.locals.author.url()}{}"
  res.send 200

@catchChannel = (req, res, next) ->
  channel = new Channel id: req.params.username
  channel.fetch
    success: ->
      res.redirect 301, "/#{channel.get('user').slug}/#{channel.get('slug')}"
    error: (m, err) -> next err

@redirectUser = (req, res, next) ->
  res.redirect 301, "/#{req.params.username}"
