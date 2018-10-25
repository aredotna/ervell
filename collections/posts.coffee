contentful = require "contentful"
{ CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_BLOG_POST_TYPE_ID,
  CONTENTFUL_FEATURED_POSTS_ENTRY_ID
} = require '../config'

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

  # fetchFeatured: ->
  #   client.getEntry(CONTENTFUL_FEATURED_POSTS_ENTRY_ID)
  #     .then (featuredPostsList) ->
  #       console.log featuredPostsList
  #       return featuredPostsList

  fetchWithSlug: (slug) ->
    console.log CONTENTFUL_BLOG_POST_TYPE_ID
    console.log slug
    client.getEntries
      content_type: CONTENTFUL_BLOG_POST_TYPE_ID
      "fields.slug": slug

