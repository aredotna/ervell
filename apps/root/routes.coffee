_ = require 'underscore'
Backbone = require 'backbone'
ExploreBlocks = require '../../collections/explore_blocks'
sd = require('sharify').data
numeral = require 'numeraljs'

class Statistics extends Backbone.Model
  url: -> "#{sd.API_URL}/utilities/statistics"

  format: (attr) ->
    numeral(@get(attr)).format('0,0')

@index = (req, res, next) ->
  res.locals.sd.CURRENT_PATH = "/"
  if req.user
    res.locals.sd.FEED_TYPE = 'primary'
    res.render 'feed', path: 'Feed'
  else
    stats = new Statistics
    stats.fetch
      cache: true
      complete: ->
        res.render 'home/index',
          stats: stats

@notifications = (req, res, next) ->
  res.locals.sd.FEED_TYPE = 'notifications'
  res.render 'feed', path: 'Notifications'

@explore = (req, res, next) ->
  blocks = new ExploreBlocks null

  if req.params.block_id
    res.locals.sd.CLIENT_PATH = "block/#{req.params.block_id}"

  if req.query.subject
    _.extend blocks.options, subject: req.query.subject
    res.locals.sd.SUBJECT = req.query.subject

  blocks.fetch
    error: (m, err) -> next err
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "explore", blocks: blocks.models

