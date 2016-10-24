_ = require 'underscore'
sd = require('sharify').data
slogans = require './slogans.coffee'
{ Collection } = require 'backbone'

class Posts extends Collection
  url: -> "#{sd.BLOG_URL}/featured.json"

@index = (req, res, next) ->
  posts = new Posts
  posts.fetch
    complete: ->
      res.locals.sd.POSTS = posts
      res.render 'index',
        posts: posts.models
        slogan: slogans[res.locals.sd.HOMEPAGE_SLOGAN]

