Q = require 'q'
_ = require 'underscore'
sd = require("sharify").data
Channel = require "../../models/channel"
ChannelBlocks = require "../../collections/channel_blocks"

@channelRSS = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

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
  .catch ->
    console.log 'error here'
    next()
  .done()

@userRSS = (req, res, next) ->
  channel = new Channel
    channel_slug: req.params.channel_slug

  blocks = new ChannelBlocks null,
    channel_slug: req.params.channel_slug
    per: 25

  Q.allSettled([
    channel.fetch()
    blocks.fetch()
  ]).then ->
    res.render 'user',
      user: user
      blocks: blocks.models
  .done()