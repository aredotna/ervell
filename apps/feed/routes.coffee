_ = require 'underscore'
sd = require('sharify').data
ExploreBlocks = require '../../collections/explore_blocks'

@index = (req, res, next) ->
  return next() unless req.user?.id
 
  res.locals.sd.CURRENT_PATH = "/"
  res.locals.sd.FEED_TYPE = 'primary'
  res.render 'feed', path: 'Feed'

@notifications = (req, res, next) ->
  res.locals.sd.FEED_TYPE = 'notifications'
  res.render 'feed', path: 'Notifications'

@explore = (req, res, next) ->
  blocks = new ExploreBlocks null

  if req.query.subject
    _.extend blocks.options, filter: req.query.subject
    res.locals.sd.SUBJECT = req.query.subject

  if req.query.sort
    res.locals.sd.SORT = sort_by = req.query.sort
    res.locals.sd.SEED = seed = Math.floor(Math.random() * 100000000) + 1
    _.extend blocks.options,
      sort: sort_by
      seed: seed

  blocks.fetch
    error: (m, err) -> next err
    success: ->
      res.locals.sd.BLOCKS = blocks.toJSON()
      res.render "explore", blocks: blocks.models

