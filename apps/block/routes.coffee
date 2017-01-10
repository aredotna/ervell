#
# Routes file that exports route handlers for ease of testing.
#
Q = require 'q'
Channel = require "../../models/channel"
Block = require "../../models/block"
Comments = require "../../collections/comments"
User = require "../../models/user"
markdown = require 'marked'
sd = require("sharify").data
_ = require 'underscore'

@block = (req, res, next) ->
  markdown.setOptions
    renderer: new markdown.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false

  block = new Block id: req.params.block_id
  comments = new Comments [], block: block

  Q.all [
    block.fetch data: auth_token: req.user?.get('authentication_token')
    comments.fetch(data: auth_token: req.user?.get('authentication_token')) if req.user?
  ]
  .then ->
    res.locals.sd.BLOCK = block.toJSON()
    res.locals.sd.COMMENTS = comments.toJSON()

    res.render 'index',
      block: block
      comments: comments
      md: markdown
      tab: req.params.tab || 'info'
      connections: block.connections()

  .catch next
  .done()
