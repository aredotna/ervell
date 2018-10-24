contentful = require "contentful/dist/contentful.node.min.js"
Post = require "../../models/post"

{ Collection } = require 'backbone'
{ CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_BLOG_POST_TYPE_ID,
  CONTENTFUL_POSTS_LIST_TYPE_ID,
  CONTENTFUL_FEATURED_POSTS_ENTRY_ID
} = require('sharify').data

console.log(CONTENTFUL_SPACE_ID);
client = contentful.createClient
  # This is the space ID. A space is like a project folder in Contentful terms
  space: CONTENTFUL_SPACE_ID,
  # This is the access token for this space.
  # Normally you get both ID and the token in the Contentful web app
  accessToken: CONTENTFUL_ACCESS_TOKEN

module.exports = class Posts extends Collection
  model: Post

  fetch: ->
    client.getEntries
      content_type: CONTENTFUL_BLOG_POST_TYPE_ID
    .then (entries) ->
      console.log entries

