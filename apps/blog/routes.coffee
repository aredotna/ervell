$ = require 'cheerio'
request = require 'superagent'
{ BLOG_URL } = require('sharify').data
{ Collection } = require 'backbone'

class Posts extends Collection
  url: "#{BLOG_URL}/all.json"

@index = (req, res, next) ->
  posts = new Posts
  posts.fetch
    error: next
    success: ->
      res.locals.POSTS = posts
      res.render 'index',
        posts: posts.models

@show = (req, res, next) ->
  url = req.path.replace '/blog', ''

  request("#{BLOG_URL}#{url}")
    .end (err, response) ->
      $html = $(response?.text)

      title = if $html.find('title').html() is 'Blog'
        'Blog'
      else
        "Blog – #{$html.find('title').html()}"

      res.render 'show',
        title: title
        html: $html.find('.page-content').html()
        image: $html.find('img').attr('src')
