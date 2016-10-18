_ = require 'underscore'
sd = require('sharify').data
{ Collection } = require 'backbone'

class Posts extends Collection
  url: -> "#{sd.BLOG_URL}/featured.json"

@index = (req, res, next) ->
  posts = new Posts
  posts.fetch
    success: ->
      res.locals.sd.POSTS
      res.render 'index', posts: posts.models
