$ = require 'cheerio'
request = require 'superagent'
{ take } = require 'underscore'
{ BLOG_URL } = require('sharify').data

Posts = require '../../collections/posts.coffee'

truncate = (text, length = 50) ->
  return unless text
  tokens = text.split ' '
  take(tokens, length).join(' ') + "..."

@index = (req, res, next) ->
  posts = new Posts
  posts.fetch
    error: next
    success: ->
      res.locals.POSTS = posts
      res.render 'index',
        posts: posts.models
        truncate: truncate

@show = (req, res, next) ->
  url = req.path.replace '/blog', ''
  return next() if url is "/feed/rss"

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
