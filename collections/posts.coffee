{ Collection } = require 'backbone'
{ BLOG_URL } = require('sharify').data

module.exports = class Posts extends Collection
  url: "#{BLOG_URL}/all.json"