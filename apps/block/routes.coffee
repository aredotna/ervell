Q = require 'bluebird-q'
Channel = require "../../models/channel"
Block = require "../../models/block"
Comments = require "../../collections/comments"
User = require "../../models/user"
markdown = require '../../lib/markdown'
sd = require("sharify").data
_ = require 'underscore'

@block = (req, res, next) ->
  block = new Block id: req.params.block_id
  comments = new Comments [], block: block

  Q.all [
    block.fetch data: auth_token: req.user?.get('authentication_token')
    comments.fetch(data: auth_token: req.user?.get('authentication_token')) if req.user?.has('username')
  ]
  .then ->
    res.locals.sd.BLOCK = block.toJSON()
    res.locals.sd.COMMENTS = comments.toJSON()
    res.locals.sd.CURRENT_ACTION = 'block'
    canIndexConnections = _.all block.get('connections'), (c) -> c.can_index is true
    canIndexUser = block.get('user')?.can_index

    res.render 'index',
      block: block
      comments: comments
      md: markdown
      canIndex: canIndexUser && canIndexConnections
      tab: req.params.tab || 'info'
      connections: block.connections()

  .catch next
  .done()
