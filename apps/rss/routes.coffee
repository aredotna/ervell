Q = require 'bluebird-q'
_ = require 'underscore'
sd = require("sharify").data
Channel = require "../../models/channel"
User = require "../../models/user"
ChannelBlocks = require "../../collections/channel_blocks"
UserBlocks = require "../../collections/user_blocks"
ExploreBlocks = require "../../collections/explore_blocks"

@channelRSS = (req, res, next) ->
  channel = new Channel
    id: req.params.channel_slug

  blocks = new ChannelBlocks null,
    channel_slug: req.params.channel_slug
    per: 25

  Q.allSettled([
    channel.fetch()
    blocks.fetch()
  ]).then ->
    res.set 'Content-Type', 'application/rss+xml'
    res.render 'channel',
      channel: channel
      blocks: blocks.models
  .catch next
  .done()

@userRSS = (req, res, next) ->
  author = new User
    channel_slug: req.params.username

  blocks = new UserBlocks null,
    user_slug: req.params.username
    per: 25

  Q.allSettled([
    author.fetch()
    blocks.fetch()
  ]).then ->
    res.render 'user',
      author: author
      blocks: blocks.models
  .catch next
  .done()

@exploreRSS = (req, res, next) ->
  blocks = new ExploreBlocks null,
    filter: 'channel'
    per: 25

  Q.allSettled([
    blocks.fetch()
  ]).then ->
    res.render 'explore',
      blocks: blocks.models
  .catch next
  .done()
