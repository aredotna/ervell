contentful = require "contentful"
{ CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN
} = require '../config'

CONTENTFUL_BLOG_POST_TYPE_ID = 'blogPost'
CONTENTFUL_FEATURED_POSTS_ENTRY_ID = '5hEK2Kwn5mc6KkoyOYEAmo'

client = contentful.createClient
  # This is the space ID. A space is like a project folder in Contentful terms
  space: CONTENTFUL_SPACE_ID,
  # This is the access token for this space.
  # Normally you get both ID and the token in the Contentful web app
  accessToken: CONTENTFUL_ACCESS_TOKEN

module.exports =
  fetchAll: ->
    client.getEntries
      content_type: CONTENTFUL_BLOG_POST_TYPE_ID
    .then (response) ->
      return response.items

  fetchWithSlug: (slug) ->
    client.getEntries
      content_type: CONTENTFUL_BLOG_POST_TYPE_ID
      "fields.slug": slug
    .then (response) ->
      return response.items[0]

  fetchFeatured: ->
    client.getEntry CONTENTFUL_FEATURED_POSTS_ENTRY_ID,
      include: 4
    .then (response) ->
      return response.fields.posts

