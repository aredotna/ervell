{ Collection, Model } = require 'backbone'
{ BLOG_URL } = require('sharify').data

class Post extends Model
  snippet: -> @get('description') or @get('excerpt')

module.exports = class Posts extends Collection
  url: "#{BLOG_URL}/all.json"
  model: Post

  