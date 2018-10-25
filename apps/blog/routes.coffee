request = require 'superagent'
truncate = require '../../lib/truncate.coffee'
helpers = require '../../components/contentful/helpers.coffee'
{ formatDate } = require '../../components/blog_post/helpers.coffee'
posts = require '../../collections/posts.coffee'

@index = (req, res, next) ->
  posts.fetchAll()
    .then (response) ->
      res.render 'index',
        posts: response.items
        truncate: truncate
        formatDate: formatDate
        helpers: helpers
    .error next

@show = (req, res, next) ->

  slug = req.path.replace '/blog/', ''
  return next() if slug is "feed/rss"

  posts.fetchWithSlug(slug)
    .then (response) ->
      res.render 'show',
        post: response.items[0]
        formatDate: formatDate
        helpers: helpers