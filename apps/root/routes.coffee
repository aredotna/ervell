#
# Handles / (authenticated gets feed, otherwise about) and /explore
#
Q = require 'q'
_ = require 'underscore'
Backbone = require "backbone"
Feed = require "../../collections/feed"
Channel = require "../../models/channel"
ExploreBlocks = require "../../collections/explore_blocks"
Blocks = require "../../collections/blocks"
CurrentUser = require '../../models/current_user'
sd = require("sharify").data

@index = (req, res, next) ->
  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.user
    res.locals.sd.FEED_TYPE = 'primary'
    res.render 'feed', path: 'feed'
  else

    channel = new Channel()
    channel.url = "#{sd.API_URL}/channels/arena-front-example-channels"

    channel.fetch
      data: per: 50
      cache: true
      error: next
      success: (channel, response)->
        blocks = new Blocks response.contents
        res.render 'index', blocks: blocks.models


@notifications = (req, res, next) ->
  res.locals.sd.FEED_TYPE = 'notifications'
  res.render 'feed', path: 'notifications'

@explore = (req, res, next) ->
  channels = new ExploreBlocks

  channels.fetch
    data:
      per: 20
    cache: true
    success: ->
      promises = _.compact _.flatten [
        channels.map (channel) ->
          channel.fetch
            cache: true
            success: (model)->
              blocks = new Blocks _.take(model.get('contents'), 4)
              model.set 'contents', blocks
            error: (model, error) ->
              console.log 'error fetching', error
        ]
      Q.allSettled(promises).then(->
        res.locals.sd.CHANNELS = channels.toJSON()
        res.render "explore", channels: channels.models, path: 'explore'
      ).done()
    error: (m, err) -> next err

