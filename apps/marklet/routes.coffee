{ parse } = require 'url'
validator = require 'validator'
Backbone = require 'backbone'

@save = (req, res) ->
  return res.redirect "/log_in?redirect_uri=#{req.url}" unless req.user?

  res.locals.sd.SAVE = true
  res.locals.sd.CONTENT = content = req.params.content
  res.locals.sd.QUERY = query = req.query
  res.locals.sd.IS_URL = isURL = validator.isURL content

  state = new Backbone.Model mode: 'url'
  block = new Backbone.Model content: content
  connections = new Backbone.Collection

  res.render 'index',
    state: state.toJSON()
    block: block.toJSON()
    isURL: isURL
    query: query
    connections: connections.toJSON()
