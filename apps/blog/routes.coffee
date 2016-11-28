_ = require 'underscore'
$ = require 'cheerio'
sd = require('sharify').data
request = require 'superagent'
{ Collection } = require 'backbone'

class Posts extends Collection
  url: -> "#{sd.BLOG_URL}/featured.json"

@blog = (req, res, next) ->
  url = req.path.replace('/blog', '')
  request("#{sd.BLOG_URL}#{url}")
    .end (err, response) ->
      $html = $(response?.text)
      title = if $html.find('title').html() is "Blog" then "Blog" else "Blog – #{$html.find('title').html()}"
      res.render 'index',
        title: title
        html: $html.find('.page-content').html()
        image: $html.find('img').attr('src')