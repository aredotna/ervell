#
# Routes file that exports route handlers for ease of testing.
#

User = require "../../models/user"
UserBlocks = require "../../collections/user_blocks"
FollowBlocks = require "../../collections/follow_blocks"
sd = require("sharify").data
_ = require 'underscore'

@user = (req, res, next) ->

  user = new User
    id: req.params.username

  blocks = new UserBlocks null,
    user_slug: req.params.username

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  user.fetch
    success: ->
      res.locals.sd.USER = user.toJSON()
      render()
    error: (m, err) -> next err

  blocks.fetch
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      render()
    error: (m, err) -> next err

  render = _.after 2, ->
    res.render "index", author: user, blocks: blocks.models

@followers = (req, res, next) ->
  user = new User
    id: req.params.username

  blocks = new FollowBlocks null,
    object_id: req.params.username
    object_type: 'users'
    suffix:'ers'

  user.fetch
    success: =>
      res.locals.sd.USER = user.toJSON()
      render()

  blocks.fetch
    cache: true
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWERS = blocks.toJSON()
      render()
    error: (m, err) -> next err


  render = _.after 2, =>
    res.render "index",
      blocks: blocks.models
      author: user
      followers: true

@following = (req, res, next) ->

  user = new User
    id: req.params.username

  blocks = new FollowBlocks null,
    object_id: req.params.username
    object_type: 'users'
    suffix: 'ing'

  user.fetch
    success: =>
      res.locals.sd.USER = user.toJSON()
      render()

  blocks.fetch
    cache: true
    success: (data, response) ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.locals.sd.FOLLOWING = blocks.toJSON()
      render()
    error: (m, err) -> next err

  render = _.after 2, -> res.render "index", blocks: blocks.models, author: user, following: true
