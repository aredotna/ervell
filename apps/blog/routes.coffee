_ = require 'underscore'
$ = require 'cheerio'
sd = require('sharify').data
request = require 'superagent'
{ Collection } = require 'backbone'

class Posts extends Collection
  url: -> "#{sd.BLOG_URL}/all.json"

@index = (req, res, next) ->
  posts = new Posts
  posts.fetch
    complete: ->
      res.locals.sd.POSTS = posts
      res.render 'index',
        posts: posts.models

@blog = (req, res, next) ->
  url = req.path.replace('/blog', '')
  request("#{sd.BLOG_URL}#{url}")
    .end (err, response) ->
      $html = $(response?.text)
      title = if $html.find('title').html() is "Blog" then "Blog" else "Blog – #{$html.find('title').html()}"
      res.render 'blog',
        title: title
        html: $html.find('.page-content').html()
        image: $html.find('img').attr('src')