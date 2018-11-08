request = require 'superagent'
contentfulFormatter = require '../../components/contentful/helpers.coffee'
{ formatDate } = require '../../components/blog_post/helpers.coffee'
{ documentToHtmlString } = require '@contentful/rich-text-html-renderer'
posts = require '../../collections/posts.coffee'

@index = (req, res, next) ->
  posts.fetchAll()
    .then (posts) ->
      res.render 'index',
        title: 'Blog'
        posts: posts
        formatDate: formatDate
        srcset: contentfulFormatter.srcset
        documentToHtmlString: documentToHtmlString
    .catch next

@show = (req, res, next) ->
  posts.fetchWithSlug(req.params.slug).then (post) ->
    return next() unless post and post.fields
    coverImageUrl = post.fields.image.fields.file.url + '?w=600'
    bio = if (bio = post.fields.author.fields?.bio) then documentToHtmlString(bio) else ''
    body = contentfulFormatter.formatRichTextWithImages post.fields.body, {
      srcsetSizes: [670, 670 * 2, 670 * 3],
      sizes: "(min-width: 670px) 670px, 100vw"
    }
    res.render 'show',
      title: post.fields.title
      image: coverImageUrl
      post: post
      formatDate: formatDate
      body: body
      bio: bio

  .catch next

@redirectOldUrls = (req, res, next) ->
  return res.redirect(301, "/blog/#{req.params.slug}")
