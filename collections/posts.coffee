{ default: client } = require '../lib/contentful.js'

CONTENTFUL_BLOG_POST_TYPE_ID = 'blogPost'
CONTENTFUL_FEATURED_POSTS_ENTRY_ID = '5hEK2Kwn5mc6KkoyOYEAmo'

module.exports =
  fetchAll: ->
    client.getEntries
      content_type: CONTENTFUL_BLOG_POST_TYPE_ID
      order: "-fields.displayDate"
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

  fetchImages: (ids = []) ->
    return client.getAssets
      "sys.id[in]": ids.join(',')
    .then (response) ->
      return response.items

