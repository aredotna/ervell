contentful = require "contentful/dist/contentful.node.min.js"

{ Model } = require 'backbone'
{ CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_BLOG_POST_TYPE_ID,
  CONTENTFUL_POSTS_LIST_TYPE_ID,
  CONTENTFUL_FEATURED_POSTS_ENTRY_ID
} = require('sharify').data

class Post extends Model
  snippet: -> @get('description') or @get('excerpt')
