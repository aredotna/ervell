Q = require 'bluebird-q'
_ = require 'underscore'
sd = require("sharify").data
Channel = require "../../models/channel"
User = require "../../models/user"
ChannelBlocks = require "../../collections/channel_blocks"
UserBlocks = require "../../collections/user_blocks"
ExploreBlocks = require "../../collections/explore_blocks"
posts = require "../../collections/posts.coffee"

@channelRSS = (req, res, next) ->
  channel = new Channel
    id: req.params.channel_slug

  blocks = new ChannelBlocks null,
    channel_slug: req.params.channel_slug
    per: 25

  Q.allSettled([
    channel.fetch(cache: true)
    blocks.fetch(cache: true)
  ]).then ->
    res.set 'Content-Type', 'application/rss+xml'
    res.render 'channel',
      channel: channel
      blocks: blocks.models
  .catch next
  .done()

@userRSS = (req, res, next) ->
  author = new User(id: req.params.username)
  blocks = new UserBlocks null,
    user_slug: req.params.username
    per: 25

  Promise.all([
    author.fetch(cache: true)
    blocks.fetch(cache: true)
  ])
    .then ->
      res.set 'Content-Type', 'application/rss+xml'
      res.render 'user',
        author: author
        blocks: blocks.models

    .catch next

@exploreRSS = (req, res, next) ->
  blocks = new ExploreBlocks null,
    filter: 'channel'
    per: 25

  Q.allSettled([
    blocks.fetch(cache: true)
  ]).then ->
    res.set 'Content-Type', 'application/rss+xml'
    res.render 'explore',
      blocks: blocks.models
  .catch next
  .done()

@blogRSS = (req, res, next) ->
  posts.fetchAll().then (posts) ->
    res.set 'Content-Type', 'application/rss+xml'
    res.render 'blog',
      posts: posts
  .catch next
  .done()
